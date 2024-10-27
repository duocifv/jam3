"use client";
import React, { ReactNode } from "react";
import { createApolloClient } from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";

const client = createApolloClient();
const ProviderClient = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ProviderClient;
