import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import { SuccessToast, authToken } from './Startgame';
import axios from 'axios';




export default function Joinggame() {
    const [game_id, setGameId] = useState(""); // Add game_id state
  

    //get all ids
    async function getAllRooms(){

        const {data}= axios.get('localhost:3000/api/game/get-all')

    }







  // Get data for joining game
  const getJoinData = async () => {
    const requestData = {
      game_id: parseInt(game_id),
    };
    console.log(game_id)
    await joinGame(requestData);
  };

  // Join game
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
        <title>Choosing id </title>
      </Helmet>
      <ToastContainer />
<div className=' align-items-center justify-content-center vh-100 flex-column d-flex'>



</div>
   
    </>
  )
}
