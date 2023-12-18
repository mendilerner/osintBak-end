import chalk from "chalk";
import { GraphQLRequestContext, BaseContext } from "@apollo/server";

const apolloLogger = {
  async requestDidStart({ request }: GraphQLRequestContext<BaseContext>) {
    request.http &&
      console.log(
        chalk.cyanBright(
          `[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}] ${
            request.http.method
          } ${request.query}`
        )
      );
  },
};

export default apolloLogger;