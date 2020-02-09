import io from 'socket.io-client'

export default class JimaluClient{
  private client: SocketIOClient.Manager
  private io: SocketIOClient.Socket
  private _jimakuElement: HTMLElement | null

  constructor(url: string) {
    this.client = new io.Manager(url)
    this.io = this.client.socket(location.pathname)
    this.io.on('connect', () => {
      console.log('connect')
    })
    this.io.on('show_jimaku', (jimaku: string) => {
      this.showJimaku(jimaku)
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

  public showJimaku(jimaku: string) {
    if (this.jimakuElement?.innerHTML) {
      this.jimakuElement.innerHTML = jimaku
    }
  }

  public hideJimaku() {
    if (this.jimakuElement?.innerHTML) {
      this.jimakuElement.innerHTML = ''
    }
  }
}
