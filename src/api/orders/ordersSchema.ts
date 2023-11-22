import mongoose, { Schema } from "mongoose";
import { ProductInterface, ShippingDetails, OrderInterface } from "./ordersInterface";

const ProductSchema = new Schema<ProductInterface>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
}, { _id: false });

const ShippingDetailsSchema = new Schema<ShippingDetails>({
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
  orderType: { type: String, default: "regular" },
} , { _id: false });

const OrderSchema = new Schema<OrderInterface>({
  cartItems: [{ type: ProductSchema, required: true }],
  orderTime: { type: Date },
  status: { type: String, default: "processing" },
  price: { type: Number, required: true },
  shippingDetails: { type: ShippingDetailsSchema, required: true },
  userId: { type: String, required: true },
}, {versionKey: false});

const OrderModel = mongoose.model<OrderInterface>("Order", OrderSchema);

export default OrderModel;
