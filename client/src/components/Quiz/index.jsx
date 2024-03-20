import { useEffect } from "react";
import SceneText from "../SceneText";
import { useSelector } from "react-redux";
import {
  getCurrentView,
  getQuizQuestions,
} from "../../redux/reducers/playSlice";

const Quiz = ({ currentScene }) => {
  const currentView = useSelector(getCurrentView);
  const quizQuestions = useSelector(getQuizQuestions);

  useEffect(() => {
    console.log("Quiz mounted...");
    console.log("Current quiz question ", quizQuestions);
  });

  return (
    <>
      <div className="playwrapper">
        <div className="scenewrapper">
          <span>Let's test your knowledge...</span>
          <div className="scenetext">
            <SceneText sceneDescription={quizQuestions[0]?.question || ""} />
          </div>
          {currentScene?.options?.length > 0 && (
            <div className="answeroptionswrapper">
              <div className="answeroptions">
                {quizQuestions[0]?.options.map((option, index) => {
                  return (
                    <div
                      className="scene-option"
                      key={`answer-options-${index}`}
                    >
                      <span className="scene-option-text">
                        <span>{option?.optionText}</span>
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

export default Quiz;
