import newsTypeDefs, { newsQueryTypeDefs, newsSubscriptionTypeDefs } from '../modules/news/news.typeDefs';
  const typeDefs = `#graphql   
    ${newsTypeDefs}
    type Query{
      ${newsQueryTypeDefs}
    } 
    type Subscription {
      ${newsSubscriptionTypeDefs}
  }
     `;
  
  export default typeDefs;