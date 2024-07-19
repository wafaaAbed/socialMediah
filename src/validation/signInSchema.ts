import { z } from "zod";

const signInSchema = z.object({
  userName: z.string().min(1, { message: "User Name is required" }),
  password: z.string().min(1, { message: "Password address is required" }),
});

type signInType = z.infer<typeof signInSchema>;
export { signInSchema, type signInType };
