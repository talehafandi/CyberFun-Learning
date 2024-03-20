import { useEffect, useState } from "react";
import SceneText from "../SceneText";
import { useSelector } from "react-redux";
import {
  getCurrentView,
  getCurrentScene,
  getFlashcards,
} from "../../redux/reducers/playSlice";
import "./index.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import { useAppContext } from "../../context/appContext";

const Flashcards = () => {
  const { handleNextView } = useAppContext();

  const currentView = useSelector(getCurrentView);
  const currentScene = useSelector(getCurrentScene);
  const flashcards = useSelector(getFlashcards);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === flashcards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    console.log("Flashcards mounted...");
    console.log("Current Flashcards question ", flashcards);
  });

  return (
    <>
      <div className="playwrapper">
        <div className="flashcard-wrapper">
          <span className="header">Flashcards</span>
          <div className="flashcards">
            <Button
              sx={{
                borderRadius: "50px !important",
                height: "50px",
                width: "50px",
                marginRight: "20px",
              }}
              onClick={() => handlePrevious()}
            >
              <ArrowBackIosIcon />
            </Button>
            <div className="flashcard">
              <SceneText sceneDescription={flashcards[currentIndex]?.data} />
              <span className="flashcard-index">
                {currentIndex + 1} of {flashcards.length} cards
              </span>
            </div>
            <Button
              sx={{
                borderRadius: "50px !important",
                height: "50px",
                width: "50px",
                marginLeft: "20px",
              }}
              onClick={() => handleNext()}
            >
              <ArrowForwardIosIcon />
            </Button>
          </div>
          <Button
            sx={{
              height: "40px",
              padding: "10px 20px",
              fontSize: "16px",
            }}
            color="secondary"
            onClick={() => handleNextView()}
          >
            Go to next section
          </Button>
        </div>
      </div>
    </>
  );
};

export default Flashcards;
