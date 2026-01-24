import { z } from "zod";

export const LoginSchema = z.object({
  phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(/^\d{10}$/, "Phone number must be 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
