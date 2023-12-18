import mongoose, { Schema } from "mongoose";
import ShippingInterface from "./biInterface";

// Define the schema for the shipping collection
const shippingSchema = new Schema<ShippingInterface>(
  {
    orderId: {
      type: String, // Assuming the orderId refers to another collection's ObjectId
      required: true,
    },
    orderDateExecution: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false }
);

// Create a model using the schema
const Shipping = mongoose.model<ShippingInterface>("shipping", shippingSchema);

export default Shipping;
