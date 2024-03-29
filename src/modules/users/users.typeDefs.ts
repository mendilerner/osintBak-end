const typeDefs = `#graphql
  type User {
    id: ID!
    userName: String
    email: String
    password: String
    isAdmin: Boolean
  }

  input newUser {
    userName: String
    email: String
    password: String
    isAdmin: Boolean
  }

  type UserAddedResponse{
      message: String 
      user: User
  }
  type UserLoggedResponse{
    access_token: String
  }

  type SendEmailToJoinResponse{
    message: String
  }
`

export const usersMutationTypeDefs = `#graphql  
  addUser(newUser: newUser): UserAddedResponse 
  loginUser(email: String!, password: String!): UserLoggedResponse
  sendEmailToJoin(email: String!, userName: String!):SendEmailToJoinResponse
`;
export default typeDefs