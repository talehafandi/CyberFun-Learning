import React, { useEffect, useState } from "react";

const SceneText = ({ sceneDescription }) => {
  const [displayedSentences, setDisplayedSentences] = useState([]);

  useEffect(() => {
    setDisplayedSentences(sceneDescription.split(/(?<=[.!?])\s+/));
  }, [sceneDescription]);

  //TODO: Delayed sentence rendering, one by one
  //   useEffect(() => {
  //     const sentences = sceneDescription.split(/(?<=[.!?])\s+/);
  //     let sentenceIndex = 0;

  //     const averageWordsPerMinute = 225;
  //     const wordsPerSecond = averageWordsPerMinute / 60;

  //     // Display the first sentence immediately
  //     setDisplayedSentences([sentences[0]]);
  //     sentenceIndex++;

  //     console.log(
  //       "second sentence: ",
  //       sentences[0]?.split(" ").length * (1000 / wordsPerSecond)
  //     );

  //     const displayNextSentence = () => {
  //       if (sentenceIndex < sentences.length) {
  //         setDisplayedSentences((prevSentences) => [
  //           ...prevSentences,
  //           sentences[sentenceIndex],
  //         ]);
  //         sentenceIndex++;
  //         console.log(
  //           "Next renders: ",
  //           sentences[sentenceIndex - 1]?.split(" ").length *
  //             (1000 / wordsPerSecond)
  //         );
  //         setTimeout(
  //           displayNextSentence,
  //           sentences[sentenceIndex - 1]?.split(" ").length *
  //             (1000 / wordsPerSecond)
  //         );
  //       }
  //     };

  //     setTimeout(
  //       displayNextSentence,
  //       sentences[0]?.split(" ").length * (1000 / wordsPerSecond)
  //     );

  //     return () => {
  //       // Clear any pending timeouts
  //       clearTimeout(displayNextSentence);
  //     };
  //   }, [sceneDescription]);

  const getClassNameForSentence = (index) => {
    if (index === 0) {
      return "scene-line-1";
    } else if (index === 1) {
      return "scene-line-2";
    } else {
      return "scene-line-rest";
    }
  };

  return (
    <div>
      {displayedSentences.map((sentence, index) => (
        <p key={index} className={getClassNameForSentence(index)}>
          <span>{sentence}</span>
        </p>
      ))}
    </div>
  );
};

export default SceneText;
