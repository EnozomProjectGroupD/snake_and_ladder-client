import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import { ErrorToast, SuccessToast, authToken } from "./Startgame";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Joinggame() {
  const [game_id, setGameId] = useState("");
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get all game rooms
  async function getAllRooms() {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/game/get-all?status=waiting",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log(response.data.games);
      SuccessToast(response.data.message);
      setApiData(response.data.games);
      setLoading(false);
    } catch (error) {
      ErrorToast(error.response.data);
      console.log(error);
    }
  }

  // Get data for joining game
  const getJoinData = async () => {
    const requestData = {
      game_id: parseInt(game_id),
    };
    console.log(game_id);
    await joinGame(requestData);
  };

  //    Join game
  /// get all boards and enter the players amount
  async function joinGame(requestData) {
    try {
      const apiUrl = "http://localhost:3000/api/player/create";
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log(response);
      SuccessToast(response.data.message);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Helmet>
        <title>Choosing room</title>
      </Helmet>
      <ToastContainer />
      <div
        className={`align-items-center justify-content-center flex-column d-flex my-5 ${
          apiData.length ? "" : "vh-100"
        }`}
      >
        {loading ? (
          <button type="submit" className="btn btn-primary w-50" disabled>
            <i className="fas fa-spinner fa-spin mx-2"></i>Refreshing Games
          </button>
        ) : (
          <button
            type="submit"
            className="btn btn-primary  w-50"
            onClick={getAllRooms}
          >
            Refresh Games
          </button>
        )}
      </div>
      <div className="align-items-center justify-content-center flex-column d-flex">
        {apiData.length ? (
          <table className="table my-3">
            <thead>
              <tr>
                <th>id</th>
                <th>creator name</th>
                <th>current player</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {apiData.map((game, index) => (
                <tr key={index}>
                  <td>{game.id}</td>
                  <td>{game.creator.name}</td>
                  <td>{game.current_player}</td>
                  <td>{game.status}</td>
                  <td>
                    <Link
                      to={`/playground/${game.id}`}
                      className="btn btn-primary w-100 mb-2"
                    >
                      Join game
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </>
  );
}
