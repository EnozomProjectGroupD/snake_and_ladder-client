import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Startgame() {
  const [apiData, setApiData] = useState([]);

  // Toasts
  const SuccessToast = (event) =>
    toast.success(event, {
      position: "top-center",
    });
  const ErrorToast = (event) =>
    toast.error(event, {
      position: "top-center",
    });

  async function getGame() {
    try {
      const authToken = localStorage.getItem("userToken");
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
      ErrorToast(error.message);
      console.error(error);
    }
  }

  useEffect(() => {
    getGame();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="d-flex align-items-center justify-content-center vh-100 flex-column">
        <h3>Press the button to start</h3>
        <Link className="btn btn-primary w-25 my-4" onClick={getGame}>
          Startgame
        </Link>
      </div>
      {apiData.length ? (
        <div className="container text-center">
          <h1 className="my-2">Choose your board</h1>
          <div className="row justify-content-center align-items-center text-decoration-none">
            {apiData.map((board, index) => (
              <div className="col-md-6" key={index}>
                <Link to={`/board/${board.id}`}>
                  <h3>Board No. {board.id}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
