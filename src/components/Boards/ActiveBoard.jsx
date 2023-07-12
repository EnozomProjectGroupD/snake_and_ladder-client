import React, { useState } from 'react';
import { authToken } from '../Startgame';
import axios from 'axios';
import Render from './Render';

export default function ActiveBoard({ boardId }) {
  const [apiData, setApiData] = useState([]);

  async function getBoard() {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/board/get/2`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log(data);
      console.log(data.board.Buffer.data);
      setApiData(data);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(apiData);

  const base64String = apiData.board ? btoa(String.fromCharCode(...apiData.board.Buffer.data)) : '';

  return (
    <>
      ActiveBoard
      <button onClick={getBoard}>boardData</button>
      {base64String && (
        <img src={`data:image/png;base64,${base64String}`} className="w-100" alt="boardpic" />
      )}
      {/* <Render buffer={apiData}></Render> */}
    </>
  );
}
