const ordersTypeDefs = `#graphql

type Product {
  name: String!
  description: String!
  price: Float!
  quantity: Int!
}


type ShippingDetails {
  address: String!
  contactNumber: String!
  orderType: OrderType!
}

enum OrderType {
  express
  regular
  pickup
}

enum OrderStatus {
  processing
  sent
  accepted
  cancelled
} 

type Order {
  _id: ID
  cartItems: [Product!]!
  orderTime: String!
  status: OrderStatus!
  price: Float!
  shippingDetails: ShippingDetails!
  userId: ID!
}
input ProductInput {
  name: String!
  description: String!
  price: Float!
  quantity: Int!
}


input ShippingDetailsInput {
  address: String!
  contactNumber: String!
  orderType: OrderType!
}

input OrderInput {
  _id: ID
  cartItems: [ProductInput!]!
  orderTime: String!
  status: OrderStatus!
  price: Float!
  shippingDetails: ShippingDetailsInput!
  userId: ID!
}
`


export const ordersQueryTypeDefs = `#graphql
    getAllOrders:[Order]
    getOrderByUserId(id:ID!): [Order]
  `;

export const ordersMutationTypeDefs = `#graphql 
  addOrder(newOrder: OrderInput): Order 
  updateOrder(id: ID!, updatedOrder: OrderInput): Order
`;

export default ordersTypeDefs;

