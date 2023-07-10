import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, Navigate } from 'react-router-dom'


export default function Login() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  async function handleSignup(formData) {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/user/log-in",
        formData
      );
      setLoading(true)
      setApiData(data);
      console.log(data);
      Navigate ("/game")
      setLoading(false)
      
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    handleSignup(formData);
  }

  useEffect(() => {
    handleSignup();
  }, []);


  return (
  <>
  <Helmet>
      <title>Login</title>
    </Helmet>
    <div className='row'>
      <div className='col-md-6'></div>
    <div className='align-items-center justify-content-center d-flex vh-100 flex-column '>
   <h2>Login:</h2>
    <form className='form-control w-50 text-center d-flex flex-column align-items-center'>
      
        <label for="name"className='my-2'>User Name:</label>
        <input type="text" id="name" name="name" className='w-75' required/>

        <label for="password" className='my-2'>Password:</label>
        <input type="password" id="password" name="password" className='w-75' required/>

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
