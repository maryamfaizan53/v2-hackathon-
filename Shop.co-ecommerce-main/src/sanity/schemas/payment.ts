import { defineField, defineType } from "sanity";

export default defineType({
  name: "payment",
  title: "Payment",
  type: "document",
  fields: [
    defineField({
      name: "method",
      title: "Payment Method",
      type: "string",
      options: {
        list: [
          { title: "Cash on Delivery", value: "cod" },
          { title: "Stripe", value: "stripe" },
          { title: "Bank Transfer", value: "bank" },
        ],
      },
    }),
    defineField({
      name: "status",
      title: "Payment Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Failed", value: "failed" },
        ],
      },
      initialValue: "pending",
    }),
    defineField({
      name: "orderId",
      title: "Related Order",
      type: "reference",
      to: [{ type: "order" }],
    }),
  ],
});
