import JimakuServer from 'server/jimaku_server'

const server: JimakuServer = new JimakuServer()

let portIdx = global.process.argv.indexOf('-p') + 1
if (portIdx > 0) {
  let port: number = Number(global.process.argv[portIdx])
  server.listen(port)
} else {
  server.listen()
}
