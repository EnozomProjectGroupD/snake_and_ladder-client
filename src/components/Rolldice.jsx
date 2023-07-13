import React, { useEffect, useState, useRef } from "react";
import Dice from "react-dice-roll";
import axios from "axios";
import { authToken, ErrorToast } from "./Startgame";
import { ToastContainer } from "react-toastify";

export default function RollDice({ id }) {
  const [rollNumber, setRollNumber] = useState(null); // Initial roll number
  const [currentPosition, setCurrentPostion] = useState(1);
  const rollingDice = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/player/move",
        { gameId: parseInt(id) },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const rollValue = response.data.rollValue;
      setRollNumber(rollValue);
      setCurrentPostion(response.data.position);
      console.log(rollValue);
    } catch (error) {
      ErrorToast(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div>
        <button onClick={rollingDice}>Roll Dice</button>
        {/* <Dice cheatValue={rollNumber} size={150}></Dice> */}
        <p>Roll Number: {rollNumber}</p>
        <p>Current Position: {currentPosition}</p>
      </div>
    </div>
  );
}
