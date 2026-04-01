import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import { reservationSchema } from '@/lib/validations/reservation';

// TODO: Add rate limiting for production (e.g., Upstash Redis)

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate with Zod
    const validationResult = reservationSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Datele introduse nu sunt valide.',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, phone, preferredDate, guests, message } = validationResult.data;

    // Additional server-side validation: check if date is in the future
    if (preferredDate) {
      const selectedDate = new Date(preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        return NextResponse.json(
          {
            success: false,
            error: 'Data selectată trebuie să fie în viitor.',
          },
          { status: 400 }
        );
      }
    }

    // Insert into Supabase
    const { data, error } = await supabaseServer
      .from('tasting_reservations')
      .insert({
        name,
        email,
        phone: phone || null,
        preferred_date: preferredDate || null,
        guests,
        message: message || null,
        status: 'pending',
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'A apărut o eroare la salvarea rezervării.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data.id,
      message: 'Cererea dvs. a fost înregistrată cu succes.',
    });
  } catch (error) {
    console.error('Reservation API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'A apărut o eroare neașteptată.',
      },
      { status: 500 }
    );
  }
}
