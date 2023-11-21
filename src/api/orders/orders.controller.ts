import * as ordersService from "./orders.service";
import { handleError } from "../../utils/handleErrors";
import { Request, Response } from "express";

export const handleGetOrders = async (req: Request, res: Response) => {
  try {
    const products = await ordersService.getOrders();
    return res.json(products).status(200)
  } catch (error) {
    handleError(res, error);
  }
};
