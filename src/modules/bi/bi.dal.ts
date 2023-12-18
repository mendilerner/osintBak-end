import { handleCallDbError } from "../../utils/handleErrors";
import OrderModel from "../orders/orders.model";
import ShippingInterface, {
  CompletedOrdersInterface,
  ProfitsAndRevenueInterface,
  topProductsInterface,
} from "./biInterface";
import Shipping from "./biShippingSchema";

const getShipping = async (): Promise<ShippingInterface[]> => {
  try {
    const data = await Shipping.find().exec();
    return data;
  } catch (error) {
    return handleCallDbError(error);
  }
};

const getOrdersByDateExecution = async (): Promise<
  CompletedOrdersInterface[]
> => {
  try {
    const result = await Shipping.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%d/%m/%Y", date: "$orderDateExecution" },
          },
          completedOrders: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          completedOrders: 1,
        },
      },
      {
        $sort: { date: 1 }, // Sort by date in ascending order (1 for ascending)
      },
    ]);
    return result;
  } catch (error) {
    return handleCallDbError(error);
  }
};

const getProfitsPerMonth = async (): Promise<ProfitsAndRevenueInterface[]> => {
  try {
    const monthlyStats = await OrderModel.aggregate([
      {
        $match: {
          status: { $ne: "cancelled" }, // Exclude orders with 'cancelled' status
        },
      },
      {
        $addFields: {
          cartItemsTotal: {
            $sum: {
              $map: {
                input: "$cartItems",
                as: "item",
                in: { $multiply: ["$$item.price", "$$item.quantity"] },
              },
            },
          },
          cartItemsProfit: {
            $sum: {
              $map: {
                input: "$cartItems",
                as: "item",
                in: { $multiply: ["$$item.profit", "$$item.quantity"] },
              },
            },
          },
          month: {
            $let: {
              vars: {
                monthsArray: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ],
              },
              in: {
                $arrayElemAt: [
                  "$$monthsArray",
                  { $subtract: [{ $month: "$orderTime" }, 1] },
                ],
              },
            },
          },
        },
      },
      {
        $group: {
          _id: "$month",
          revenue: { $sum: "$cartItemsTotal" },
          profits: { $sum: "$cartItemsProfit" },
        },
      },
      {
        $addFields: {
          monthOrder: {
            $indexOfArray: [
              [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              "$_id",
            ],
          },
        },
      },
      {
        $sort: { monthOrder: 1 },
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          revenue: { $round: ["$revenue", 2] },
          profits: { $round: ["$profits", 2] },
        },
      },
    ]);

    return monthlyStats;
  } catch (error) {
    return handleCallDbError(error);
  }
};

const getTopProfitableProducts = async (
  monthNumber: number
): Promise<topProductsInterface[]> => {
  try {
    const topProducts = await OrderModel.aggregate([
      {
        $match: {
          status: { $ne: "cancelled" },
          $expr: { $eq: [{ $month: "$orderTime" }, monthNumber] },
        },
      },
      {
        $unwind: "$cartItems",
      },
      {
        $group: {
          _id: "$cartItems.name",
          productName: { $first: "$cartItems.name" },
          profits: {
            $sum: { $multiply: ["$cartItems.profit", "$cartItems.quantity"] },
          },
          unitsSold: { $sum: "$cartItems.quantity" },
        },
      },
      {
        $sort: { profits: -1, unitsSold: -1 }, // Sort in descending order by profits and unitsSold
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: 0,
          productName: 1,
          profits: { $round: ["$profits", 2] },
          unitsSold: 1,
        },
      },
    ]);

    return topProducts;
  } catch (error) {
    return handleCallDbError(error);
  }
};

export default {
  getShipping,
  getOrdersByDateExecution,
  getProfitsPerMonth,
  getTopProfitableProducts,
};
