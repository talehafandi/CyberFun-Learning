import "./index.css";
import chartPinLight from "../../assets/chart_pin_light.svg";

const LeaderboardPeek = () => {
  return (
    <>
      <div className="leaderboardpeekwrapper">
        <div className="leaderboardpeek">
          <img src={chartPinLight} className="chartpinlight" />
          <div className="rank-wrapper">
            <span className="rank-text">
              <span>Your rank</span>
            </span>
            <span className="rank-number">
              <span>#56</span>
            </span>
          </div>
          <div className="view-leaderboard-btn">
            <span className="view-leaderboard-btn-text">
              <span>View Leaderboard</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaderboardPeek;
