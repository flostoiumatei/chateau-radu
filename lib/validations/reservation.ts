import { z } from 'zod';

export const reservationSchema = z.object({
  name: z
    .string()
    .min(2, 'Numele trebuie să aibă cel puțin 2 caractere.')
    .max(100, 'Numele este prea lung.'),
  email: z
    .string()
    .email('Adresa de email nu este validă.')
    .max(255, 'Adresa de email este prea lungă.'),
  phone: z
    .string()
    .min(6, 'Numărul de telefon nu este valid.')
    .max(20, 'Numărul de telefon este prea lung.')
    .optional()
    .or(z.literal('')),
  preferredDate: z
    .string()
    .refine(
      (date) => {
        if (!date) return true;
        const parsed = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return parsed >= today;
      },
      { message: 'Data trebuie să fie în viitor.' }
    )
    .optional()
    .or(z.literal('')),
  guests: z
    .number()
    .min(1, 'Minim 1 persoană.')
    .max(8, 'Maximum 8 persoane.')
    .default(2),
  message: z
    .string()
    .max(1000, 'Mesajul este prea lung.')
    .optional()
    .or(z.literal('')),
});

export type ReservationFormData = z.input<typeof reservationSchema>;
