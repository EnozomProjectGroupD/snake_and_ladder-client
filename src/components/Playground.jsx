import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router";
// import { authToken } from "./Startgame";
import Rolldice from "./Rolldice";
import ActiveBoard from "./Game/ActiveBoard";
import PlayersInRoom from "./playersInRoom";

//players name
export default function Playground(apiData) {
  let { id } = useParams();

  console.log(id);
  // const [apiData, setApiData] = useState()
  console.log(apiData);
  //  const [startGame, setStartGame] = useState(second)
  //   async function getPlayground() {

  //     try {
  //       const { data } = await axios.get(`http://localhost:3000/api/game/start-game/${id}`,{
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       });
  //       setStartGame(data)
  //       console.log(data);
  //       // setApiData(data.game.board_id);

  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  const boardId = apiData;
  return (
    <>
      {/* <button onClick={getPlayground}>here</button> */}
      {id}
      <div className="row">
        <div className="col-md-3">
          <PlayersInRoom ></PlayersInRoom>
        </div>
        <div className="col-md-8">
          <ActiveBoard boardId={boardId}></ActiveBoard>
        </div>
        <div className="col-md-1">
          <Rolldice id={id}></Rolldice>
        </div>
      </div>
    </>
  );
}
