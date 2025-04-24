import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const [intLastReportedTime, setIntLastReportedTime] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      // Prevent pausing
      videoElement.onpause = () => {
        videoElement.play();
      };

      // Prevent seeking
      videoElement.onseeked = () => {
        videoElement.currentTime = intLastReportedTime;
      };

      // Prevent playback rate changes
      videoElement.onratechange = () => {
        videoElement.playbackRate = 1.0;
      };

      // Ensure the video starts playing immediately
      videoElement.play();
      videoElement.playbackRate = 1.0;
    }
  }, [videoRef, intLastReportedTime]);

  // Update the last reported time every second
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const handleTimeUpdate = () => {
        setIntLastReportedTime(videoElement.currentTime);
      };
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [videoRef]);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>Chase is cool</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <video
          height="500"
          src="http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_1080p_h264.mov"
          autoPlay
        >
          <p>I'm not Catholic, but welcome to Purgatory</p>
        </video>
        <p style={{ fontSize: "9px", textAlign: "center" }}>
          This project was developed by Matthew Love (mtlove42), Rivers Haley
          (jrhaley42), and Chase Gibbs (cdgibbs42).
        </p>
      </div>
    </>
  );
}

export default App;
