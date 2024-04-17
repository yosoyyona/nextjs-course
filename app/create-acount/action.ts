"use server";
import {z} from "zod";

const formSchema = z.object({
  username: z.string().min(5).max(10),
  email: z.string().email(),
  password: z.string().min(10).max(20),
  confirmPassword: z.string().min(10).max(20),
});

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const result = formSchema.safeParse(data);
  if(!result.success) {
    return result.error.flatten();
  }
}