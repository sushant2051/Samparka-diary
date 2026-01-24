import { z } from "zod";

export const SignupSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name is required")
      .regex(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces"),

    email: z.email("Invalid email address"),

    phone: z
      .string()
      .nonempty("Phone number is required")
      .regex(/^\d{10}$/, "Phone number must be 10 digits"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

export type SignupSchemaType = z.infer<typeof SignupSchema>;
