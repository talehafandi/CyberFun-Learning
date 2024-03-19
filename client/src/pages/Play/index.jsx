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
import Scene from "../../components/Scene";
import PlayArea from "../../components/PlayArea";
import {
  getLives,
  getScore,
  setAPIResponseData,
  updateCurrentScene,
  updateScenes,
} from "../../redux/reducers/playSlice";
import { useSelector } from "react-redux";

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

const FullHearts = ({ count }) => {
  const hearts = Array.from({ length: count }, (_, index) => (
    <HeartFilledIcon key={`full-heart-${index}`} />
  ));

  return hearts;
};

const BrokenHearts = ({ count }) => {
  const hearts = Array.from({ length: count }, (_, index) => (
    <BrokenHeartIcon key={`broken-heart-${index}`} />
  ));

  return hearts;
};

const Play = (props) => {
  const [loading, setLoading] = useState(false);

  //Selectors
  const score = useSelector(getScore);
  const lives = useSelector(getLives);

  const sampleLevel = {
    topic: "Phishing",
    level: 1,
    scenes: [
      {
        sceneId: 0,
        sceneType: "main",
        sceneDescription:
          "You receive an email that appears to be from your company's IT department. The email states that due to a security breach, all employees need to reset their passwords immediately by clicking on a link provided in the email. The link takes you to a website that looks identical to your company's official login page.",
        imageUrl: "",
        question: "What would you do?",
        options: [
          {
            text: "Click on the link and proceed to reset your password.",
            outcome: 2,
          },
          {
            text: "Ignore the email and report it to the IT department immediately.",
            outcome: 1,
          },
          {
            text: "Forward the email to your colleagues to see if they received a similar email.",
            outcome: 3,
          },
          {
            text: "Check with the IT department through official channels before taking any action.",
            outcome: 4,
          },
        ],
      },
      {
        sceneId: 1,
        sceneType: "outcome",
        sceneDescription:
          "You chose to ignore the email and report it to the IT department immediately. The IT department confirms that the email is indeed a phishing attempt and advises all employees to delete it immediately. Well done! You've avoided falling victim to a potential cyber attack.",
        imageUrl: "",
        options: [],
        yay: true,
      },
      {
        sceneId: 2,
        sceneType: "outcome",
        sceneDescription:
          "You clicked on the link and proceeded to reset your password. However, the link was malicious, and it led to a fake login page designed to steal your credentials. You've fallen victim to a phishing attack. Your actions have compromised your account and potentially exposed sensitive company data.",
        imageUrl: "",
        options: [],
        yay: false,
      },
      {
        sceneId: 3,
        sceneType: "outcome",
        sceneDescription:
          "You chose to forward the email to your colleagues to see if they received a similar email. One of your colleagues replies, confirming that they also received the email. However, another colleague warns that it looks suspicious and advises reporting it to the IT department. You follow their advice and report the email. The IT department confirms that it's a phishing attempt and advises all employees to delete it immediately. Your quick action helped prevent a potential security breach.",
        imageUrl: "",
        options: [],
        yay: true,
      },
      {
        sceneId: 4,
        sceneType: "outcome",
        sceneDescription:
          "You decided to verify the legitimacy of the email before taking any action. You contacted the IT department through their official support channels, and they confirmed that the email was a phishing attempt. They advised you to delete the email and warned against clicking on any links or providing any information. Your cautious approach prevented you from falling victim to the phishing scam.",
        imageUrl: "",
        options: [],
        yay: true,
      },
    ],
    summary:
      "When receiving suspicious emails, do not click on any links or provide personal information. Always verify the legitimacy of the email through official channels, such as contacting the IT department directly. Be cautious and vigilant, as phishing attempts can closely mimic official emails. If you suspect a phishing attempt, report it to the appropriate authorities immediately.",
    flashCards: [
      {
        data: "Phishing emails often create a sense of urgency to trick users into acting quickly without thinking.",
      },
      {
        data: "Always verify suspicious emails through official channels before taking any action.",
      },
      {
        data: "Clicking on links in phishing emails can lead to fake login pages designed to steal your credentials.",
      },
      {
        data: "Forwarding suspicious emails to colleagues can help raise awareness, but always report them to IT first.",
      },
      {
        data: "Never provide personal or sensitive information in response to an unsolicited email.",
      },
    ],
    quiz: [
      {
        question:
          "What should you do if you receive an email asking you to reset your password due to a security breach?",
        options: [
          {
            optionText:
              "Click on the link and reset your password immediately.",
            key: 1,
          },
          {
            optionText: "Ignore the email and report it to the IT department.",
            key: 2,
          },
          {
            optionText:
              "Forward the email to your colleagues for their opinion.",
            key: 3,
          },
          {
            optionText:
              "Verify the email's legitimacy with the IT department before acting.",
            key: 4,
          },
        ],
        correctAnswerKey: 4,
      },
    ],
  };

  const dispatch = useDispatch();
  useEffect(() => {
    //API call for fetching data on Play page
    //TODO: Fetch Play data from store and assign it to the 'list' variable below
    /* const fetchData = async () => {
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

    fetchData(); */
  }, []);

  useEffect(() => {
    console.log("Updating API response...");
    dispatch(setAPIResponseData(sampleLevel));
    console.log("Updating current scene...");
    dispatch(updateCurrentScene(0));
  });

  const level = {
    topic: "Phishing",
    difficult: "easy",
    level: 1,
    scenes: {
      1: {
        scene:
          "You receive an email that appears to be from your company's IT department. The email states that due to a security breach, all employees need to reset their passwords immediately by clicking on a link provided in the email. The link takes you to a website that looks identical to your company's official login page.",
        imageUrl: "",
        options: [
          {
            text: "Click on the link and proceed to reset your password.",
            outcome: 3,
          },
          {
            text: "Ignore the email and report it to the IT department immediately.",
            outcome: 2,
          },
          {
            text: "Forward the email to your colleagues to see if they received a similar email.",
            outcome: 4,
          },
          {
            text: "Check with the IT department through official channels before taking any action.",
            outcome: 5,
          },
        ],
      },
      2: {
        scene:
          "You chose to ignore the email and report it to the IT department immediately. The IT department confirms that the email is indeed a phishing attempt and advises all employees to delete it immediately. Well done! You've avoided falling victim to a potential cyber attack.",
        imageUrl: "",
        options: [],
      },
      3: {
        scene:
          "You clicked on the link and proceeded to reset your password. However, the link was malicious, and it led to a fake login page designed to steal your credentials. You've fallen victim to a phishing attack. Your actions have compromised your account and potentially exposed sensitive company data.",
        imageUrl: "",
        options: [],
      },
      4: {
        scene:
          "You chose to forward the email to your colleagues to see if they received a similar email. One of your colleagues replies, confirming that they also received the email. However, another colleague warns that it looks suspicious and advises reporting it to the IT department. You follow their advice and report the email. The IT department confirms that it's a phishing attempt and advises all employees to delete it immediately. Your quick action helped prevent a potential security breach.",
        imageUrl: "",
        options: [],
      },
      5: {
        scene:
          "You decided to verify the legitimacy of the email before taking any action. You contacted the IT department through their official support channels, and they confirmed that the email was a phishing attempt. They advised you to delete the email and warned against clicking on any links or providing any information. Your cautious approach prevented you from falling victim to the phishing scam.",
        imageUrl: "",
        options: [],
      },
    },
    summary:
      "When receiving suspicious emails, do not click on any links or provide personal information. Always verify the legitimacy of the email through official channels, such as contacting the IT department directly. Be cautious and vigilant, as phishing attempts can closely mimic official emails. If you suspect a phishing attempt, report it to the appropriate authorities immediately.",
    flashCards: [
      {
        data: "Phishing emails often create a sense of urgency to trick users into acting quickly without thinking.",
      },
      {
        data: "Always verify suspicious emails through official channels before taking any action.",
      },
      {
        data: "Clicking on links in phishing emails can lead to fake login pages designed to steal your credentials.",
      },
      {
        data: "Forwarding suspicious emails to colleagues can help raise awareness, but always report them to IT first.",
      },
      {
        data: "Never provide personal or sensitive information in response to an unsolicited email.",
      },
    ],
    quiz: [
      {
        question:
          "What should you do if you receive an email asking you to reset your password due to a security breach?",
        options: [
          {
            optionText:
              "Click on the link and reset your password immediately.",
            key: 1,
          },
          {
            optionText: "Ignore the email and report it to the IT department.",
            key: 2,
          },
          {
            optionText:
              "Forward the email to your colleagues for their opinion.",
            key: 3,
          },
          {
            optionText:
              "Verify the email's legitimacy with the IT department before acting.",
            key: 4,
          },
        ],
        correctAnswerKey: 4,
      },
    ],
  };

  return (
    <div className="container">
      <div className="pagecontent">
        <div className="playmaincontent">
          <div className="pagetitlescorewrapper">
            <div className="ppagetitletext">
              <span className="text">
                <span>{level.topic}</span>
              </span>
              <span className="text02">|</span>
              <span className="text03">
                <span>Level {level.level}</span>
              </span>
            </div>
            <div className="scoreliveswrapper">
              <div className="scorewrapper">
                <span className="text05">
                  <span>Score</span>
                </span>
                <span className="text07">
                  <span>{score}</span>
                </span>
              </div>
              <div className="lives">
                <FullHearts count={lives} />
                <BrokenHearts count={5 - lives} />
              </div>
            </div>
          </div>

          <PlayArea />
        </div>
        <div className="timerwrapper">
          <div className="clock">
            <AlarmClockIcon className="alarmclocklight" />
          </div>
          <BorderLinearProgress thickness={10} value={60} />
        </div>
      </div>
    </div>
  );
};

export default Play;
