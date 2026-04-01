import { z } from 'zod';

export const newsletterSchema = z.object({
  email: z
    .string()
    .email('Adresa de email nu este validă.')
    .max(255, 'Adresa de email este prea lungă.'),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
