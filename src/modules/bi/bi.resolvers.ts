import { handleError } from "../../utils/handleErrors";
import { Request, Response } from "express";
import biDal from "./bi.dal";

export const handelBi = async (req: Request, res: Response) => {
  try {
    const shippings = await biDal.getShipping()
    return res.json(shippings).status(200);
  } catch (error) {
    handleError(res, error, 500);
  }
};
const biResolvers = {
  Query:{
    getCompletedOrders: async () => {
      const OrdersPerDate = await biDal.getOrdersByDateExecution()
      return OrdersPerDate
    },
    getProfitsAndRevenue: async () => {
      const profitsAndRevenue = await biDal.getProfitsPerMonth()
      return profitsAndRevenue
    },
    getTopProducts: async(parent: any,{ month }: { month: number }) => {
      const _month: number = Number(month) || new Date().getMonth()
      const topProfitableProductForMonth = await biDal.getTopProfitableProducts(_month)
      return topProfitableProductForMonth
    }
  }
}


export default biResolvers