import express from 'express'
import http from 'http'
import io from 'socket.io'
import path from 'path'

export default class JimakuServer{
  private app: express.Express
  private server: http.Server
  private io: io.Server

  constructor() {
    this.app = express()
    this.server = new http.Server(this.app)
    this.io = io(this.server)
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
    this.io.on('connection', (socket: io.Socket) => {
      console.log('a user connected')
    })
  }

  get isListening(): boolean {
    return this.server.listening
  }

  public listen(port: number) {
    this.server = this.server.listen(port)
  }

  public close() {
    this.server = this.server.close()
  }

  public showJimaku(jimaku: string) {
    this.io.emit('show_jimaku', jimaku)
  }

  public hideJimaku() {
    this.io.emit('hide_jimaku')
  }
}
