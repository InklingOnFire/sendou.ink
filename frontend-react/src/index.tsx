import theme from "@chakra-ui/theme";
import ApolloClient from "apollo-boost";
import { HelmetProvider } from "components/home/node_modules/react-helmet-async";
import { ApolloProvider } from "components/root/node_modules/@apollo/react-hooks";
import { ChakraProvider } from "components/root/node_modules/@chakra-ui/core";
import {
  createHistory,
  LocationProvider,
} from "components/root/node_modules/@reach/router";
import { QueryParamProvider } from "components/tournaments/node_modules/use-query-params";
import React from "react";
import ReactDOM from "react-dom";
import App from "../../components/root/App";
import "./i18n";
import * as serviceWorker from "./serviceWorker";

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "/graphql"
      : "http://localhost:3001/graphql",
});

let history = createHistory(window as any);

ReactDOM.render(
  <LocationProvider history={history}>
    <QueryParamProvider reachHistory={history}>
      <HelmetProvider>
        <ApolloProvider client={client}>
          <ChakraProvider theme={theme} resetCSS>
            <App />
          </ChakraProvider>
        </ApolloProvider>
      </HelmetProvider>
    </QueryParamProvider>
  </LocationProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
