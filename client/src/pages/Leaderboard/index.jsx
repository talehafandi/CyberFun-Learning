import React, { useEffect, useState } from "react";
import "./index.css";
import restApi from "../../api";
import { useDispatch } from "react-redux";
import LeaderboardPeek from "../../components/LeaderboardPeek";

const Leaderboard = (props) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    //API call for fetching data on Leaderboard page
    //TODO: Fetch Leaderboard data from store and assign it to the 'list' variable below
    const fetchData = async () => {
      setLoading(true);
      //Make call
      await restApi
        .getDataOnLeaderboard()
        .then((response) => {
          //Update state on store (See LeaderboardSlice reducer for more insights)
          // dispatch(updateLeaderboardData(response));
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
      <div className="pagecontent">
        <div className="leaderboardmaincontent">
          <div className="ppagetitletext">
            <span className="text">
              <span>Leaderboard</span>
            </span>
          </div>
          <div className="leaderboardwrapper">
            <div className="rangetogglesearchwrapper">
              <div className="rangetogglegroup">
                <button className="rangetogglebutton">
                  <span className="text02">
                    <span>All time</span>
                  </span>
                </button>
                <button className="rangetogglebutton1">
                  <span className="text04">
                    <span>Today</span>
                  </span>
                </button>
              </div>
              <div className="search">
                <span className="text06">
                  <span>Search...</span>
                </span>
              </div>
            </div>
            <div className="leaderboardtablewrapper">
              <div className="leaderboardtable">
                <div className="leaderboardtableheader">
                  <span className="text08">
                    <span>Name</span>
                  </span>
                  <span className="text10">
                    <span>XP</span>
                  </span>
                  <span className="text12">
                    <span>Rank</span>
                  </span>
                </div>
                <div className="leaderboardtablerow">
                  <div className="profilenamewrapper">
                    <img
                      src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/161d8ffb-6caa-4102-8dd2-14ff2862603f/9a4e0ca9-e86f-4bc9-baa4-3faf7f930398?org_if_sml=14774&amp;force_format=original"
                      alt="profilepicture5351"
                      className="profilepicture"
                    />
                    <span className="text14">
                      <span>John Doe</span>
                    </span>
                  </div>
                  <span className="text16">
                    <span>1500</span>
                  </span>
                  <span className="text18">
                    <span>#1</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <LeaderboardPeek />
      </div>
    </div>
  );
};

export default Leaderboard;
