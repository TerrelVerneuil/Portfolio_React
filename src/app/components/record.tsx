import React, { useEffect, CSSProperties } from 'react';

interface RecordProps {
  style?: CSSProperties;
}

const Record: React.FC<RecordProps> = ({ style }) => {
  useEffect(() => {
    const audio = document.getElementById("myaudio") as HTMLAudioElement;
    const record = document.getElementById("record") as HTMLImageElement;
    audio.play().catch((error) => console.error("Error playing audio:", error));
    if (audio && record) {
      audio.volume = 0.4;
    
      const handleClick = () => {
        if (audio.paused) {
          audio.play().catch((error) => console.error("Error playing audio:", error));
          localStorage.setItem("audioPaused", "false");
          record.classList.remove("paused");
        } else {
          audio.pause();
          localStorage.setItem("audioPaused", "true");
          record.classList.add("paused");
        }
      };
      const audioPaused = localStorage.getItem("audioPaused") === "true";
      if (audioPaused) {
        audio.pause();
        record.classList.add("paused");
      } else {
        audio.play().catch((error) => console.error("Error initializing audio:", error));
        record.classList.remove("paused");
      }

      record.addEventListener("click", handleClick);

     
      return () => {
        record.removeEventListener("click", handleClick);
      };
    }
  }, []);

  return (
    <div style={style}>
      <img className="record" id="record" src="/images/record.png" alt="Record" />
      <audio loop id="myaudio">
        <source src="./deep-lofi-vibes-205062.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default Record;