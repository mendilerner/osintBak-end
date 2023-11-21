import * as ordersDal from './orders.dal'
import chalk from "chalk";




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