import React, { useRef } from "react";
import { useGlobalContext } from "./context";
import Button from "./Button";
import "./SetupForm.css";

const SetupForm = () => {
  const { startQuiz, isError } = useGlobalContext();

  const amountRef = useRef(null);
  const categoryRef = useRef(null);
  const difficultyRef = useRef(null);

  const handleSetup = (e) => {
    e.preventDefault();
    const amount = amountRef.current.value;
    const category = categoryRef.current.value;
    const difficulty = difficultyRef.current.value;
    startQuiz({ amount, category, difficulty });
  };

  return (
    <form className="setup-form">
      <h1 className="setup_form-title">Setup Quiz</h1>

      <label className="selection-input-title" htmlFor="number-of-questions">
        Number of Questions
      </label>
      <input
        ref={amountRef}
        className="selection-value"
        id="number-of-questions"
        type="number"
        defaultValue={7}
      />

      <label className="selection-input-title" htmlFor="select-category">
        Category
      </label>
      <select
        ref={categoryRef}
        className="selection-value"
        name="category"
        id="select-category"
      >
        <option value="18">computers</option>
        <option value="21">sports</option>
        <option value="10">books</option>
        <option value="1210">test error</option>
      </select>

      <label className="selection-input-title" htmlFor="select-difficulty">
        Select Difficulty
      </label>
      <select
        ref={difficultyRef}
        className="selection-value"
        name="difficulty"
        id="select-difficulty"
      >
        <option value="easy">easy</option>
        <option value="medium">medium</option>
        <option value="hard">hard</option>
      </select>
      <div
        className="error-msg"
        style={{ visibility: isError ? "visible" : "hidden" }}
      >
        Try different settings !!!
      </div>
      <Button className="start-btn" onClick={handleSetup}>
        Start
      </Button>
    </form>
  );
};

export default SetupForm;
