import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Numele trebuie să aibă cel puțin 2 caractere.')
    .max(100, 'Numele este prea lung.'),
  email: z
    .string()
    .email('Adresa de email nu este validă.')
    .max(255, 'Adresa de email este prea lungă.'),
  message: z
    .string()
    .min(10, 'Mesajul trebuie să aibă cel puțin 10 caractere.')
    .max(2000, 'Mesajul este prea lung.'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
