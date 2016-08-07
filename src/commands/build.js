/* eslint-disable no-console */
import fs from 'fs'
import path from 'path'
import program from 'commander'
import webpack from 'webpack'
import MemoryFS from 'memory-fs'
import * as config from './webpack.config'

program
  .option('-o, --out-file <path>', 'Destination file path')
  .parse(process.argv)

const cwd = process.cwd()
const memfs = new MemoryFS()

const entries = program.args.map(entry => {
  if (path.isAbsolute(entry)) {
    return entry
  }

  return path.join(cwd, entry)
})

const compiler = webpack({
  ...config,
  entry: entries,
  context: cwd,
})

compiler.outputFileSystem = memfs

compiler.run((error, stats) => {
  if (stats.hasErrors()) {
    console.log(stats.toString('minimal'))
    return
  }

  memfs.readdirSync(config.output.path).forEach(file => {
    if (/\.css?$/.test(file)) {
      const target = path.join(config.output.path, file)

      fs.writeFileSync(program.outFile, memfs.readFileSync(target))
    }
  })
})
