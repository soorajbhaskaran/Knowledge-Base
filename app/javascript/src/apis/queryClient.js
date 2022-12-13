import { QueryCache, QueryClient } from "reactquery";

const queryClient = new QueryClient({ queryCache: new QueryCache() });

export default queryClient;
