import JimakuServer from 'server/jimaku_server'

const server: JimakuServer = new JimakuServer()

let portIdx = global.process.argv.indexOf('-p') + 1
let helpIdx = global.process.argv.indexOf('-h') + 1

if (helpIdx > 0) {
  console.log(`
  Usage:  jimaku-server [option]

  Options
    -p    specify port for the server (default: 3000)
    -h    output usage information
  `)
  process.exit(0)
}

if (portIdx > 0) {
  let port: number = Number(global.process.argv[portIdx])
  server.listen(port)
} else {
  server.listen()
}
