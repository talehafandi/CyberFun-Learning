import { useEffect } from "react";
import SceneText from "../SceneText";
import { useSelector } from "react-redux";
import { getSummary } from "../../redux/reducers/playSlice";

import "./index.css";
import { Button } from "@mui/material";
import { useAppContext } from "../../context/appContext";

const Summary = () => {
  const summary = useSelector(getSummary);
  const { handleNextView } = useAppContext();

  useEffect(() => {
    console.log("Summary mounted...");
  });

  return (
    <>
      <div className="playwrapper">
        <div className="scenewrapper">
          <span className="summary-header">Summary</span>
          <div className="scenetext">
            <SceneText sceneDescription={summary} />
          </div>
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
              Go to next section
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
