import ordersDal from "./orders.dal";
import chalk from "chalk";
import { OrderInterface } from "./ordersInterface";

const getOrders = async () => {
  try {
    const orders = await ordersDal.getOrders();
    if (!orders) throw new Error("no products in the database");
    return orders;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};
const GetOrdersById = async (id: string) => {
  try {
    const orders = await ordersDal.GetOrdersById(id);
    if (!orders)
      throw new Error("no found products with current id in the database");
    return orders;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};
const postOrder = async (order: OrderInterface) => {
  try {
    const orders = await ordersDal.postOrder(order);
    if (orders) {
      return orders;
    } else {
      throw new Error("can't add order");
    }
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};
const putOrder = async (id: string, order: OrderInterface) => {
  try {
    const orders = await ordersDal.putOrder(id, order);
    if (orders) {
      return orders;
    } else {
      throw new Error("can't add order");
    }
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};
export default { getOrders, GetOrdersById, postOrder, putOrder };
