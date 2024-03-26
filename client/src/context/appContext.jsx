import React, { createContext, useState, useContext } from "react";
import { getCurrentView, setCurrentView } from "../redux/reducers/playSlice";
import { useDispatch, useSelector } from "react-redux";

// Create the context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);

// Provider component
export const AppProvider = ({ children }) => {
  const [signinPopupVisibility, setSigninPopupVisibility] = useState(true);

  const authPopupVisibility = (visibility) =>
    setSigninPopupVisibility((prevVisibility) => visibility);

  const dispatch = useDispatch();
  const currentView = useSelector(getCurrentView);

  const handleNextView = () => {
    switch (currentView) {
      case "scenes":
        dispatch(setCurrentView("summary"));
        break;

      case "summary":
        dispatch(setCurrentView("flashcards"));
        break;

      case "flashcards":
        dispatch(setCurrentView("quiz"));
        break;

      case "quiz":
        dispatch(setCurrentView("final"));
        break;

      case "final":
        //TODO: Exit, or next level
        break;

      default:
        break;
    }
  };

  return (
    <AppContext.Provider
      value={{ signinPopupVisibility, authPopupVisibility, handleNextView }}
    >
      {children}
    </AppContext.Provider>
  );
};
