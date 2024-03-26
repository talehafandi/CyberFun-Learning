import { useSelector } from "react-redux";
import {
  getCurrentScene,
  getCurrentView,
  getFlashcards,
  getQuizQuestionOnScreen,
  getQuizQuestions,
  getSummary,
} from "../../redux/reducers/playSlice";
import { useEffect, memo } from "react";
import Scene from "../Scene";
import Quiz from "../Quiz";
import Summary from "../Summary";
import Flashcards from "../Flashcards";

const PlayArea = memo(() => {
  const currentView = useSelector(getCurrentView);
  const currentScene = useSelector(getCurrentScene);
  const summary = useSelector(getSummary);
  const flashCards = useSelector(getFlashcards);
  const quizQuestions = useSelector(getQuizQuestions);
  const currentQuizQuestion = useSelector(getQuizQuestionOnScreen);

  useEffect(() => {
    console.log("Play area mounted...");
    console.log("Current view ", currentView);
    console.log("Current scene ", currentScene);
  });

  return (
    <>
      {currentView == "scenes" && <Scene currentScene={currentScene} />}
      {currentView == "summary" && <Summary />}
      {currentView == "flashcards" && <Flashcards />}
      {currentView == "quiz" && <Quiz />}
    </>
  );
});
export default PlayArea;
