import { defineField, defineType } from "sanity";

export default defineType({
  name: "tracking",
  title: "Tracking",
  type: "document",
  fields: [
    defineField({
      name: "orderId",
      title: "Order",
      type: "reference",
      to: [{ type: "order" }],
    }),
    defineField({
      name: "trackingNumber",
      title: "Tracking Number",
      type: "string",
    }),
    defineField({
      name: "carrier",
      title: "Carrier",
      type: "string",
    }),
    defineField({
      name: "status",
      title: "Delivery Status",
      type: "string",
      options: {
        list: [
          { title: "In Transit", value: "in_transit" },
          { title: "Out for Delivery", value: "out_for_delivery" },
          { title: "Delivered", value: "delivered" },
        ],
      },
      initialValue: "in_transit",
    }),
    defineField({
      name: "expectedDelivery",
      title: "Expected Delivery Date",
      type: "datetime",
    }),
  ],
});
