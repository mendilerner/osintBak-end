import usersResolvers from '../modules/users/users.resolvers'
import ordersResolvers from '../modules/orders/orders.resolvers';
import biResolvers from '../modules/bi/bi.resolvers';
const resolvers = {
  Query: {
    ...ordersResolvers.Query,
    ...biResolvers.Query
  },
  Mutation:{
    ...usersResolvers.Mutation,
    ...ordersResolvers.Mutation
  },
  Subscription: {
    ...biResolvers.Subscription
},
};

export default resolvers;