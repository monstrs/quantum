import unionfs from 'unionfs'
import memfs from 'memfs'
import fs from 'fs'

const cssfs = new unionfs.UnionFS
const mem = new memfs.Volume

mem.mountSync('/cssfs', {})

cssfs
  .init()
  .use(fs)
  .use(mem)
  .replace(fs)

export default cssfs
