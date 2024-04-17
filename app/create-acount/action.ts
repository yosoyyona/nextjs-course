"use server";
import { z } from "zod";

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string.",
        required_error: "Where is my username?",
      })
      .min(5, "Way too short!")
      .max(10, "Way too long!")
      .refine((username) => !username.includes("patata"), "No patata!"),
    email: z.string().email(),
    password: z.string().min(10).max(20),
    confirmPassword: z.string().min(10).max(20),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Both passwords should be the same!",
    path: ["confirmPassword"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }
}
