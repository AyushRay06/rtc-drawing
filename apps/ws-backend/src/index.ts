import { WebSocketServer } from "ws"

const wss = new WebSocketServer({ port: 8080 })

wss.on("connection", (ws) => {
    console.log("connected")
  ws.on("error", console.error)

  ws.on("message", (data) => {
    console.log("Message recived", data)
  })

  ws.send("hello")
})
