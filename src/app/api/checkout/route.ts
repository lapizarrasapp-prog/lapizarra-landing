import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20'
})

export async function POST(req: NextRequest) {
  const { plan } = await req.json()

  const priceId = plan === 'weekly'
    ? 'price_1TTB6PRbm2epvx7gFw3A3T6Y'
    : 'price_1TTB7kRbm2epvx7gEzSyk2Oj'

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://lapizarra-app.com'}/gracias`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://lapizarra-app.com'}/#precios`,
  })

  return NextResponse.json({ url: session.url })
}
