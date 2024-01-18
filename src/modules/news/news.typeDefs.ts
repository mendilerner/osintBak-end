const newsTypeDefs = `#graphql

type News {
  _id: String
  source: String
  link: String
  snippet: String
  body: String
  keywords: [String]
  time: String
  rating: Int
  matchTo: String
  coordinates: [Float]
}

`


export const newsQueryTypeDefs = `#graphql
    allNews: [News]
  `;

export const newsSubscriptionTypeDefs = `#graphql
    newOrUpdatedNews: News
    `;

export default newsTypeDefs