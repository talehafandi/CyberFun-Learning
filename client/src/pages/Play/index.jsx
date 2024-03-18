import React, { useEffect, useState } from "react";
import "./index.css";
import restApi from "../../api";
import { useDispatch } from "react-redux";
import AlarmClockIcon from "../../components/Icons/AlarmClockIcon";
import HeartFilledIcon from "../../components/Icons/HeartFilledIcon";
import BrokenHeartIcon from "../../components/Icons/BrokenHeartIcon";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Typography } from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    height: 300,
    gap: 10,
    display: "flex",
    padding: 10,
  },
  stats: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
});

const BorderLinearProgress = withStyles((theme) => {
  return {
    root: {
      borderRadius: 5,
      width: 50,
      height: "100%",
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      transform: ({ value }) => {
        return `translateY(${value}%) !important`;
      },
      backgroundColor: "#1a90ff",
    },
  };
})(LinearProgress);

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const Play = (props) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    //API call for fetching data on Play page
    //TODO: Fetch Play data from store and assign it to the 'list' variable below
    const fetchData = async () => {
      setLoading(true);
      //Make call
      await restApi
        .getDataOnPlay()
        .then((response) => {
          //Update state on store (See playSlice reducer for more insights)
          // dispatch(updatePlayData(response));
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="container">
        <div className="pagecontent">
          <div className="playmaincontent">
            <div className="pagetitlescorewrapper">
              <div className="ppagetitletext">
                <span className="text">
                  <span>Phishing</span>
                </span>
                <span className="text02">|</span>
                <span className="text03">
                  <span>Level 1</span>
                </span>
              </div>
              <div className="scoreliveswrapper">
                <div className="scorewrapper">
                  <span className="text05">
                    <span>Score</span>
                  </span>
                  <span className="text07">
                    <span>15000</span>
                  </span>
                </div>
                <div className="lives">
                  <HeartFilledIcon />
                  <HeartFilledIcon />
                  <HeartFilledIcon />
                  <HeartFilledIcon />
                  <BrokenHeartIcon />
                </div>
              </div>
            </div>
            <div className="playwrapper">
              <img
                src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/161d8ffb-6caa-4102-8dd2-14ff2862603f/fd0eccac-f897-4255-8174-9c2d99a27036?org_if_sml=1299747&amp;force_format=original"
                alt="sceneimage5431"
                className="sceneimage"
              />
              <div className="scenewrapper">
                <div className="scenetext">
                  <span className="text09">
                    <span>
                      You receive an email that appears to be from your
                      company&apos;s IT department.
                    </span>
                  </span>
                  <span className="text11">
                    <span>
                      The email states that due to a security breach, all
                      employees need to reset their passwords immediately by
                      clicking on a link provided in the email.
                    </span>
                  </span>
                  <span className="text13">
                    <span>
                      The link takes you to a website that looks identical to
                      your company&apos;s official login page.
                    </span>
                  </span>
                </div>
                <div className="answeroptionswrapper">
                  <span className="text15">
                    <span>What would you do?</span>
                  </span>
                  <div className="answeroptions">
                    <div className="option">
                      <span className="text17">
                        <span>
                          Click on the link and proceed to reset your password.
                        </span>
                      </span>
                    </div>
                    <div className="option1">
                      <span className="text19">
                        <span>
                          Ignore the email and report it to the IT department
                          immediately.
                        </span>
                      </span>
                    </div>
                    <div className="option2">
                      <span className="text21">
                        <span>
                          Forward the email to your colleagues to see if they
                          received a similar email.
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="timerwrapper">
            <div className="clock">
              <AlarmClockIcon className="alarmclocklight" />
            </div>
            <BorderLinearProgress thickness={10} value={60} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
