import React from "react";
import "./Button.css";

const Button = ({ onClick, className, answer, children }) => {
  return (
    <button
      data-answer={answer}
      className={`${className} btn`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
