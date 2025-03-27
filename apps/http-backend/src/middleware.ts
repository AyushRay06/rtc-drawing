import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config"

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["authorization"]

    if (!token) {
      return
    }

    const decoded = jwt.verify(token, JWT_SECRET)

    if (decoded) {
      //@ts-ignore
      req.userId = decoded.userId
      next()
      res.status(200).json({ msg: "User verified" })
    } else {
      res.status(403).json({ msg: "Verification faild" })
    }
  } catch (error) {
    console.log("Error in Middleware!!!", error)
  }
}
