import React, { useState, useEffect } from 'react';
import GuessingGameForm from './GuessingGameForm';


function GuessingGame() {
  const [rightAnswer, setRightAnswer] = useState(null);
  const [status, setStatus] = useState(false);
  const[answer, setAnswer] = useState(0)


useEffect(() => {
  if (rightAnswer === null) {
    setRightAnswer(
    JSON.parse(localStorage.getItem("randomNum") || generateRandom())
      );
  }
}, []);


const generateRandom = () => {
  const random = Math.ceil(Math.random() * 100);
  localStorage.setItem("randomNum", JSON.stringify(random));

  return random;

}

function handleLuckyNumber (answer){
  setAnswer(answer)
  if (+answer === +rightAnswer) {
    setStatus("Congratulations You Win!!!");
  } else if (+answer < +rightAnswer) {
    setStatus("The Number Is Too Low");
  } else {
    setStatus("The Number Is Too High");
}}

function handleDelete(){
  localStorage.removeItem ("randomNum");
}
  return ( <div align='center'>
  <GuessingGameForm onLuckyNumber={handleLuckyNumber}
                    rightAnswer={rightAnswer}
                    onDelete={handleDelete}
                    />
        <p>{status}</p>
    </div>
   
  );
  }

export default GuessingGame
