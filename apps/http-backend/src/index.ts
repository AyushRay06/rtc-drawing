import express from "express"
import { middleware } from "./middleware"

const app = express()

app.post("/signup", (req, res) => {})

app.post("/signin", (req, res) => {})

app.post("/room", middleware, (req, res) => {})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`App rinnuing on port ${PORT}`)
})
