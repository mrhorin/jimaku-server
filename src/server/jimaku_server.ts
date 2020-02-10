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
    this.app.get('/show_jimaku', (req: express.Request, res: express.Response) => {
      let jimaku = decodeURIComponent(req.query.jimaku)
      if (req.query.style) {
        let style = JSON.parse(req.query.style)
        this.showJimaku(jimaku, style)
      } else {
        this.showJimaku(jimaku)
      }
      res.end()
    })
    this.app.get('/hide_jimaku', (req: express.Request, res: express.Response) => {
      this.hideJimaku()
      res.end()
    })
    this.io.on('connection', () => {
      console.log('a user connected')
    })
  }

  public get isListening(): boolean {
    return this.server.listening
  }

  public listen(port: number) {
    this.server = this.server.listen(port)
  }

  public close() {
    this.server = this.server.close()
  }

  public showJimaku(jimaku: string, style?: { [key: string]: string }) {
    this.io.emit('show_jimaku', jimaku, style)
  }

  public hideJimaku() {
    this.io.emit('hide_jimaku')
  }
}
