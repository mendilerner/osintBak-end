import {getAllNewsFromRedis} from "./news.dal";
import pubsub from "../../pubsub/pubsub";


const newsResolvers = {
  Query:{
    allNews: async () => {
      const allNews = await getAllNewsFromRedis()
      return allNews
    },
    
  },
  Subscription: {
    newOrUpdatedNews: {
        subscribe: () => {
          return pubsub.asyncIterator("newOrUpdatednews");
        },
      },
    
  }
}


export default newsResolvers