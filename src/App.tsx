import "./App.css";
import { Suspense } from "react";
import Header from "./components/Header/Header";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient: QueryClient = new QueryClient();

function App() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <QueryClientProvider client={queryClient}>
          <div className="header">
            <Header />
          </div>
          <Toaster />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Suspense>
    </main>
  );
}

export default App;
