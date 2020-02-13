import express from 'express'
import http from 'http'
import io from 'socket.io'

export = JimakuServer

declare class JimakuServer{
  app: express.Express
  server: http.Server
  io: io.Server

  constructor(option?: { css?: string, js?: string, html?: string });

  get isListening(): boolean

  listen(port: number): void

  close(port: number): void

  showJimaku(jimaku: string, style?: { [key: string]: string }): void

  hideJimaku(): void
}
