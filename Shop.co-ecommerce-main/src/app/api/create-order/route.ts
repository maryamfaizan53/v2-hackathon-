// app/api/create-order/route.ts (Next.js 13) or pages/api/create-order.ts (Next.js <=12)
import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import  sanityConfig  from "../../../../sanity.config";

const client = createClient(sanityConfig);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // data might include shippingMethod, paymentMethod, etc.

    const newOrder = await client.create({
      _type: "order",
      ...data,
    });

    return NextResponse.json({ orderId: newOrder._id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
