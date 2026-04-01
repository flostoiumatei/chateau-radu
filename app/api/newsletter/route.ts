import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import { newsletterSchema } from '@/lib/validations/newsletter';

// TODO: Add rate limiting for production (e.g., Upstash Redis)

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate with Zod
    const validationResult = newsletterSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Adresa de email nu este validă.',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email } = validationResult.data;

    // Try to insert into Supabase
    const { data, error } = await supabaseServer
      .from('newsletter_subscribers')
      .insert({
        email,
        source: 'website',
      })
      .select('id')
      .single();

    // Handle unique constraint violation (already subscribed)
    if (error) {
      // PostgreSQL unique violation error code
      if (error.code === '23505') {
        return NextResponse.json({
          success: true,
          alreadySubscribed: true,
        });
      }

      console.error('Supabase error:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'A apărut o eroare la salvarea abonamentului.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      alreadySubscribed: false,
      id: data.id,
    });
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'A apărut o eroare neașteptată.',
      },
      { status: 500 }
    );
  }
}
