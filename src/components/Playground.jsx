import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router";
import { authToken } from "./Startgame";
import Rolldice from "./Rolldice";
import ActiveBoard from './Boards/ActiveBoard';

export default function Playground() {

  let { id } = useParams();
  console.log(id);
  const [apiData, setApiData] = useState()

  async function getPlayground() {

    try {
      const { data } = await axios.get(`http://localhost:3000/api/game/get/${id}`,{
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setApiData(data)
      console.log(data);
      setApiData(data.game.board_id);

    } catch (error) {
      console.log(error);
    }
  }
const boardId =apiData
  return (<>
  <button onClick={getPlayground}>here</button>
  {id}
  {/* <Rolldice id= {id}></Rolldice> */}
 
<ActiveBoard boardId={boardId} ></ActiveBoard>
  </>);
}
