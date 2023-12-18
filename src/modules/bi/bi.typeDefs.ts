const biTypeDefs = `#graphql
type Shipping {
    _id: String
    orderId: String!
    orderDateExecution: String!
}

type CompletedOrders {
    completedOrders: Int!
    date: String!
}

type ProfitsAndRevenue {
    month: String!
    revenue: Float!
    profits: Float!
}

type TopProducts {
    productName: String!
    profits: Float!
    unitsSold: Int!
}
`
export const biQueryTypeDefs = `#graphql
    getCompletedOrders:[CompletedOrders]
    getProfitsAndRevenue: [ProfitsAndRevenue]
    getTopProducts(month: Int):[TopProducts]
  `;

export default biTypeDefs