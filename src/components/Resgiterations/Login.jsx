import axios from 'axios'
import React, {  useState } from 'react'
import { Helmet } from 'react-helmet'
import {Link,  useNavigate } from 'react-router-dom'
import { ToastContainer,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorToast, SuccessToast } from '../Startgame';


export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  async function handleLogin(formData) {
    setLoading(true);
  
    try {
      const {data} = await axios.post("http://localhost:3000/api/user/log-in", formData);
      // console.log(data);
      SuccessToast('Redirecting to game..')
      localStorage.setItem('userToken',data.token)
      localStorage.setItem('userName',data.user.name)
      localStorage.setItem('userId',data.user.id)
      await new Promise(resolve => setTimeout(resolve, 500)); // Wait for .5 second
      navigate("/startgame");
    } catch (error) {
      console.log(error);
      ErrorToast(error.response.data.message )
      console.log(error.response.data.message ) 
   }
  
    setLoading(false);
  }
  function handleSubmit(event) {
    event.preventDefault();
    const formData = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    // console.log(formData)
    handleLogin(formData);
  }


  return (
  <>
  <Helmet>
      <title>Login</title>
    </Helmet>
    <ToastContainer />

    <div className='row'>
      <div className='col-md-6'></div>
    <div className='align-items-center justify-content-center d-flex vh-100 flex-column '>
   <h2>Login:</h2>
    <form className='form-control w-50 text-center d-flex flex-column align-items-center '   onSubmit={handleSubmit}>
    <label htmlFor="username" className="my-2">
      
    User Name:
          </label>
          <input type="text"   id="username" name="username" className="w-75"required   />

          <label htmlFor="password" className="my-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-75"
            required
          />
        { loading? 
          <button type="submit" className="btn btn-outline-danger my-2 w-50">
           <i className="fas fa-spinner fa-spin mx-2"></i>Login
          </button>:
          <button type="submit" className="btn btn-outline-danger my-2 w-50">
          Login
          </button>}
    </form>
    <p>you don't an account <Link to={'/signup'}>Sign up form here</Link></p>
    </div>
    </div>
  </>
  )
}
