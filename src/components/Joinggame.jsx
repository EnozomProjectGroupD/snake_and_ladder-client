import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import { ErrorToast, SuccessToast, authToken } from "./Startgame";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Joinggame() {
  const [game_id, setGameId] = useState("");
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
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
      setLoading(false);
      console.log(error);
    }
    setLoading(false);
  }
  //get all games when load
  useEffect(() => {
    getAllRooms();
  }, []);

  // Get data for joining game
  const getJoinData = async () => {
    const requestData = {
      game_id: parseInt(game_id),
    };
    // console.log(game_id);
    await joinGame(requestData);
  };

  //    Join game
  /// get all boards and enter the players amount
  async function joinGame(requestData) {
    try {
      const apiUrl = "http://localhost:3000/api/player/create";
      const { data } = await axios.post(apiUrl, requestData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });

      console.log(data);
      SuccessToast(data.message);
      navigate(`/creatorroom/${requestData.game_id}`)
    } catch (error) {
      console.error(error);
    }
  }
  async function joinGamefromBtn(game) {
    try {
      const apiUrl = "http://localhost:3000/api/player/create";
      const joinData = {
        game_id:game.id,
        // creator_id: game.creator.id
      };
      const { data } = await axios.post(apiUrl,{game_id:game.id
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      console.log(joinData);
      console.log(data);
      SuccessToast(data.message);
      navigate(`/creatorroom/${joinData.game_id}`);
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
        <label htmlFor="">enter game id</label>
        <input
          type="number"
          id=""
          value={game_id}
          onChange={(e) => setGameId(e.target.value)}
          required
        />
        <Link
          onClick={getJoinData}
          className="btn btn-primary w-50 mb-2 my-4"
        >
          enter game id
        </Link>
        <p >OR</p>
        {loading ? (
          <button type="submit" className="btn btn-primary w-50" disabled>
            <i className="fas fa-spinner fa-spin mx-2"></i>getting existing games
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
      {/* ************************************************ */}
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
                  <button
                    className="btn btn-primary w-100 mb-2"
                    onClick={() => joinGamefromBtn(game)}
                  >
                    Join game
                  </button>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
        {/* ****************************************************************** */}
      </div>
    </>
  );
}
