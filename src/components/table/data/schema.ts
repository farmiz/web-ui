import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  gender: z.enum(["male", "female"]),
  role: z.enum(["customer", "admin", "support"]),
  status: z.string()
})

export type User = z.infer<typeof userSchema>
