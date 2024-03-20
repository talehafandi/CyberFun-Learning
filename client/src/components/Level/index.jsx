import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Level = ({ levelName, completionStatus, enableLevel }) => {
  const navigate = useNavigate();
  const play = () => {
    console.log("Clicked on play...");
    navigate("/play");
  };

  useEffect(() => {
    var divElement = document.getElementById("start-btn");

    divElement.addEventListener("click", function () {
      play();
    });
  });

  return (
    <>
      <div className="level">
        <div className="iconandleveldetails">
          <img
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/161d8ffb-6caa-4102-8dd2-14ff2862603f/2b9573b2-e602-4c60-90b7-9db99e358eb3?org_if_sml=1842&amp;force_format=original"
            alt="LevelIcon5198"
            className="level-icon"
          />
          <div className="leveldetails">
            <span className="level-name-wrapper">
              <span>{levelName}</span>
            </span>
            <span className="completion-status-wrapper">
              <span>{completionStatus}</span>
            </span>
          </div>
        </div>
        {/* TODO: if enableLevel is false, disable the start button, hide it and display a lock symbol */}
        <div className="start-btn-wrapper" type="button" id="start-btn">
          <span className="start-btn">
            <span>Start</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default Level;
