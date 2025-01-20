// lib/queries.ts

/**
 * Query to fetch all products.
 */
export const allProductsQuery = `
  *[_type == "product"]{
    _id,
    "name": title,
    "slug": slug.current,
    price,
    rating,
    originalPrice,
    description,
    "images": images[]{
      "uploadedUrl": asset->url,
      "externalUrl": url,
      alt
    }
  }
`;

/**
 * Query to fetch a single product by slug.
 */
export const singleProductBySlugQuery = `
  *[_type == "product" && slug.current == $slug][0]{
    _id,
    "name": title,
    slug,
    price,
    rating,
    description,
    "images": images[]{
      "uploadedUrl": asset->url,
      "externalUrl": url,
      alt
    }
  }
`;
