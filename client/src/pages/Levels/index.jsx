import React, { useEffect, useState } from "react";
import "./index.css";
import restApi from "../../api";
import { useDispatch } from "react-redux";

const Levels = (props) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    //API call for fetching data on Levels page
    //TODO: Fetch Levels data from store and assign it to the 'list' variable below
    const fetchData = async () => {
      setLoading(true);
      //Make call
      await restApi
        .getDataOnLevels()
        .then((response) => {
          //Update state on store (See levelsSlice reducer for more insights)
          // dispatch(updateLevelsData(response));
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  return <div className="container">Levels</div>;
};

export default Levels;
