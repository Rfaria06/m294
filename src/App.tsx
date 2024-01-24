import "./App.css";
import Header from "./components/Header/Header";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <main>
      <div className="header">
        <Header />
      </div>
      <Toaster />
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
