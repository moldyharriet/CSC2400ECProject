import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

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
        <ForcedVideo videoUrl="http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_h264.mov" />
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
    <video
      ref={videoRef}
      src={videoUrl}
      controls
      autoPlay
      muted
      style={{ width: "100%" }}
    />
  );
}
