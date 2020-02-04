import * as express from 'express'

export default class JimakuServer{
  router: express.Router

  constructor() {
    this.router = express.Router()
    console.log("jimaku")
  }
}
