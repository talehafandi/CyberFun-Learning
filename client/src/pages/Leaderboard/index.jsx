import React, { useEffect, useState } from "react";
import "./index.css";
import restApi from "../../api";
import { useDispatch } from "react-redux";

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

  return <div className="container">Leaderboard</div>;
};

export default Leaderboard;
