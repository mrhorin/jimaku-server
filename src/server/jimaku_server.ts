import express from 'express'
import http from 'http'
import io from 'socket.io'
import path from 'path'

export default class JimakuServer{
  app: express.Express
  server: http.Server
  io: io.Server

  constructor() {
    this.app = express()
    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.send(`
        <html>
          <head>
            <meta charset="UTF-8" />
          </head>
          <body>
            <div id="jimaku">Jimaku Server</div>
          </body>
          <script src="/client.js"></script>
        <html>
      `)
    })
    this.app.get('/client.js', (req: express.Request, res: express.Response) => {
      res.sendFile(path.resolve(__dirname + '/client.js'))
    })
    this.server = this.app.listen(3000)
    this.io = io(this.server)
    // this.io.on('connection', (socket: io.Socket) => {
    // })
  }

  listen(port: number) {
    this.server = this.server.listen(port)
  }

  close() {
    this.server = this.server.close()
  }

  get isListening(): boolean {
    return this.server.listening
  }
}