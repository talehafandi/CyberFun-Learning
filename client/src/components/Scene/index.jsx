import { useEffect, useState } from "react";
import SceneText from "../SceneText";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllScenes,
  getCurrentView,
  setCurrentView,
  updateCurrentScene,
} from "../../redux/reducers/playSlice";
import { Button } from "@mui/material";

const Scene = ({ currentScene }) => {
  const dispatch = useDispatch();

  const currentView = useSelector(getCurrentView);
  const scenes = useSelector(getAllScenes);

  const [reachedEndOfScene, setReachedEndOfScene] = useState(false);

  useEffect(() => {
    console.log("Scene mounted...");
    console.log("Current scene ", currentScene);
  });

  const checkNextOutcomes = (outcome) => {
    console.log("Checking next outcome...", outcome);
    if (outcome.options.length == 0) setReachedEndOfScene(true);
  };

  const handleOutcome = (outcomeIndex) => {
    console.log("Outcome: ", outcomeIndex);
    const outcome = scenes[outcomeIndex];
    checkNextOutcomes(outcome);
    dispatch(updateCurrentScene(outcomeIndex));
    if (outcome.sceneType == "outcome") checkYayOutcome(outcome);
  };

  const checkYayOutcome = (outcome) => {
    if (outcome.yay) console.log("Yay!");
    else console.log("Nay!");
    //TODO: confetti popup maybe?
  };

  const handleNextView = () => {
    switch (currentView) {
      case "scenes":
        dispatch(setCurrentView("summary"));
        break;

      case "summary":
        dispatch(setCurrentView("flashcards"));
        break;

      case "flashcards":
        dispatch(setCurrentView("quiz"));
        break;

      case "quiz":
        dispatch(setCurrentView("final"));
        break;

      case "final":
        //TODO: Exit, or next level
        break;

      default:
        break;
    }
  };

  return (
    <>
      <div className="playwrapper">
        {<img src={currentScene?.imageUrl} className="sceneimage" />}
        <div className="scenewrapper">
          <div className="scenetext">
            <SceneText sceneDescription={currentScene?.sceneDescription} />
          </div>
          <div className="answeroptionswrapper">
            <span className="text15">
              {reachedEndOfScene && (
                <div className="next-view-button">
                  <Button
                    sx={{
                      height: "40px",
                      padding: "10px 20px",
                      fontSize: "16px",
                    }}
                    color="secondary"
                    onClick={() => handleNextView()}
                  >
                    Next
                  </Button>
                </div>
              )}
              <span>{currentScene?.question}</span>
            </span>
            <div className="answeroptions">
              {currentScene?.options?.map((option, index) => {
                return (
                  <div
                    className="scene-option"
                    key={`answer-options-${index}`}
                    onClick={() => handleOutcome(option?.outcome)}
                  >
                    <span className="scene-option-text">
                      <span>{option?.text}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Scene;
