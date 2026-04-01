import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import { contactSchema } from '@/lib/validations/contact';

// TODO: Add rate limiting for production (e.g., Upstash Redis)
// Example: import { Ratelimit } from '@upstash/ratelimit'

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate with Zod
    const validationResult = contactSchema.safeParse(body);

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

    const { name, email, message } = validationResult.data;

    // Insert into Supabase
    const { data, error } = await supabaseServer
      .from('contact_messages')
      .insert({
        name,
        email,
        message,
        status: 'new',
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'A apărut o eroare la salvarea mesajului.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data.id,
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'A apărut o eroare neașteptată.',
      },
      { status: 500 }
    );
  }
}
