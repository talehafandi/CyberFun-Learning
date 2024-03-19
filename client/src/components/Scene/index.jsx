import { useEffect } from "react";
import SceneText from "../SceneText";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllScenes,
  getCurrentView,
  updateCurrentScene,
} from "../../redux/reducers/playSlice";

const Scene = ({ currentScene }) => {
  const dispatch = useDispatch();

  const currentView = useSelector(getCurrentView);
  const scenes = useSelector(getAllScenes);

  useEffect(() => {
    console.log("Scene mounted...");
    console.log("Current scene ", currentScene);
  });

  const handleOutcome = (outcomeIndex) => {
    console.log("Outcome: ", outcomeIndex);
    const outcome = scenes[outcomeIndex];
    dispatch(updateCurrentScene(outcomeIndex));
    if (outcome.sceneType == "outcome") checkYayOutcome(outcome);
  };

  const checkYayOutcome = (outcome) => {
    if (outcome.yay) console.log("Yay!");
    else console.log("Nay!");
  };
  return (
    <>
      <div className="playwrapper">
        {<img src={currentScene?.imageUrl} className="sceneimage" />}
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

export default Scene;
