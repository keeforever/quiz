import React from "react";
import Button from "./Button";
import Modal from "./Modal";
import { useGlobalContext } from "./context";

import "./Question.css";

const Question = () => {
  const {
    questions,
    nthQuestion,
    userCorrectAnswer,
    isModalOpen,
    nextQuestion,
  } = useGlobalContext();
  const question = questions[nthQuestion];

  return (
    <section className="question-container">
      <p className="correct-answers">
        Correct Answers : {userCorrectAnswer}/{nthQuestion + 1}
      </p>
      <h1 className="question">{question.question}</h1>
      <Options />
      <div className="question-next-btn-container">
        <Button className="question-next-btn" onClick={nextQuestion}>
          {nthQuestion === questions.length - 1 ? "Finish" : "Next Question"}
        </Button>
      </div>
      {isModalOpen && <Modal />}
    </section>
  );
};

const Options = () => {
  const { questions, answerCorrection, nthQuestion } = useGlobalContext();
  const correctAnswer = questions[nthQuestion].correct_answer;
  const options = [
    ...questions[nthQuestion].incorrect_answers,
    correctAnswer,
  ].sort(() => Math.random() - 0.5);

  return (
    <div className="options">
      {options.map((answer, index) => (
        <Option
          key={index}
          answer={answer}
          onClick={(e) =>
            answerCorrection({
              userAnswer: e.currentTarget.dataset.answer,
              correctAnswer,
            })
          }
        />
      ))}
    </div>
  );
};

const Option = ({ answer, onClick }) => {
  return (
    <Button answer={answer} className="option" onClick={onClick}>
      {answer}
    </Button>
  );
};

export default Question;
