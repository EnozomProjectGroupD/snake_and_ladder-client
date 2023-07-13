import React, { useState } from 'react';
import Dice from 'react-dice-roll';
import axios from 'axios';
import { authToken, ErrorToast } from "./Startgame";
import { ToastContainer } from 'react-toastify';

export default function RollDice(id) {
  const rollingDice = async () => {
    const response = await axios
      .post("http://localhost:3000/api/player/move", { "gameId": parseInt(id.id) }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }).then(response => {
          const rollnumber = response.data.rollValue;
          console.log(rollnumber);
          return rollnumber;
      })
      .catch(error => {
        // console.log("Marios error");
        ErrorToast(error.response.data.message);
        console.log(error.response.data.message);

      });
  };

  return (
    <div>
      <ToastContainer />
      <div>

        <Dice cheatValue={rollingDice} size={150}/>

      </div>
    </div>
  );
}
