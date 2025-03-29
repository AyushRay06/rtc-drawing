import express from "express"
import { middleware } from "./middleware"
import { CreateUserSchema, SigninSchema } from "@repo/common/types"
import { prismaClient } from "@repo/database/prismaClient"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config"
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
      data: {
        name: parsedData.data?.name,
        password: parsedData.data?.password,
        email: parsedData.data?.email,
      },t
    })

    res.status(200).json({ msg: "User created Successfully" })
  } catch (error) {
    console.log("Error in SignIn!!!", error)
  }
})

app.post("/signin", async (req, res) => {
  try {
    const parsedData = SigninSchema.safeParse(req.body)
    if (!parsedData.success) {
      res.status(403).json({
        msg: "Invalid Input",
      })
      return
    }

    const user = await prismaClient.user.findunique({
      where: {
        email: parsedData.data.email,
        passwoed: parsedData.data.password,
      },
    })

    if (!user) {
      res.status(400).json({ msg: "User not found" })
      return
    }

    const token = jwt.sign(
      {
        userId: user?.id,
      },
      JWT_SECRET
    )

    res.json({ token })
  } catch (error) {}
})

app.post("/room", middleware, (req, res) => {})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`App rinnuing on port ${PORT}`)
})
