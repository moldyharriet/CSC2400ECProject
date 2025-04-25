import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState<number[]>([]);

  const callFormatArray = (input: string) => {
    formatArray(input, setInputValue);
  };

  return (
    <>
      {/*
          Array visualization goes below (such that it's above the video)
      */}

      <div>
        <h1>Quicksort Algorithm Visualizer</h1>
        <ArrayInput onSubmit={callFormatArray}/>
      </div>

      <div>
        <ForcedVideo videoUrl="https://www.youtube.com/embed/AidAXgq9dWc?si=jIhXpaWZIwbSkeHW&amp&autoplay=1&mute=1&controls=0" />
        <p style={{ fontSize: "9px", textAlign: "center" }}>
          This project was developed by Matthew Love (mtlove42), Rivers Haley
          (jrhaley42), and Chase Gibbs (cdgibbs42).
        </p>
      </div>
    </>
  );
}

export default App;

function ForcedVideo({ videoUrl }: { videoUrl: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Auto-play
    video.play().catch(console.error);

    // Prevent pause
    const blockPause = () => video.play();
    video.addEventListener("pause", blockPause);

    // Prevent seeking
    const blockSeek = () => {
      if (Math.abs(video.currentTime - lastTimeRef.current) > 1) {
        video.currentTime = lastTimeRef.current;
      } else {
        lastTimeRef.current = video.currentTime;
      }
    };
    const lastTimeRef = { current: 0.0 };

    video.addEventListener("timeupdate", blockSeek);
    video.addEventListener("seeking", blockSeek);

    // Lock playback rate
    video.playbackRate = 1.0;
    const blockPlaybackRateChange = () => {
      if (video.playbackRate !== 1.0) video.playbackRate = 1.0;
    };
    video.addEventListener("ratechange", blockPlaybackRateChange);

    return () => {
      video.removeEventListener("pause", blockPause);
      video.addEventListener("timeupdate", blockSeek);
      video.removeEventListener("seeking", blockSeek);
      video.removeEventListener("ratechange", blockPlaybackRateChange);
    };
  }, []);

  return (
    <div style={{ width: "100%", position: "relative", paddingBottom: "56.25%" }}>
      <iframe
        src={videoUrl}
        title="YouTube video player"
        frameBorder="0"   // deprecated but still functions, don't remove
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      ></iframe>
    </div>
  );
}

function formatArray(inputArray: string, setInputValue: (value: number[]) => void){
  try {
    // Remove curly braces if present and split by commas
    const cleanedInput = inputArray.replace(/[{}]/g, "").trim();
    const parsedArray = cleanedInput
      .split(",")                               // Split by commas
      .map((num) => parseFloat(num.trim()))     // Convert to numbers
      .filter((num) => !isNaN(num));            // Filter out invalid numbers

    setInputValue(parsedArray);                 // Update the state in App
    console.log("Parsed Array:", parsedArray);  // For debugging
  } catch (error) {
    console.error("Invalid input format:", error);
  }
}

function ArrayInput({ onSubmit }: { onSubmit: (input: string) => void }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    onSubmit(inputValue); // Pass the input value to the formatArray function
    setInputValue(""); // Clear the input box
  };

  return (
    <>
      <input
        placeholder="Enter Array Data Here (e.g. {1, 2, 3, 4})"
        style={{ width: "237px" }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} // Update state on input change
      /><br/><br/>
      <button className="submitUserArray" onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
}