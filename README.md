# jimaku-server
[![Actions Status](https://github.com/mrhorin/jimaku-server/workflows/Node.js%20CI/badge.svg)](https://github.com/mrhorin/jimaku-server/actions)
[![npm version](https://badge.fury.io/js/jimaku-server.svg)](https://badge.fury.io/js/jimaku-server)

jimaku-server can show a comment on the screen in your live stream through browser source of a streaming encoder, such as OBS.

## Installation
Install with npm.
```
npm install jimaku-server
```

## Usage

### How to run with node.js
Run the server.
```javascript
import JimakuServer from 'jimaku-server'

let server = new JimakuServer()
server.listen(3000)
```
Open `http://localhost:3000` with a web browser, such as brower source of OBS.
<img width="600" alt="obs" src="https://user-images.githubusercontent.com/6502717/74432826-91712000-4ea2-11ea-8351-9244be3eb081.png">

Execute showJimaku() method to show a comment on the browser. Optionally, You can specify css in the second argument. The comment is shown on the screen until you execute hideJimaku() method or the next showJimaku method.
```javascript
import JimakuServer from 'jimaku-server'

let server = new JimakuServer()
server.listen(3000)

server.showJimaku('Hello Jimaku')
server.showJimaku('Bye', {"color": "blue", "font-size": "30px"})

setTimeout(()=>{
  server.hideJimaku()
}, 10000)
```

### How to run with CLI
You can use `jimaku-server` command after installing jimaku-server with npm.
```bash
jimaku-server
```
You can show a comment on the browser by setting the comment on jimaku parameter and then requesting `/show_jimaku`.<br>
_Note: The parameters should be UTF-8 and be done URL encoding._
```bash
curl -X GET 'http://localhost:3000/show_jimaku?jimaku=Hello%20Jimaku'
```
In addition to jimaku parameter, you can set css as JSON format on style parameter.
```bash
curl -X GET 'http://localhost:3000/show_jimaku?jimaku=Hello%20Jimaku&style=%7B%22color%22%3A%22red%22%2C%22font-size%22%3A%2235px%22%7D'
```
The style parameter above means like this.
```javascript
{"color":"red","font-size":"35px"}
```
The comment is shown until you request `/hide_jimaku` as well.
```bash
curl -X GET 'http://localhost:3000/hide_jimaku'
```
