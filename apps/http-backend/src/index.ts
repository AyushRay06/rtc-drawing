import express from "express"

const app = express()

app.post("/signup", (req, res) => {
  res.json({ msg: "Hello " })
})

app.post("/signin", (req, res) => {})

app.post("/signin", (req, res) => {})

app.post("/room", (req, res) => {})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`App rinnuing on port ${PORT}`)
})
