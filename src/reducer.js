import {
  SET_READY,
  SET_LOADING,
  SET_QUESTIONS,
  SET_ERROR,
  SET_CORRECTION,
  NEXT_QUESTION,
  OPEN_MODAL,
  PLAY_AGAIN
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_READY:
      return { ...state, isReady: action.payload };

    case SET_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_QUESTIONS:
      return { ...state, questions: action.payload };

    case SET_ERROR:
      return { ...state, isError: action.payload };

    case SET_CORRECTION:
      return { ...state, userCorrectAnswer: action.payload };

    case NEXT_QUESTION:
      return { ...state, nthQuestion: action.payload };
    case OPEN_MODAL:
      return { ...state, isModalOpen: action.payload };
    case PLAY_AGAIN:
      return { ...state, ...action.payload };
    default:
      throw new Error(`No action of ${action.type} found !!!`);
  }
};

export default reducer;
