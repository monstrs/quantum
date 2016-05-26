import unionfs from 'unionfs'
import memfs from 'memfs'

const cssfs = new unionfs.UnionFS
const mem = new memfs.Volume

mem.mountSync('/cssfs', {})

cssfs
  .init()
  .use(mem)

export default cssfs
