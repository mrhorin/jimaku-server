import JimakuServer from 'server/jimaku_server'
import path from 'path'

let helpIdx = global.process.argv.indexOf('-h') + 1
let verIdex = global.process.argv.indexOf('-v') + 1
let portIdx = global.process.argv.indexOf('--port') + 1
let cssIdx = global.process.argv.indexOf('--css') + 1
let htmlIdx = global.process.argv.indexOf('--html') + 1
let jsIdx = global.process.argv.indexOf('--js') + 1

// -v
if (verIdex > 0) {
  console.log(process.env.npm_package_version)
  process.exit(0)
}
// -h
if (helpIdx > 0) {
  console.log(`
  Usage:  jimaku-server [options]

  Options:
    --css <path>      specify your css file path
    -h                output usage information
    --html <path>     specify your html file path
    --js <path>       specify your javascript file path at the client side
    --port <port>     specify port for the server (default: 3000)
    -v                output output the version number
  `)
  process.exit(0)
}

let option = { css: '', html: '', js: '' }
// --css
if (cssIdx > 0) {
  option.css = path.resolve(process.cwd(), global.process.argv[cssIdx])
}
// --html
if (htmlIdx > 0) {
  option.html = path.resolve(process.cwd(), global.process.argv[htmlIdx])
}
// --js
if (jsIdx > 0) {
  option.js = path.resolve(process.cwd(), global.process.argv[jsIdx])
}

// Run the server
const server: JimakuServer = new JimakuServer(option)
if (portIdx > 0) {
  let port: number = Number(global.process.argv[portIdx])
  server.listen(port)
} else {
  server.listen()
}
