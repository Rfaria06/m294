import "./App.css";
import Header from "./components/Header/Header";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return (
    <main>
      <div className="header">
        <Header />
      </div>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
