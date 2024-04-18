"use server";
import { z } from "zod";

const passwordRegex = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
);

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string.",
        required_error: "Where is my username?",
      })
      .min(5, "Way too short!")
      .max(10, "Way too long!")
      .toLowerCase()
      .trim()
      .transform((username) => `${username}🥕`)
      .refine((username) => !username.includes("patata"), "No patata!"),
    email: z.string().email().toLowerCase(),
    password: z
      .string()
      .min(10)
      .max(20)
      .regex(
        passwordRegex,
        "A password must have lowercase, UPPERCASE, a number and a special characters"
      ),
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
  } else {
    console.log(result.data);
  }
}
