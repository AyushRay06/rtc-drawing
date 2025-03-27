import { WebSocketServer } from "ws"
import jwt, { decode } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config"

const wss = new WebSocketServer({ port: 8080 })

wss.on("connection", (ws, request) => {
  console.log("connected")

  const url = request.url

  if (!url) {
    return
  }

  const queryParams = new URLSearchParams(url.split("?")[1])

  const token = queryParams.get("token")

  if (!token) {
    return
  }

  const decoded = jwt.verify(token, JWT_SECRET)

  if (!decoded) {
    ws.close()
    return
  }
  ws.on("error", console.error)

  ws.on("message", (data) => {
    console.log("Message recived", data)
  })

  ws.send("hello")
})
