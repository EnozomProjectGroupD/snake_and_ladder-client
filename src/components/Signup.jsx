import React, {  useState } from "react";
import {  useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Signup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const SuccessToast = (event) => toast.success(event, {
    position: 'top-center',});
  const errorToast = (event) => toast.error(event, {
    position: 'top-center',});


  async function handleSignup(formData) {
    setLoading(true);
  
    try {
      const response = await axios.post("http://localhost:3000/api/user/sign-up", formData);
      const data = response.data;
  
       SuccessToast(data.message )
      console.log(data);

      console.log(data.message)
      console.log(data.token)
      await new Promise(resolve => setTimeout(resolve, 1500)); // Wait for 1.5 seconds

      navigate("/login");
    } catch (error) {
      console.log(error);
      errorToast(error.response.data.message )
      console.log(error.response.data.message )       
    }
  
    setLoading(false);
  }
  
 
  function handleSubmit(event) {
    event.preventDefault();
    const formData = {
      name: event.target.name.value,
      username: event.target.username.value,
      password: event.target.password.value,
    };
    console.log(formData)
    handleSignup(formData);
  }

  
  return (
    <>
      <Helmet>
        <title>Signup</title>
      </Helmet>
    <ToastContainer />

      <div className="align-items-center justify-content-center d-flex vh-100 flex-column">
        <h2>Sign up:</h2>
        <form
          className="form-control w-50 text-center d-flex flex-column align-items-center"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" className="my-2">
            Name:
          </label>
          <input type="text" id="name" name="name" className="w-75" required />
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
           <i className="fas fa-spinner fa-spin mx-2"></i>Signup
          </button>:
          <button type="submit" className="btn btn-outline-danger my-2 w-50">
          Signup
          </button>}
        </form>
      </div>
    </>
  );
}
