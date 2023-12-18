import auth from "../../auth/authFunction";
import redis, {
  getOrSetCache,
  getOrSetCacheWithArgument,
} from "../../dataAccess/redisClient";
import ordersService from "./orders.service";
import { OrderInterface } from "./ordersInterface";
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
        redis.del("orders");
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
        redis.del("orders");
        redis.del(`ordersOf{${id}}`);
        return updatedOrderFromDB;
      }
    },
  },
};

export default ordersResolvers;
