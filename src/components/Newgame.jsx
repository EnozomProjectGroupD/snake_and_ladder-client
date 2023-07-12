import React, { useState } from 'react';
import axios from 'axios';
import { ErrorToast, SuccessToast, authToken } from './Startgame';
import { Link } from 'react-router-dom';

export default function Newgame({ apiData, hide }) {
  const [numberOfPlayers, setNumberOfPlayers] = useState('');
  const [selectedBoardId, setSelectedBoardId] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const getCreateData = async () => {
    setIsFormSubmitted(true);

    if (numberOfPlayers.trim() === '') {
      return;
    }

    const requestData = {
      // creator_id: decodedToken.id,
      board_id: selectedBoardId,
      players_number: parseInt(numberOfPlayers),
    };

    console.log(requestData);
    await createGame(requestData);
  };

console.log(apiData.data)
  // create game function
  async function createGame(requestData) {
    try {
      const apiUrl = "http://localhost:3000/api/game/create";

      const response = await axios.post(apiUrl, requestData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log(response);
      SuccessToast(response.data.message);
    } catch (error) {
      ErrorToast(error.response.data);
      console.error(error);
    }
  }

  // console.log(apiData);

  return (
    <>
      <div className={!hide ? "d-block" : "d-none"}>
        <div className="text-center d-flex flex-column">
          <h1 className="my-2">Choose your board</h1>
          {apiData ? (
            <div className="row justify-content-center align-items-center text-decoration-none">
              {apiData.map((board, index) => (
                <div className="col-md-2" key={index}>
                  <input
                    type="radio"
                    defaultValue={`Board NO. ${board.id}`}
                    checked={selectedBoardId === board.id}
                    onChange={() => setSelectedBoardId(board.id)}
                  />
                  <span>{`Board NO. ${board.id}`}</span>
                </div>
                // <img src={board.data} alt="" />
              ))}
              <label htmlFor="number">Number of players</label>
              <input
                type="number"
                value={numberOfPlayers}
                onChange={(e) => setNumberOfPlayers(e.target.value)}
                required
              />
              {isFormSubmitted && numberOfPlayers.trim() === '' && (
                <p className="text-danger">Number of players is required.</p>
              )}
              <div className="text-center">
                <Link className="btn btn-primary my-5 w-50" onClick={getCreateData}>
                  Create game
                </Link>
              </div>
            </div>
          ) : (
            <p>Loading boards...</p>
          )}
        </div>
      </div>
    </>
  );
}
