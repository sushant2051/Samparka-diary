import z from "zod";

export const NoteSchema = z.object({
  contactId: z.number().min(1, "Please select a contact"),
  description: z.string().min(1, "Description is required"),
});

export type NoteType = z.infer<typeof NoteSchema>;
