import * as ordersService from "./orders.service";
import { handleError } from "../../utils/handleErrors";
import { Request, Response } from "express";
import { string } from "joi";
import { OrderInterface } from "./ordersInterface";

export const handleGetOrders = async (req: Request, res: Response) => {
  try {
    const products = await ordersService.getOrders();
    return res.json(products).status(200);
  } catch (error) {
    handleError(res, error);
  }
};
export const GetOrdersById = async (req: Request, res: Response) => {
  try {
    const id = String(req.body._id);
    if (id) {
      const products = await ordersService.GetOrdersById(id);
      return res.json(products).status(200);
    } else {
      return new Error("id not found in thee controller");
    }
  } catch (error) {
    handleError(res, error);
  }
};
export const postOrder = async (req: Request, res: Response) => {
  try {
    const orderDetails: OrderInterface = req.body;
    if (orderDetails) {
      const newOrder = await ordersService.postOrder(orderDetails);
      return res.json(newOrder).status(200);
    } else {
      return new Error("problem with the Order structure");
    }
  } catch (error) {
    handleError(res, error);
  }
};
export const putOrder = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const orderDetails: OrderInterface = req.body;
    if (orderDetails) {
      const newOrder = await ordersService.putOrder(id,orderDetails);
      return res.json(newOrder).status(200);
    } else {
      return new Error("problem with the Order structure");
    }
  } catch (error) {
    handleError(res, error);
  }
};

