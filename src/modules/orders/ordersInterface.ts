
export interface ProductInterface {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface ShippingDetails {
  address: string;
  contactNumber: string;
  orderType: "express" | "regular" | "pickup";
}

export interface OrderInterface {
  _id?: string
  cartItems: ProductInterface[];
  orderTime: Date;
  status: "processing" | "sent" | "accepted" | "cancelled";
  price: number;
  shippingDetails: ShippingDetails;
  userId: string;
}
