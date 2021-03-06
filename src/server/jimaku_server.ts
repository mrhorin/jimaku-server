import express from 'express'
import http from 'http'
import io from 'socket.io'
import path from 'path'

export default class JimakuServer{
  private app: express.Express
  private server: http.Server
  private io: io.Server

  constructor(option?: { css?: string, js?: string, html?: string, elementId?: string }) {
    this.app = express()
    this.server = new http.Server(this.app)
    this.io = io(this.server)
    // style.css
    this.app.get('/style.css', (req: express.Request, res: express.Response) => {
      if (option && option.css) {
        res.sendFile(option.css)
      } else {
        res.send(`body{padding:0px; margin:0px; min-width:100%;}`)
      }
    })
    // client.js
    this.app.get('/client.js', (req: express.Request, res: express.Response) => {
      if (option && option.js) {
        res.sendFile(option.js)
      } else {
        res.sendFile(path.resolve(__dirname + '/../lib/client.js'))
      }
    })
    // index.html;
    this.app.get('/', (req: express.Request, res: express.Response) => {
      if (option && option.html) {
        res.sendFile(option.html)
      } else {
        let id = 'jimaku'
        if (option && option.elementId) id = option.elementId
        res.send(`
          <html>
            <head>
              <meta charset="UTF-8" />
              <link rel="stylesheet" type="text/css" href="/style.css">
            </head>
            <body>
              <div id="${id}"></div>
            </body>
            <script src="/client.js"></script>
          <html>
        `)
      }
    })
    this.app.get('/show_jimaku', (req: express.Request, res: express.Response) => {
      let jimaku:string
      let style: { [key: string]: string }
      try {
        jimaku = decodeURIComponent(String(req.query.jimaku))
        if (req.query.style) {
          style = JSON.parse(String(req.query.style))
          this.showJimaku(jimaku, style)
        } else{
          this.showJimaku(jimaku)
        }
        res.end(jimaku)
      } catch (error) {
        // conform to RFC 7807
        let title, detail = error.message
        if (error.message.match(/URI malformed/)) {
          title = 'URI malformed'
          detail = 'You must do URL encoding jimaku of the queries with UTF-8'
        } else if (error.message.match(/^Unexpected token .+ in JSON/)) {
          title = 'JSON format error'
          detail = 'You must specify JSON format in style of the queries'
        }
        res.status(500)
        res.header({ 'Content-Type':'application/problem+json' })
        res.end(JSON.stringify({
          type: req.url,
          title: title,
          status: 500,
          detail: detail
        }))
      }
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

  public listen(port: number = 3000) {
    this.server = this.server.listen(port)
    console.log(`\u001b[32mhttp://localhost:${port}\u001b[0m`)
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
