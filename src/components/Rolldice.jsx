import React, { useState } from 'react';
import dice1 from '../assets/dice/dice1.png';
import dice2 from '../assets/dice/dice2.png';
import dice3 from '../assets/dice/dice3.png';
import dice4 from '../assets/dice/dice4.png';
import dice5 from '../assets/dice/dice5.png';
import dice6 from '../assets/dice/dice6.png';

export default function RollDice() {
  const [diceImage, setDiceImage] = useState(null);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    setIsRolling(true);

    const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];
    let rollCount = 0;

    const rollInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * diceImages.length);
      setDiceImage(diceImages[randomIndex]);
      rollCount++;

      if (rollCount >= 10) {
        clearInterval(rollInterval);
        setIsRolling(false);
      }
    }, 200);
  };

  return (
    <div>
      <button onClick={rollDice} disabled={isRolling}>
        Roll Dice
      </button>
      <div>
        {diceImage && <img src={diceImage} alt="dice" />}
      </div>
    </div>
  );
}
