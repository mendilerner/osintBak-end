import { handleCallDbError } from "../../utils/handleErrors";
import OrderModel from "./ordersSchema";
import { OrderInterface } from "./ordersInterface";
import cron from "node-cron";

 const getOrders = async (): Promise<OrderInterface[]> => {
  try {
    const data = await OrderModel.find().sort({ orderTime: -1 }).exec();
    return data;
  } catch (error) {
    return handleCallDbError(error);
  }
};
 const GetOrdersById = async (
  _userId: string
): Promise<OrderInterface[]> => {
  try {
    const order = await OrderModel.find({ userId: _userId }).exec();
    if (order.length === 0) throw Error("this user does not have any orders");
    return order;
  } catch (error) {
    return handleCallDbError(error);
  }
};
 const postOrder = async (
  order: OrderInterface
): Promise<OrderInterface> => {
  try {
    const newOrder = await OrderModel.create(order);
    console.log("New Order:", newOrder);
    return newOrder;
  } catch (error) {
    return handleCallDbError(error);
  }
};
 const putOrder = async (
  id: string,
  order: OrderInterface
): Promise<OrderInterface> => {
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(id, order, {
      new: true,
    });
    if (!updatedOrder) {
      throw new Error(`Order with ID ${id} not found`);
    }
    return updatedOrder;
  } catch (error) {
    return handleCallDbError(error);
  }
};
const updateOrdersStatus = async () => {
  try {
    const currentDate = new Date();
    const oneDayInMillis = 24 * 60 * 60 * 1000;
    let allOrders: OrderInterface[] = [];
    try {
      allOrders = await OrderModel.find().exec();
    } catch (error) {
      return handleCallDbError(error);
    }
    for (const order of allOrders) {
      const orderDate = order.orderTime as Date;
      const timePassed = currentDate.getTime() - orderDate.getTime();
      if (
        (timePassed>oneDayInMillis&&timePassed<2 &&
          order.status === "processing" &&
          order.shippingDetails.orderType === "express") ||
        (timePassed*5>oneDayInMillis&&timePassed<6 &&
          order.status === "processing" &&
          order.shippingDetails.orderType === "regular")
      ) {
        const updatedOrder = await OrderModel.findByIdAndUpdate(
          order._id,
          { status: "sent" },
          { new: true }
        );
        if (updatedOrder) {
          console.log(
            " updating order work:",
            order._id,
            "status:",
            updatedOrder.status
          );
        } else {
          console.error("Error updating order:", order._id);
        }
      } else if (
        (timePassed*5>oneDayInMillis&&timePassed<6 &&
          order.status === "sent" &&
          order.shippingDetails.orderType === "express") ||
        (timePassed*14>oneDayInMillis&&timePassed<15 &&
          order.status === "sent" &&
          order.shippingDetails.orderType === "regular")
      ) {
        const updatedOrder = await OrderModel.findByIdAndUpdate(
          order._id,
          { status: "accepted" },
          { new: true }
        );
        if (updatedOrder) {
          console.log(
            " updating order work:",
            order._id,
            "status:",
            updatedOrder.status
          );
        } else {
          console.error("Error updating order:", order._id);
        }
      }
    }
  } catch (error) {
    console.error("Error updating orders:", error);
    throw new Error("Failed to update orders");
  }
};
cron.schedule(
  "0 0 * * *",
  async () => {
    try {
      await updateOrdersStatus();
    } catch (error) {
      console.error("Error running updateOrdersStatus function:", error);
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Jerusalem",
  }
);
export default{getOrders,GetOrdersById,postOrder,putOrder}