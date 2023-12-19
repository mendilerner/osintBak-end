import userTypeDef, { usersMutationTypeDefs} from '../modules/users/users.typeDefs'
import ordersTypeDefs , {ordersMutationTypeDefs, ordersQueryTypeDefs} from '../modules/orders/orders.typeDefs';
import biTypeDefs, { biQueryTypeDefs } from '../modules/bi/bi.typeDefs';
  const typeDefs = `#graphql   
  
    ${userTypeDef}
    ${ordersTypeDefs}
    ${biTypeDefs}
    type Query{
      ${ordersQueryTypeDefs}
      ${biQueryTypeDefs}
    } 

    type Mutation{
      ${usersMutationTypeDefs}
      ${ordersMutationTypeDefs}
    }

    type Subscription {
      completedOrders: [CompletedOrders]
  }
     `;
  
  export default typeDefs;