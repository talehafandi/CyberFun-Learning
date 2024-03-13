import React, { useEffect } from "react";
import "./index.css";
import { Typography } from "@mui/joy";
import { NavLink } from "react-router-dom";
import Userbox from "./userbox";
import Button from "@mui/material/Button";

const AppBar = () => {
  useEffect(() => {
    window.onscroll = function () {
      myFunction();
    };

    var header = document.getElementById("appbar");
    var sticky = header.offsetTop;

    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        header.style.top = "0";
      } else {
        header.classList.remove("sticky");
      }
    }
  });

  return (
    <div className="app-bar" id="appbar">
      <div className="logo-wrapper">
        <div className="logo">
          <Typography
            sx={{
              fontFamily: "Russo One",
              fontWeight: 200,
              fontSize: "38px",
              lineHeight: "62px",
              color: "white",
              marginTop: "auto",
              paddingLeft: "4%",
            }}
            align="left"
          >
            CyberFun
          </Typography>
        </div>
      </div>
      <div className="menu-wrapper">
        <Button component={NavLink} to="" className="menu-item">
          Challenge
        </Button>
        <Button component={NavLink} to="leaderboard" className="menu-item">
          Leaderboard
        </Button>
        <Button component={NavLink} to="achievements" className="menu-item">
          Achievements
        </Button>
      </div>
      <Userbox />
    </div>
  );
};

export default AppBar;
