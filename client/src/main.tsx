import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

import Home from "@/pages/home";
import Ping from "@/components/ping";
import Error from "@/pages/error";
import Messages from "@/pages/messages";
import App from "./App.tsx";
import Login from "@/pages/login";
import Register from "@/pages/register";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        // Remove this later on
        path: "/ping",
        element: <Ping />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },
]);

let GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT || "";
let WS_GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_WS_ENDPOINT || "";

if (!import.meta.env.PROD) {
  GRAPHQL_ENDPOINT ||= "http://localhost:4000/graphql";
  WS_GRAPHQL_ENDPOINT ||= "ws://localhost:4000/graphql";
}

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
  credentials: "include",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: WS_GRAPHQL_ENDPOINT,
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  credentials: "include",
  defaultOptions: {
    watchQuery: {
      nextFetchPolicy: "no-cache",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
      <ToastContainer autoClose={3000} hideProgressBar={true} theme="colored" />
    </ApolloProvider>
  </React.StrictMode>,
);
