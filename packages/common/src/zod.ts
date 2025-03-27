import { z } from "zod"

export const CreateUserSchema = z.object({
  name: z.string(),
  password: z.string().min(6),
  email: z.string().email(),
})

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const RoomSchema = z.object({
  name: z.string().min(6).max(20),
})
