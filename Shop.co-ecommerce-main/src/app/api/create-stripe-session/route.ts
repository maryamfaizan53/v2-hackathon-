// // app/api/create-stripe-session/route.ts (Next.js 13 example)
// // or pages/api/create-stripe-session.ts if on Next.js pages router

// import Stripe from "stripe";
// import { NextResponse } from "next/server";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
//   apiVersion: "2022-11-15",
// });

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { items, shippingDetails, subtotal, discount, deliveryFee, total } = body;

//     // Construct line items for Stripe from your cart items.
//     const lineItems = items.map((item: any) => ({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: item.title,
//         },
//         unit_amount: Math.round(item.price * 100), // in cents
//       },
//       quantity: item.quantity,
//     }));

//     // Optionally add shipping or other fees as a separate line item
//     if (deliveryFee) {
//       lineItems.push({
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: "Delivery Fee",
//           },
//           unit_amount: Math.round(deliveryFee * 100),
//         },
//         quantity: 1,
//       });
//     }

//     // Create a Stripe Checkout Session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: "http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}",
//       cancel_url: "http://localhost:3000/payment-cancel",
//       // If you want to collect shipping details in Stripe:
//       shipping_address_collection: {
//         allowed_countries: ["US", "CA"], // example
//       },
//       // If you have tax rates, shipping rates, etc., add them here
//     });

//     return NextResponse.json({ id: session.id });
//   } catch (err: any) {
//     console.error(err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }
