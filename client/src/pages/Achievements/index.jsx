import React, { useEffect, useState } from "react";
import "./index.css";
import restApi from "../../api";
import { useDispatch } from "react-redux";

const Achievements = (props) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    //API call for fetching data on Achievements page
    //TODO: Fetch Achievements data from store and assign it to the 'list' variable below
    const fetchData = async () => {
      setLoading(true);
      //Make call
      await restApi
        .getDataOnAchievements()
        .then((response) => {
          //Update state on store (See AchievementsSlice reducer for more insights)
          // dispatch(updateAchievementsData(response));
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  return <div className="container">Achievements</div>;
};

export default Achievements;
