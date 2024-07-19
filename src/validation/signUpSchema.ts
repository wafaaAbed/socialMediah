import { z } from "zod";

const signUpSchema = z
  .object({
    image: z
      .custom<FileList>()
      .transform((val) => {
        if (val instanceof File) return val;
        if (val instanceof FileList) return val[0];
        return null;
      })
      .superRefine((file, ctx) => {
        if (!(file instanceof File)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            fatal: true,
            message: "",
          });

          return z.NEVER;
        }

        if (file.size > 5 * 1024 * 1024) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Max file size allowed is 5MB",
          });
        }

        if (
          !["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(
            file.type
          )
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "File must be an image (jpeg, jpg, png, webp)",
          });
        }
      })
      .pipe(z.custom<File>()),
    userName: z.string().min(1, { message: "User Name is required" }),
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(1, { message: "Email address is required" }).email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters longs" })
      .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
        message: "Password should contain at least 1 special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "Password and Confirm Password does not match",
    path: ["confirmPassword"],
  });

type signUpType = z.infer<typeof signUpSchema>;
export { signUpSchema, type signUpType };
