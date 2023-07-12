import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ErrorToast, SuccessToast, authToken } from './Startgame';
import { Link } from 'react-router-dom';

export default function Newgame() {
  const [numberOfPlayers, setNumberOfPlayers] = useState('');
  const [selectedBoardId, setSelectedBoardId] = useState('');
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [isDisabled, setIsDisabled] = useState(true);


  //when open get all boards
  async function getAllboards() {
    try {
      const apiUrl = "http://localhost:3000/api/board/get-all";
      const { data } = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      SuccessToast(data.message);

      setApiData(data.boards);
      setIsLoading(false);
    } catch (error) {
      ErrorToast(error.response.data);
      console.error(error);
    }
  }

  useEffect(() => {
    getAllboards();
  }, []);

  const getCreateData = async () => {
    if (numberOfPlayers.trim() === '' || numberOfPlayers < 2 || numberOfPlayers > 10) {
      return;
    }

    const requestData = {
      creator_id: localStorage.getItem('userId'),
      board_id: selectedBoardId,
      players_number: parseInt(numberOfPlayers),
    };

    // if (selectedBoardId !== '' && requestData.players_number >= 2 && requestData.players_number <= 10) {
    //   setIsDisabled(false);
    // } else {
    //   setIsDisabled(true);
    // }

    console.log(requestData);
    await createGame(requestData);
  };

  async function createGame(requestData) {
    try {
      const apiUrl = "http://localhost:3000/api/game/create";

      const { data } = await axios.post(apiUrl, requestData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log(data);
      SuccessToast(data.message);
    } catch (error) {
      ErrorToast(error.response.data);
      console.error(error);
    }
  }

  const convertToBase64 = (arrayBuffer) => {
    const base64String = btoa(
      new Uint8Array(arrayBuffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );
    return base64String;
  };

  return (
    <>
      <div>
        <div className="text-center d-flex flex-column">
          <h1 className="my-2">Choose your board</h1>
          {isLoading ? (
            <p>Loading boards...</p>
          ) : (
            <div className="row justify-content-center align-items-center text-decoration-none">
              {apiData.map((board, index) => (
                <div className="col-md-2" key={index}>
                  <input
                    type="radio"
                    name="board"
                    value={board.id}
                    defaultChecked={selectedBoardId === board.id}
                    onChange={(e) => setSelectedBoardId(e.target.value)}
                  />
                  <label>{`Board NO. ${board.id}`}</label>
                  {board.Buffer && (
                    <img
                      src={`data:image/png;base64,${convertToBase64(board.Buffer.data)}`}
                      alt="boards"
                      className='w-75'
                    />
                  )}
                </div>
              ))}
              <label htmlFor="number">Number of players (2-10)</label>
              <input
                type="number"
                id="number"
                value={numberOfPlayers}
                min="2"
                max="10"
                onChange={(e) => setNumberOfPlayers(e.target.value)}
                required
                placeholder='Enter players number'
              />
              <div className="text-center">
                <button className="btn btn-primary my-5 w-50" onClick={getCreateData} >
                  Create game
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
