import { createContext, useContext, useReducer } from "react";
import axios from "axios";
import reducer from "./reducer";
import {
  SET_READY,
  SET_LOADING,
  SET_QUESTIONS,
  SET_ERROR,
  SET_CORRECTION,
  NEXT_QUESTION,
  OPEN_MODAL,
  PLAY_AGAIN,
} from "./actions";
const Context = createContext({});

const initialState = {
  isReady: false,
  isLoading: false,
  isError: false,
  questions: [],
  userCorrectAnswer: 0,
  nthQuestion: 0,
  isModalOpen: false,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const nextQuestion = () => {
    if (state.questions.length - 1 === state.nthQuestion) {
      dispatch({ type: OPEN_MODAL, payload: true });
      return;
    }
    dispatch({ type: NEXT_QUESTION, payload: state.nthQuestion + 1 });
  };
  
  const answerCorrection = ({ userAnswer, correctAnswer }) => {
    if (userAnswer === correctAnswer) {
      dispatch({
        type: SET_CORRECTION,
        payload: state.userCorrectAnswer + 1,
      });
    }

    if (state.questions.length - 1 === state.nthQuestion) {
      return dispatch({ type: OPEN_MODAL, payload: true });
    }

    dispatch({ type: NEXT_QUESTION, payload: state.nthQuestion + 1 });
  };

  const startQuiz = async ({ amount, category, difficulty }) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      dispatch({ type: SET_READY, payload: false });
      dispatch({ type: SET_ERROR, payload: false });

      const QueryParams = `amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
      const { data } = await axios(`${API_ENDPOINT}${QueryParams}`);

      dispatch({ type: SET_LOADING, payload: false });
      dispatch({ type: SET_READY, payload: data.response_code === 0 });

      if (data.response_code !== 0) {
        dispatch({ type: SET_ERROR, payload: true });
      }

      dispatch({ type: SET_QUESTIONS, payload: data.results });
    } catch (error) {
      console.log(error);
    }
  };

  const playAgain = () => {
    dispatch({ type: PLAY_AGAIN, payload: initialState });
  };

  return (
    <Context.Provider
      value={{ ...state, startQuiz, answerCorrection, nextQuestion, playAgain }}
    >
      {children}
    </Context.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(Context);
};

export { AppProvider, useGlobalContext, Context };
