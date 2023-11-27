import * as ordersDal from "./orders.dal";
import chalk from "chalk";  
import { OrderInterface } from "./ordersInterface";

export const getOrders = async () => {
  try {
    const orders = await ordersDal.getOrders();
    if (!orders) throw new Error("no products in the database");
    return orders;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const GetOrdersById = async (id: string) => {
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

export const postOrder = async (order: OrderInterface) => {
  try {
    if (order) {
      const orders = await ordersDal.postOrder(order);
      return orders;
    } else {
      throw new Error("can't add order");
    }
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};
export const putOrder = async (id:string,order: OrderInterface) => {
  try {
    if (order) {
      const orders = await ordersDal.putOrder(id,order);
      return orders;
    } else {
      throw new Error("can't add order");
    }
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};
