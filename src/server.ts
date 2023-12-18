import morgan from "./logger/morgan";
import { connectToMongoDB } from "./dataAccess/mongooseConnection";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import typeDefs from "./graphql/typeDef";
import resolvers from "./graphql/resolves";
import apolloLogger from "./logger/apolloLogger";


connectToMongoDB();
const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer<{token?: string}>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), apolloLogger],
});

server.start().then(() => {
  app.use(
    "/",
    cors<cors.CorsRequest>(),
    express.json(),
    morgan,
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.access_token }),
    })
  );
  app.use("/", (req, res) => {
    res.json({ message: "hello form OMS server" });
  });

  new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  ).then(() => {
    console.log(`🚀 Server ready at http://localhost:4000/`);
  });
});
