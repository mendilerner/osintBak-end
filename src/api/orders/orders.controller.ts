import ordersService from "./orders.service";
import { handleError } from "../../utils/handleErrors";
import { Request, Response } from "express";
import { OrderInterface } from "./ordersInterface";
import { UserRequest } from "../middleWare/authMiddleWare/authInterfaces";

const getOrders = async (req: UserRequest, res: Response) => {
  try {
    const registeratorAdmin = req.user?.isAdmin;
    if (!registeratorAdmin)
      return res
        .status(401)
        .json({ message: "Authentication error: Unauthorized user" });
    const products = await ordersService.getOrders();
    return res.json(products).status(200);
  } catch (error) {
    handleError(res, error, 500);
  }
};
const getOrdersById = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const products = await ordersService.GetOrdersById(id);
    if (products) {
      return res.json(products).status(200);
    } else {
      return res.status(400).json({ error: " no order found with this ID " });
    }
  } catch (error) {
    handleError(res, error, 500);
  }
};
const postOrder = async (req: Request, res: Response) => {
  try {
    const orderDetails: OrderInterface = req.body;
    const newOrder = await ordersService.postOrder(orderDetails);
    if (newOrder) {
      return res.json(newOrder).status(201);
    } else {
      return res.status(400).json({ error: "can't post Order " });
    }
  } catch (error) {
    handleError(res, error, 500);
  }
};
const putOrder = async (req: UserRequest, res: Response) => {
  try {
    const registeratorAdmin = req.user?.isAdmin;
    if (!registeratorAdmin)
      return res
        .status(401)
        .json({ message: "Authentication error: Unauthorized user" });
    const id = String(req.params.id);
    const orderDetails: OrderInterface = req.body;
    const newOrder = await ordersService.putOrder(id, orderDetails);
    if (newOrder) {
      return res.json(newOrder).status(200);
    } else {
      return res.status(400).json({ error: "Problem with the put the order " });
    }
  } catch (error) {
    handleError(res, error, 500);
  }
};
export default { getOrders, getOrdersById, postOrder, putOrder };
