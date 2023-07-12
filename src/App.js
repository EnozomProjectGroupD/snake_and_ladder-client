import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/Resgiterations/Login";
import Layout from "./components/Layout";
import Signup from "./components/Resgiterations/Signup";
import Home from "./components/Home/Home";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Startgame from "./components/Startgame";
import Joinggame from "./components/Joinggame";
import Playground from './components/Playground';
import Snakeandladder from './components/Game/Snakeandladder';
import NotFound from "./components/NotFound/NotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        { index: true, element: <Home></Home> },
        { path: "/login", element: <Login></Login> },
        { path: "/signup", element: <Signup></Signup> },
        { path: "/snake", element: <Snakeandladder></Snakeandladder> },

        {
          path: "/startgame",
          element: (
            <ProtectedRoute>
              <Startgame></Startgame>
            </ProtectedRoute>
          ),
        },
        {
          path: "/joingame",
          element: (
            <ProtectedRoute>
              <Joinggame></Joinggame>
            </ProtectedRoute>
          ),
        },
        {
          path: "/playground/:id",
          element: (
            <ProtectedRoute>
              <Playground></Playground>
            </ProtectedRoute>
          ),
        },
        {
          path: "*",
          element: (
              <NotFound></NotFound>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
