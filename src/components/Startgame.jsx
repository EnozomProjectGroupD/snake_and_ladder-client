import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Newgame from "./Newgame";

export const authToken = localStorage.getItem("userToken");

// Toasts
export const SuccessToast = (event) =>
  toast.success(event, {
    position: "top-center",
    autoClose:500
  });
export const ErrorToast = (event) =>
  toast.error(event, {
    position: "top-center",
    autoClose:500
  });

export default function Startgame() {

  const [apiData, setApiData] = useState([]);
  const [hide, setHide] = useState(true);

  

  // Get all boards
  async function getAllboards() {
    try {
      const apiUrl = "http://localhost:3000/api/board/get-all";
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log(response.data);
      console.log(response.data.boards);
      SuccessToast(response.data.message);

      setApiData(response.data.boards);
    } catch (error) {
      ErrorToast(error.response.data);
      console.error(error);
    }
  }

  

  return (
    <>
      <Helmet>
        <title>Game lab</title>
      </Helmet>
      <ToastContainer />

      <div
        className={
          "align-items-center justify-content-center vh-100 flex-column " +
          (hide ? "d-flex" : "d-none")
        }
      >
        <h3>Press the button to start</h3>
        <Link
          className="btn btn-primary w-50 my-4"
          onClick={() => {
            getAllboards();
            setHide(false);
          }}
        >
          Start game
        </Link>
        <h3>or</h3>
        <Link className="btn btn-primary w-50 my-4" to={'/joingame'}>
          Join game via game id
        </Link>

     
      </div>

      <Newgame apiData={apiData} hide={hide}></Newgame>
    </>
  );
}
