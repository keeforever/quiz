import React from "react";
import Button from "./Button";
import { useGlobalContext } from "./context";
import "./Modal.css";

const Modal = () => {
  const {userCorrectAnswer, questions, playAgain} = useGlobalContext()
  const percentage = (userCorrectAnswer/questions.length)*100

  return (
    <main className="modal">
      <article className="modal-content">
        <h1 className="content-title">Congrats!</h1>
        <p className="quiz-score">You answered {percentage.toFixed(2)}% of questions correctly.</p>
        <Button className="play-again-btn" onClick={playAgain}>Play Again</Button>
      </article>
    </main>
  );
};

export default Modal;
