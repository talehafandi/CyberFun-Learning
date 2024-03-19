import { createSlice } from "@reduxjs/toolkit";

export const playSlice = createSlice({
  name: "play",
  initialState: {
    apiResponseData: {},
    topic: "",
    level: "",
    scenes: [],
    currentScene: {},
    score: 0,
    lives: 5,
    totalTime: 100,
    started: false,
    choicesMade: [],
    currentView: "scenes", //scene, summary, flashcards, quiz
    summary: "",
    flashCards: [],
    quizQuestions: [],
    quizQuestionOnScreen: {},
  },
  reducers: {
    setAPIResponseData: (state, action) => {
      state.apiResponseData = action.payload;
      state.topic = action.payload.topic;
      state.level = action.payload.level;
      state.scenes = action.payload.scenes;
      state.summary = action.payload.summary;
      state.flashCards = action.payload.flashCards;
      state.quizQuestions = action.payload.quizQuestions;
    },
    updateScenes: (state, action) => {
      /*Usage:
      Dispatch the updateScenes action with the updated scenes array to update the scenes.

      Example usage:
      dispatch(updateScenes(updatedScenesArray)); */

      state.scenes = action.payload;
    },
    updateCurrentScene: (state, action) => {
      /*Usage:
      Dispatch the updateCurrentScene action with the desired scene index to update the current scene.

      Example usage:
      dispatch(updateCurrentScene(2)); */
      console.log("Updating current scene..");

      state.currentScene = state.scenes[action.payload];
    },
    resetLives: (state) => {
      state.lives = 5;
    },
    takeALife: (state) => {
      state.lives = state.lives - 1;
    },
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },
    resetChoicesMade: (state) => {
      state.choicesMade = [];
    },
    addToChoices: (state, action) => {
      state.choicesMade = [...state.choicesMade, action.payload];
    },
    startLevel: (state) => {
      state.started = true;
    },
    setSummary: (state, action) => {
      state.summary = toString(action.payload);
    },
    setFlashcards: (state, action) => {
      state.flashCards = action.payload;
    },
    setQuizQuestions: (state, action) => {
      state.quizQuestions = action.payload;
    },
    setQuizQuestionOnScreen: (state, action) => {
      state.quizQuestionOnScreen = action.play.currentQuizQuestion;
    },
  },
  selectors: {
    getCurrentScene: (state) => {
      /* Usage:
      Call the getCurrentScene selector function to retrieve the current scene from the Redux store.
      */

      return state.currentScene;
    },
    getAllScenes: (state) => state.scenes,
    getCurrentView: (state) => state.currentView,
    getLives: (state) => state.lives,
    getTotalTime: (state) => state.totalTime,
    getSummary: (state) => state.summary,
    getFlashcards: (state) => state.flashCards,
    getQuizQuestions: (state) => state.quizQuestions,
    getQuizQuestionOnScreen: (state) => state.currentQuizQuestion,
    getScore: (state) => state.score,
  },
});

//Export actions
export const {
  setAPIResponseData,
  setTopic,
  setLevel,
  updateScenes,
  updateCurrentScene,
  takeALife,
  resetLives,
  setCurrentView,
  resetChoicesMade,
  addToChoices,
  startLevel,
  setSummary,
  setFlashcards,
  setQuizQuestions,
  setQuizQuestionOnScreen,
} = playSlice.actions;

//Export selectors
export const {
  getCurrentScene,
  getAllScenes,
  getCurrentView,
  getLives,
  getTotalTime,
  getSummary,
  getFlashcards,
  getQuizQuestions,
  getQuizQuestionOnScreen,
  getScore,
} = playSlice.selectors;

//Export reducer
export default playSlice.reducer;
