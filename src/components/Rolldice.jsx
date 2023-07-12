import React from 'react'
import  axios  from 'axios';
import { authToken } from './Startgame';

export default function Rolldice(id) {


    async function movePlayer(id) {
        try {
          const { data } = await axios.get(`http://localhost:3000/api/player/move`,{gameId:id},{
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }




  return (
    <div>
        

        <button onClick={movePlayer}>click</button>
    </div>
  )
}
