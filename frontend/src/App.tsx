import {RouterProvider} from "react-router-dom";
import {routes} from "src/router/routes.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "sonner";

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
        <Toaster richColors/>
    </QueryClientProvider>
  )
}

export default App
