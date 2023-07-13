import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { authToken } from './Startgame';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { userToken } from './Resgiterations/Signup';
import Playground from './Playground';
import request from 'superagent';


export default function CreatorRoom() {
  const { id } = useParams();
  const [apiData, setApiData] = useState();
  const [gameId, setGameId] = useState();

  async function getgame(id) {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/game/get/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setApiData(data.game);
      setGameId(data.game.id);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  //   try {
  //     const { data } = await axios.get(`http://localhost:3000/api/game/start-game/6`, {
  //       headers: {
  //         Authorization: `Bearer ${userToken}`,
  //       },
  //     });
  //     console.log(data);
  //     // Handle the response or update the state as needed
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

    async function getPlayground() {
    try {
      const token = localStorage.getItem('userToken') // Replace with your actual token
      const response = await request
        .get('`http://localhost:3000/api/game/start-game/6')
        .set('Authorization', `Bearer ${token}`);
  
      console.log(response);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
  
  useEffect(() => {
    getgame(id);
  }, [id]);

  return (
    <>
      {apiData && (
        <div className='text-center mt-5'>
          <h2>{apiData.status}</h2>
          <table className="table my-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Player order</th>
                <th>Player name</th>
                <th>Player position</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {apiData.players.map((player, index) => (
                <tr key={index}>
                  <td>{player.user.id}</td>
                  <td>{player.player_order}</td>
                  <td>{player.user.name}</td>
                  <td>{player.position}</td>
                  <td>{player.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {parseInt(localStorage.getItem('userId')) === apiData.creator_id ? (
            <Link className='btn btn-primary my-5' onClick={getPlayground}>
              Start game
            </Link>
          ) : (
            <p>Waiting for the game owner to start the game</p>
          )}
        </div>
      )}
  <div  className ='d-none'>
      {/* <Playground  apiData={apiData}></Playground> */}
  </div>


    </>
  );
}
