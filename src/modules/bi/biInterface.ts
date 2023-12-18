export default interface ShippingInterface{
    _id?: string;
    orderId: string;
    orderDateExecution: Date;
}

export  interface CompletedOrdersInterface{
    completedOrders: number;
    date: string;
}

export interface ProfitsAndRevenueInterface{
    month: string,
    revenue: number,
    profits: number      
}

export interface ProfitsAndRevenueInterface{
    month: string,
    revenue: number,
    profits: number      
}

export interface topProductsInterface{
    productName: string,
    profits: number,
    unitsSold: number
}