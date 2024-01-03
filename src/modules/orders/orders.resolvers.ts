import auth from "../../auth/authFunction";
import redis, {
  getOrSetCache,
  getOrSetCacheWithArgument,
} from "../../dataAccess/redisClient";
import pubsub from "../../pubsub/pubsub";
import biDal from "../bi/bi.dal";
import ordersService from "./orders.service";
import { OrderInterface } from "./ordersInterface";

const publishData = async (data:[], key: string) => {
  pubsub.publish(key, { [key]: data });
  await redis.set(key, JSON.stringify(data));
  return data;
};
const ordersResolvers = {
  Query: {
    getAllOrders: async (
      parent: any,
      args: any,
      { token }: { token: string }
    ) => {
      const tokenInfo = auth(token);
      const registeratorAdmin = tokenInfo?.isAdmin;
      if (!registeratorAdmin)
        throw new Error("Authentication error: Unauthorized user");
      const orders = await getOrSetCache("orders", ordersService.getOrders);
      return orders;
    },
    getOrderByUserId: async (parent: any, { id }: { id: string }) => {
      const orders = await getOrSetCacheWithArgument(
        `ordersOf{${id}}`,
        ordersService.GetOrdersById,
        id
      );
      if (!orders) {
        throw new Error("no order found with this user ID ");
      } else {
        return orders;
      }
    },
  },
  Mutation: {
    addOrder: async (
      parent: any,
      { id, newOrder }: { id: string; newOrder: OrderInterface }
    ) => {
      const newOrderFromDB = await ordersService.postOrder(newOrder);
      if (!newOrder) {
        throw new Error("can't post Order ");
      } else {
        const profitsAndRevenue = await biDal.getProfitsPerMonth()
        pubsub.publish("profitsAndRevenue", { profitsAndRevenue: profitsAndRevenue });
        redis.del(["orders","ProfitsAndRevenue","completedOrders","TopProducts"]);
        return newOrderFromDB;
      }
    },
    updateOrder: async (
      parent: any,
      { id, updatedOrder }: { id: string; updatedOrder: OrderInterface },
      { token }: { token: string }
    ) => {
      const tokenInfo = auth(token);
      const registeratorAdmin = tokenInfo?.isAdmin;
      if (!registeratorAdmin)
        throw new Error("Authentication error: Unauthorized user");
      const updatedOrderFromDB = await ordersService.putOrder(id, updatedOrder);
      if (!updatedOrderFromDB) {
        throw new Error("Problem with the put the order");
      } else {
        redis.del(["orders","ProfitsAndRevenue","completedOrders","TopProducts",`ordersOf{${id}}`]);
        setTimeout(
          async () => {
            const completedOrders = await biDal.getOrdersByDateExecution()
            pubsub.publish("completedOrders", { completedOrders: completedOrders });
            await redis.set("completedOrders", JSON.stringify(completedOrders));
          },5000
        )
     
        return updatedOrderFromDB;
      }
    },
  }
};

export default ordersResolvers;
