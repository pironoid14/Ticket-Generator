import { z } from 'zod';

export const attendeeSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  specialRequest: z.string().optional(),
  photoUrl: z.string().optional(),
});

export type AttendeeFormData = z.infer<typeof attendeeSchema>;