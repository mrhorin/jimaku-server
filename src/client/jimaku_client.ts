import io from 'socket.io-client'

export default class JimaluClient{
  private client: SocketIOClient.Manager
  private io: SocketIOClient.Socket

  constructor(url: string) {
    this.client = new io.Manager(url)
    this.io = this.client.socket(location.pathname)
    this.io.on('connect', () => {
      console.log('connect')
    })
  }

  public connect() {
    this.client.connect()
  }
}
