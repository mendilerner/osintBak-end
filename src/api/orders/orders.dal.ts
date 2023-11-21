import { handleCallDbError } from "../../utils/handleErrors";
import OrderModel from "./ordersSchema";
import { OrderInterface } from "./ordersInterface";


export const getOrders = async (): Promise<OrderInterface[]> => {
  try {
    const data = await OrderModel.find().exec();
    return data;
  } catch (error) {
    return handleCallDbError(error);
  }
};
export const GetOrdersById = async (id: string): Promise<OrderInterface|null> => {
  try {
    if (id.length !== 24) {
      throw new Error("Invalid ID"); 
    }
    const order = await OrderModel.findById(id).exec(); 
    return order; 
  } catch (error) {
    return handleCallDbError(error);
  }
};
export const postOrder = async (order: OrderInterface): Promise<OrderInterface > => {
  try {
    const newOrder = await OrderModel.create(order);
    console.log("New Order:", newOrder); 
    return newOrder;
  } catch (error) {
    return handleCallDbError(error);
  }
};
export const putOrder = async (id: string, order: OrderInterface): Promise<OrderInterface > => {
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(id, order, { new: true });
    if (!updatedOrder) {
      throw new Error(`Order with ID ${id} not found`);
    }
    return updatedOrder;
  } catch (error) {
    return handleCallDbError(error);
  }
};

