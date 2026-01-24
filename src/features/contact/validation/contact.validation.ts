import z from "zod";

export const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .regex(/^\d+$/, "Phone must be numeric"),
  email: z.email("Invalid email").or(z.literal("")).optional(),
  relationship: z.string().min(1, "Relationship is required"),
  note: z.string().optional(),
});
export type ContactType = z.infer<typeof ContactSchema> & { id: number };
