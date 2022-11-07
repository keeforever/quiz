import React from "react";
import SetupForm from "./SetupForm";
import Question from "./Question";
import Loader from "./Loader";

import { useGlobalContext } from "./context";
import "./App.css";

const App = () => {
  const { isReady, isLoading } = useGlobalContext();

  if (isLoading) {
    return <Loader />;
  }

  if (isReady) {
    return <Question />;
  }

  return (
    <main className="app">
      <SetupForm />
    </main>
  );
};

export default App;
