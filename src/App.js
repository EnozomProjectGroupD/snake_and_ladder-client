import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Layout from './Layout';
import Signup from './Signup';
import Home from './Home';
import Game from './Game';

function App() {
  const router = createBrowserRouter([
    {path:'/',element:<Layout></Layout>,children:[
      {index:true , element:<Home></Home>},
      {path:"/login", element:<Login></Login>},
      {path:'/signup' , element:<Signup></Signup>},
      {path:'/game' , element:<Game></Game>},
    ]},
  ])
  //* if now user token return to login page
  return (
   <>
   <RouterProvider router={router}/>
  </>
    
    
  );
}

export default App;
