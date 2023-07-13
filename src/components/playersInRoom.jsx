import React, { useEffect, useState } from 'react';
import { authToken } from './Startgame';
import axios from 'axios';

export default function PlayersInRoom({theId} ) {
  const [apiData, setApiData] = useState(null);

  async function getGame(id) {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/game/get/6`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      setApiData(data.game);
      console.log(data.game)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect((theId) => {

    getGame(theId);
  }, [theId]);

  return (
    <>
      
        <div className="text-center mt-5">
          <table className="table my-3">
            <thead>
              <tr>
                <th>Player name</th>
                <th>Player position</th>
              </tr>
            </thead>
            <tbody>
              {apiData.players.map((player, index) => (
                <tr key={index}>
                  <td>{player.user.name}</td>
                  <td>{player.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
    </>
  );
}
