import * as ordersService from "./orders.service";
import { handleError } from "../../utils/handleErrors";
import { Request, Response } from "express";
import { OrderInterface } from "./ordersInterface";
import { UserRequest } from "../middleWare/authService";
import UserInterface from "../users/UserInterface";

export const handleGetOrders = async (req: UserRequest, res: Response) => {
  try {
    const registeratorAdmin = req.user?.isAdmin
    if (!registeratorAdmin) return res.status(401).json({message: 'only admin allowed to get all orders'})
    const products = await ordersService.getOrders();
    return res.json(products).status(200);
  } catch (error) {
    handleError(res, error,500);
  }
};
export const GetOrdersById = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    if (id) {
      const products = await ordersService.GetOrdersById(id);
      return res.json(products).status(200);
    } else {
      return res.status(400).json({ error: "ID not found in the controller" });
    }
  } catch (error) {
    handleError(res, error,500);
  }
};
export const postOrder = async (req: Request, res: Response) => {
  try {
    const orderDetails: OrderInterface = req.body;
    if (orderDetails) {
      const newOrder = await ordersService.postOrder(orderDetails);
      return res.json(newOrder).status(201);
    } else {
      return res.status(400).json({ error: "Problem with the Order structure" });
    }
  } catch (error) {
    handleError(res, error,500);
  }
};
export const putOrder = async (req: UserRequest, res: Response) => {
  try {
    const registeratorAdmin = req.user?.isAdmin
    if (!registeratorAdmin) return res.status(401).json({message: 'only admin allowed to update orders'})
    const id = String(req.params.id);
    const orderDetails: OrderInterface = req.body;
    if (orderDetails) {
      const newOrder = await ordersService.putOrder(id,orderDetails);
      return res.json(newOrder).status(200);
    } else {
      return res.status(400).json({ error: "Problem with the Order structure" });
    }
  } catch (error) {
    handleError(res, error,500);
  }
};

