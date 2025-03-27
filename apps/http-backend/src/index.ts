import express from "express"
import { middleware } from "./middleware"
import { CreateUserSchema, SigninSchema } from "@repo/common/types"
import { prismaClient } from "@repo/database/prismaClient"
const app = express()
app.use(express.json())

app.post("/signup", async (req, res) => {
  try {
    const parsedData = CreateUserSchema.safeParse(req.body)

    if (!parsedData.success) {
      res.status(403).json({ msg: "Invalid Inputs" })
    }

    const user = await prismaClient.user.findunique({
      where: {
        email: parsedData.data?.email,
      },
    })

    if (user) {
      res.status(403).json({ msg: "User already exist" })
    }

    const newUser = await prismaClient.user.create({
      name: parsedData.data?.name,
      password: parsedData.data?.password,
      email: parsedData.data?.email,
    })

    res.status(200).json({ msg: "User created Successfully" })
  } catch (error) {
    console.log("Error in SignIn!!!", error)
  }
})

app.post("/signin", (req, res) => {
  try {
    const data = SigninSchema.safeParse(req.body)
    if (!data.success) {
      res.status(403).json({
        msg: "Invalid Input",
      })
      return
    }

    const { email, password } = req.body
  } catch (error) {}
})

app.post("/room", middleware, (req, res) => {})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`App rinnuing on port ${PORT}`)
})
