import newsResolvers from '../modules/news/news.resolvers';
const resolvers = {
  Query: {
    ...newsResolvers.Query,
  },
  Subscription: {
    ...newsResolvers.Subscription
},
};

export default resolvers;