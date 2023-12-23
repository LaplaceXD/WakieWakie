import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

import Home from "@/pages/home";
import Ping from "@/components/ping";
import Error from "@/pages/error";
import Messages from "@/pages/messages";
import App from "./App.tsx";
import Login from "@/pages/login";
import Register from "@/pages/register";


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

const link = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>,
);
