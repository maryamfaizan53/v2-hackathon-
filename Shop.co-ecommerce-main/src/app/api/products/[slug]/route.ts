// app/api/products/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '../../../../sanity/lib/sanity.client';
import { singleProductBySlugQuery } from '../../../../sanity/lib/queries';

interface Params {
  slug: string; // normal string
}

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  // Normal destructuring
  const { slug } = params;

  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
  }

  try {
    const product = await sanityClient.fetch(singleProductBySlugQuery, { slug });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
