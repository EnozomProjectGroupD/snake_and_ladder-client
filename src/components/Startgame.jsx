import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Startgame() {
  const [apiData, setApiData] = useState([]);
  const [hide, setHide] = useState(true);
  const [numberOfPlayers, setNumberOfPlayers] = useState('');
  const [selectedBoardId, setSelectedBoardId] = useState(''); // Add selectedBoardId state

  // Decode token
  const authToken = localStorage.getItem("userToken");
  const decodedToken = jwtDecode(authToken);
  console.log(decodedToken.id);

  // Toasts
  const SuccessToast = (event) =>
    toast.success(event, {
      position: "top-center",
    });
  const ErrorToast = (event) =>
    toast.error(event, {
      position: "top-center",
    });

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

  // Get data for creating game
  const getData = async () => {
    const requestData = {
      creator_id: decodedToken.id, // Decoded creator_id
      board_id: selectedBoardId, // Use selectedBoardId state value
      players_number: parseInt(numberOfPlayers),
    };

    await createGame(requestData);
  };

  async function createGame(requestData) {
    try {
      const apiUrl = "http://localhost:3000/api/game/create";

      const response = await axios.post(apiUrl, requestData);

      console.log(response.data);
    } catch (error) {
      // ErrorToast(error.response.data);
      console.error(error);
    }
  }

  console.log(apiData.length);
  console.log(apiData);
  return (
    <>
      <ToastContainer />

      <div
        className={
          "align-items-center justify-content-center vh-100 flex-column " +
          (hide ? "d-flex" : "d-none")
        }
      >
        <h3>Press the button to start</h3>
        <Link
          className="btn btn-primary w-25 my-4"
          onClick={() => {
            getAllboards();
            setHide(false);
          }}
        >
          Start game
        </Link>
      </div>

      <div className={!hide ? "d-block" : "d-none"}>
        <div className="text-center d-flex flex-column">
          <h1 className="my-2">Choose your board</h1>
          <div className="row justify-content-center align-items-center text-decoration-none">
            {apiData.map((board, index) => (
              <div className="col-md-6" key={index}>
                <input
                  type="radio"
                  defaultValue={`Board NO. ${board.id}`}
                  checked={selectedBoardId === board.id} // Add checked attribute
                  onChange={() => setSelectedBoardId(board.id)} // Set selectedBoardId on change
                />
                <span>{`Board NO. ${board.id}`}</span>
              </div>
            ))}

            <label htmlFor="number">Number of players</label>
            <input
              type="number"
              value={numberOfPlayers}
              onChange={(e) => setNumberOfPlayers(e.target.value)}
            />
          </div>
          <div className="text-center">
            <Link className="btn btn-primary my-5 w-50" onClick={getData}>
              Create game
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
