"use client";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";
import React, { FC, ReactNode } from "react";

const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider;
