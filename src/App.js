import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Game from "./components/Game";
import ProtectedRoute from "./components/ProtectedRoute";
import Startgame from "./components/Startgame";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        { index: true, element: <Home></Home> },
        { path: "/login", element: <Login></Login> },
        { path: "/signup", element: <Signup></Signup> },
        {
          path: "/game",
          element: (
            <ProtectedRoute>
              <Game></Game>
            </ProtectedRoute>
          ),
        },
        { path: "/startgame", element: <Startgame></Startgame> },
      ],
    },
  ]);
  //* if now user token return to login page
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
