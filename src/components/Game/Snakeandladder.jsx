import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { authToken } from '../Startgame';
//!delete?
export default function Snakeandladder() {
  const [apiData, setApiData] = useState([]);

  async function getSnakesAndLadder() {
    try {
      const response = await axios.get(`http://localhost:3000/api/snake-ladder/get-all`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log(response.data.snakeLadders);
      setApiData(response.data.snakeLadders);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSnakesAndLadder();
  }, []);

  return (
    <>
      {apiData.length ? (
        apiData.map((ele, index) => (
          <p key={index}>
            {ele.id} 
            <span>     type : {ele.type}</span>
            <span>     start : {ele.start}</span>
            <span>     end : {ele.end}</span>
          </p>
        ))
      ) : (
        <p>Game loading...</p>
      )}
    </>
  );
  
}
