import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ViewPaste from "./components/ViewPaste";
import Paste from "./components/Paste";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([

  // these arer routing paths 
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/pastes",
    element: (
      <>
        <Navbar />
        <Paste />
      </>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <>
        <Navbar />
        <ViewPaste />
      </>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
