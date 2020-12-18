const http=require("http")
const app=require("./src/app")
const server=http.createServer(app)
 const port=2100
 server.listen(port)
 console.log("server is listening on:"+port)