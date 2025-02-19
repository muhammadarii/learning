import { object, string } from "zod";

export const SignInSchema = object({
  email: string().email("Please enter a valid email"),
  password: string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters"),
});

export const RegisterSchema = object({
  name: string().min(1, "Name must be at least 1 character"),
  email: string().email("Please enter a valid email"),
  password: string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters"),
  ConfirmPassword: string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters"),
}).refine((data) => data.password === data.ConfirmPassword, {
  message: "Passwords does not match",
  path: ["ConfirmPassword"],
});
