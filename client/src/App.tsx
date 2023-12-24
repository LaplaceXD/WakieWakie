import React from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { CHECK_USER } from "@/components/check-user";
import Layout from "./components/layout";

export default function App() {
  const { loading, error, data } = useQuery(CHECK_USER);
  const navigate = useNavigate();

  if (error || (!loading && (!data || !data.me))) {
    navigate("/login");
  }

  return (
    <>
      <Layout />
    </>
  );
}
