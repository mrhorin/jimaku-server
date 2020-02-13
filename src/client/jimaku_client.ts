import io from 'socket.io-client'

export default class JimakuClient{
  private client: SocketIOClient.Manager
  private io: SocketIOClient.Socket
  private _jimakuElement: HTMLElement | null

  constructor() {
    this.client = new io.Manager(location.href)
    this.io = this.client.socket(location.pathname)
    this.io.on('connect', () => {
      console.log('connect')
    })
    this.io.on('show_jimaku', (jimaku: string, style?: { [key: number]: string; }) => {
      this.showJimaku(jimaku, style)
    })
    this.io.on('hide_jimaku', (jimaku: string) => {
      this.hideJimaku()
    })
    this._jimakuElement = null
  }

  public set jimakuElement(element: HTMLElement | null) {
    this._jimakuElement = element
  }

  public get jimakuElement(): HTMLElement | null{
    return this._jimakuElement
  }

  public connect() {
    this.client.connect()
  }

  public showJimaku(jimaku: string, style: { [key: number]: string } = {}) {
    if (this.jimakuElement?.innerHTML) {
      let css: string = ""
      for (let key in style) { css += `${key}: ${style[key]};` }
      this.jimakuElement.setAttribute('style', css)
      this.jimakuElement.innerHTML = jimaku
    }
  }

  public hideJimaku() {
    if (this.jimakuElement?.innerHTML) {
      this.jimakuElement.innerHTML = ''
    }
  }
}
