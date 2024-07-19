import { z } from "zod";

const addPostSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  message: z.string().min(1, { message: "Body For Your Post Is Required" }),
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
});

type addpostType = z.infer<typeof addPostSchema>;
export { addPostSchema, type addpostType };
