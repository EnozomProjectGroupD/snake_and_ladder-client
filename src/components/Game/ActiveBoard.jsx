import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ActiveBoard({ boardId }) {
  const [apiData, setApiData] = useState({});

  async function getBoard(boardId) {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/board/get/6`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      
      // console.log(data);
      setApiData(data);
    } catch (error) {
      console.log(error);
    }
  }
useEffect(() => {
 getBoard()
}, [])

  const convertToBase64 = (arrayBuffer) => {
    const base64String = btoa(
      new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    // console.log(base64String)
    return base64String;
  };

  const base64String = apiData.board?.Buffer?.data
    ? convertToBase64(apiData.board.Buffer.data)
    : '';

  return (
    <>
      {/* <button onClick={getBoard}>boardData</button> */}
      {base64String && <img src={`data:image/png;base64,${base64String}`} className="w-75" alt="boardpic" />}
    </>
  );
}
