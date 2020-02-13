import JimakuServer from 'server/jimaku_server'

const server: JimakuServer = new JimakuServer()

let helpIdx = global.process.argv.indexOf('-h') + 1
let verIdex = global.process.argv.indexOf('-v') + 1
let portIdx = global.process.argv.indexOf('-p') + 1

if (verIdex > 0) {
  console.log(process.env.npm_package_version)
  process.exit(0)
}

if (helpIdx > 0) {
  console.log(`
  Usage:  jimaku-server [options]

  Options:
    -h    output usage information
    -p    specify port for the server (default: 3000)
    -v    output output the version number
  `)
  process.exit(0)
}

if (portIdx > 0) {
  let port: number = Number(global.process.argv[portIdx])
  server.listen(port)
} else {
  server.listen()
}
