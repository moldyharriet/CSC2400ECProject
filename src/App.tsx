import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const [intLastReportedTime, setIntLastReportedTime] = useState(0);
  const videoElement = document.querySelector("video");

  if (videoElement) {
    videoElement.addEventListener("pause", () => {
      videoElement.play();
    });

    videoElement.addEventListener("ratechange", () => {
      videoElement.playbackRate = 1.0;
    });

    videoElement.addEventListener("timeupdate", () => {
      if (
        videoElement.currentTime < intLastReportedTime ||
        videoElement.currentTime > intLastReportedTime + 1
      ) {
        videoElement.currentTime = intLastReportedTime;
      }
      console.log(videoElement.currentTime);
      setIntLastReportedTime(videoElement.currentTime);
    });
  }

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
