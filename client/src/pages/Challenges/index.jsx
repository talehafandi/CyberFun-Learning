import React, { useEffect, useState } from "react";
import "./index.css";
import restApi from "../../api";
import { useDispatch } from "react-redux";
import Level from "../../components/Level";
import LeaderboardPeek from "../../components/LeaderboardPeek";

const Challenges = (props) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    //API call for fetching data on Challenges page
    //TODO: Fetch Challenges data from store and assign it to the 'list' variable below
    const fetchData = async () => {
      setLoading(true);
      //Make call
      await restApi
        .getDataOnChallenges()
        .then((response) => {
          //Update state on store (See ChallengesSlice reducer for more insights)
          // dispatch(updateChallengesData(response));
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  const challenges = [
    {
      challengeName: "Phishing",
      levels: [
        {
          levelName: "Level 1: Basic",
          completionStatus: "Completed",
          enableLevel: true,
        },
        {
          levelName: "Level 2: Intermediate",
          completionStatus: "Not Attempted",
          enableLevel: true,
        },
        {
          levelName: "Level 3: Advanced",
          completionStatus: "Not Attempted",
          enableLevel: false,
        },
      ],
    },
    {
      challengeName: "Social Engineering",
      levels: [
        {
          levelName: "Level 1: Basic",
          completionStatus: "Completed",
          enableLevel: true,
        },
        {
          levelName: "Level 2: Intermediate",
          completionStatus: "Not Attempted",
          enableLevel: true,
        },
        {
          levelName: "Level 3: Advanced",
          completionStatus: "Not Attempted",
          enableLevel: false,
        },
      ],
    },
  ];

  return (
    <div className="container">
      <div className="page-content">
        <div className="page-title-wrapper">
          <span className="page-title">
            <span>Challenges</span>
          </span>
        </div>
        <div className="challengeswrapper">
          <div className="challenges">
            {challenges.map((challenge) => {
              return (
                <>
                  <div className="challengetopic">
                    <span className="challenge-name">
                      <span>{challenge.challengeName}</span>
                    </span>
                    <div className="levelsgroup">
                      {challenge.levels.map((level) => {
                        return (
                          <Level
                            levelName={level.levelName}
                            completionStatus={level.completionStatus}
                            enableLevel={level.enableLevel}
                          />
                        );
                      })}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <LeaderboardPeek />
        </div>
      </div>
    </div>
  );
};

export default Challenges;
