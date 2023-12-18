// import { ApolloServer } from "@apollo/server";
// import typeDefs from "./typeDef";
// import resolvers from "./resolvers";
// import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
// import express from "express";
// import http from 'http';

// interface MyContext {
//     token?: string;
//   }
  
// // Required logic for integrating with Express
// const app = express();
// // Our httpServer handles incoming requests to our Express app.
// // Below, we tell Apollo Server to "drain" this httpServer,
// // enabling our servers to shut down gracefully.
// const httpServer = http.createServer(app);

// // Same ApolloServer initialization as before, plus the drain plugin
// // for our httpServer.
// const server = new ApolloServer<MyContext>({
//   typeDefs,
//   resolvers,
//   plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
// });

// export default server;