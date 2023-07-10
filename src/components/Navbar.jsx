import React from "react";
import { Link} from "react-router-dom";
// import { styled } from 'styled-components';


// const Text= styled`
// color: red !important;
// padding:50px;

// `
export default function Navbar() {
    //*use navigate for logout
// const navigate = useNavigate ()
//   function logOut(){

//   localStorage.removeItem("userToken")
//   navigate('login')
  
// }


  return (
    <>
      <nav className="navbar navbar-expand-lg    ">
      
        <div className="container">
            {/* update */}
              <Link className="navbar-brand" to={"/"}>
            <span className="text-dark mx-2">Snake and Ladder</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
          {/* {localStorage.getItem('userToken')?
          <>
         
            </>:""} */}
            <div className="ms-auto">

              {/* {localStorage.getItem('userToken')? <Link className="btn btn-outline-dark mx-2" onClick={logOut}>
                Logout
              </Link>:  (<> */}
                {/* <Link className="text-decoration-none text-dark mx-2" to={"/"}> */}
                
              {/* </Link> */}
              <Link className="btn btn-secondary mx-2 fw-bold " to={"/login"}>
                Login
              </Link>
              {/* </>)} */}
             
            
            </div>
          </div>
        </div>
      </nav>

    </>
  );
}
