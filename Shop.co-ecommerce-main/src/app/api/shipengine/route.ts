// app/api/shipengine/route.ts (Next.js 13 example)
// or pages/api/shipengine.ts if on Next.js pages router

import { NextResponse } from "next/server";

// An example server route for calling ShipEngine's API
// Remember to store your SHIPENGINE_API_KEY as an environment variable
export async function POST(request: Request) {
  try {
    const { addressTo, addressFrom, packageDetails } = await request.json();

    // For actual shipping rate estimates:
    // https://shipengine.github.io/shipengine-openapi/#operation/rates-estimate
    // Sample:
    const response = await fetch("https://api.shipengine.com/v1/rates/estimate", {
      method: "POST",
      headers: {
        "API-Key": process.env.SHIPENGINE_API_KEY || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carrier_ids: ["se-12345"], // example carrier ID
        from_country_code: addressFrom.country,
        from_postal_code: addressFrom.zip,
        to_country_code: addressTo.country,
        to_postal_code: addressTo.zip,
        weight: packageDetails.weight,
        dimensions: packageDetails.dimensions,
        confirmation: "none",
        address_residential_indicator: "yes",
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch ShipEngine rates");
    }
    const ratesData = await response.json();
    return NextResponse.json(ratesData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
