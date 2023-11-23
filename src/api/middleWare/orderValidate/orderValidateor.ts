import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateOrder = (req: Request, res: Response, next: NextFunction) => {
  const orderSchema = Joi.object({
    _id: Joi.string().allow(''),
    cartItems: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required().min(1),
      })
    ).min(1).required(),
    orderTime: Joi.date().default(new Date().toISOString()),
    status: Joi.string().valid('processing', 'sent', 'accepted', 'cancelled').required(),
    price: Joi.number().required(),
    shippingDetails: Joi.object({
      address: Joi.string().when('orderType', {
        is: Joi.not('pickup'),
        then: Joi.string().required(),
        otherwise: Joi.string().allow(''),
      }),
      contactNumber: Joi.string().when('orderType', {
        is: Joi.not('pickup'),
        then: Joi.string().required(),
        otherwise: Joi.string().allow(''),
      }),
      orderType: Joi.string().valid('express', 'regular', 'pickup').required(),
    }).required(),
    userId: Joi.string().required(),
  });

  const { error } = orderSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};
