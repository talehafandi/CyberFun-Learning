import { useEffect } from "react";
import SceneText from "../SceneText";
import { useSelector } from "react-redux";
import { getCurrentView } from "../../redux/reducers/playSlice";

const Flashcards = ({ currentScene }) => {
  const currentView = useSelector(getCurrentView);

  useEffect(() => {
    console.log("Quiz mounted...");
    console.log("Current quiz question ", currentScene);
  });

  const handleOutcome = (outcomeIndex) => {
    console.log("Outcome: ", outcomeIndex);
  };
  return (
    <>
      <div className="playwrapper">
        <span>Let's test your knowledge...</span>
        <div className="scenewrapper">
          <div className="scenetext">
            <SceneText sceneDescription={currentScene?.sceneDescription} />
          </div>
          {currentScene?.options?.length > 0 && (
            <div className="answeroptionswrapper">
              <span className="text15">
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
          )}
        </div>
      </div>
    </>
  );
};

export default Flashcards;
