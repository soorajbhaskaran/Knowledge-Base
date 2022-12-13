import React from "react";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "reactquery";

import queryClient from "apis/queryClient";

const withReactQuery = Component => {
  const QueryWrapper = props => (
    <QueryClientProvider client={queryClient}>
      <Component {...props} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );

  return QueryWrapper;
};

export default withReactQuery;
