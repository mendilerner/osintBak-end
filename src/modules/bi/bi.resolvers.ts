import { handleError } from "../../utils/handleErrors";
import { Request, Response } from "express";
import biDal from "./bi.dal";
import { getOrSetCache, getOrSetCacheWithArgument } from "../../dataAccess/redisClient";
import pubsub from "../../pubsub/pubsub";

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
      const OrdersPerDate = await getOrSetCache("completedOrders",biDal.getOrdersByDateExecution)
      return OrdersPerDate
    },
    getProfitsAndRevenue: async () => {
      const profitsAndRevenue = await getOrSetCache("ProfitsAndRevenue", biDal.getProfitsPerMonth)
      return profitsAndRevenue
    },
    getTopProducts: async(parent: any,{ month }: { month: number }) => {
      const _month: number = Number(month) || new Date().getMonth()
      const topProfitableProductForMonth = await getOrSetCacheWithArgument("TopProducts", biDal.getTopProfitableProducts, _month)
      return topProfitableProductForMonth
    }
  },
  Subscription: {
    topProducts: {
      subscribe: () => {
        return pubsub.asyncIterator("topProducts");
      },
    },
    profitsAndRevenue: {
      subscribe: () => {
        return pubsub.asyncIterator("profitsAndRevenue");
      },
    },
    completedOrders: {
        subscribe: () => {
          return pubsub.asyncIterator("completedOrders");
        },
      },
    
  }
}


export default biResolvers