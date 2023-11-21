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


