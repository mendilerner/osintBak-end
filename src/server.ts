import morgan from "./logger/morgan";
import { connectToMongoDB } from "./dataAccess/mongooseConnection";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import express from "express";
import http from "http";
import cors from "cors";
import typeDefs from "./graphql/typeDef";
import resolvers from "./graphql/resolves";
import apolloLogger from "./logger/apolloLogger";
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";
import { makeExecutableSchema } from '@graphql-tools/schema';

connectToMongoDB();

const app = express();

const schema = makeExecutableSchema({ typeDefs, resolvers });

const httpServer = http.createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});
// Save the returned server's info so it can be shutdown later
const serverCleanup = useServer({schema }, wsServer);

const server = new ApolloServer<{token?: string}>({ schema,
  plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
          async serverWillStart() {
              return {
                  async drainServer() {
                      await serverCleanup.dispose();
                  },
              };
          },
      }
  ] });

  
server.start().then(() => {
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    morgan,
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.access_token }),
    })
  );
  

  new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  ).then(() => {
    console.log(`🚀 Server ready at http://localhost:4000/`);
  });
});
