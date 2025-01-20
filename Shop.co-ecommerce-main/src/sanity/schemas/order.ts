import { defineField, defineType } from "sanity";

export default defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    // ---- NEW FIELDS START ----
    defineField({
      name: "shippingMethod",
      title: "Shipping Method",
      type: "string",
      options: {
        list: [
          { title: "ShipEngine", value: "shipengine" },
          { title: "Self Pickup", value: "selfPickup" },
          { title: "Local Carrier", value: "localCarrier" },
        ],
      },
      description: "Which shipping method or carrier is used for this order.",
    }),
    defineField({
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
      options: {
        list: [
          { title: "Cash on Delivery", value: "cod" },
          { title: "Stripe", value: "stripe" },
          { title: "Bank Transfer", value: "bank" },
        ],
      },
      description: "How the customer chose to pay for this order.",
    }),
    defineField({
      name: "transactionId",
      title: "Transaction ID",
      type: "string",
      description:
        "Unique payment confirmation or reference code (if applicable).",
    }),
    // ---- NEW FIELDS END ----

    // 1) Advanced shipping details
    defineField({
      name: "shippingDetails",
      title: "Shipping Details",
      type: "object",
      fields: [
        defineField({
          name: "recipientName",
          title: "Recipient Name",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "email",
          title: "Email",
          type: "string",
          validation: (Rule) =>
            Rule.required().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
              name: "email",
              invert: false,
            }),
        }),
        defineField({
          name: "phone",
          title: "Phone Number",
          type: "string",
        }),
        defineField({
          name: "addressLine1",
          title: "Address Line 1",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "addressLine2",
          title: "Address Line 2",
          type: "string",
        }),
        defineField({
          name: "city",
          title: "City",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "state",
          title: "State / Province",
          type: "string",
        }),
        defineField({
          name: "zip",
          title: "ZIP / Postal Code",
          type: "string",
        }),
        defineField({
          name: "country",
          title: "Country",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // 2) Cart items
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "orderItem",
          fields: [
            { name: "productId", type: "string", title: "Product ID" },
            { name: "quantity", type: "number", title: "Quantity" },
            { name: "price", type: "number", title: "Price" },
          ],
        },
      ],
    }),

    // 3) Pricing & Status
    defineField({
      name: "subtotal",
      title: "Subtotal",
      type: "number",
    }),
    defineField({
      name: "discount",
      title: "Discount",
      type: "number",
    }),
    defineField({
      name: "deliveryFee",
      title: "Delivery Fee",
      type: "number",
    }),
    defineField({
      name: "total",
      title: "Total",
      type: "number",
    }),
    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending Payment", value: "pending_payment" },
          { title: "Processing", value: "processing" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
        ],
        layout: "radio",
      },
      initialValue: "pending_payment",
    }),
  ],
});
