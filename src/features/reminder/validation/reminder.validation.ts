import z from "zod";

export const ReminderSchema = z.object({
  contactId: z.number().min(1, "Please select a contact"),
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  type: z.string().min(1, "Reminder type is required"),
});

export type ReminderType = z.infer<typeof ReminderSchema>;
