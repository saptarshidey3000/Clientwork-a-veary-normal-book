import React, { useRef, useState } from "react";

const EggPage = () => {
  const sounds = [
    "/sounds/sound1.mp3",
    "/sounds/sound2.mp3",
    "/sounds/sound3.mp3",
  ];

  const [soundIndex, setSoundIndex] = useState(0);
  const [showEggs, setShowEggs] = useState(true); // visibility
  const [fadeOut, setFadeOut] = useState(false); // animation state
  const audioRef = useRef(new Audio(sounds[0]));

  const handlePlaySound = () => {
    // Play sound
    audioRef.current.src = sounds[soundIndex];
    audioRef.current.play();

    setSoundIndex((prevIndex) => (prevIndex + 1) % sounds.length);

    // Trigger fade-out
    setFadeOut(true);

    // After animation ends → hide eggs
    setTimeout(() => {
      setShowEggs(false);
    }, 500); // must match fade-out duration
  };

  return (
    <div className="relative flex justify-center items-center w-full h-full">
      {/* Background Page */}
      <img
        src={`/book-pages/page33.jpg`}
        alt="Page 1"
        className="w-full h-full object-cover"
        onClick={handlePlaySound}
      />

      {/* Eggs in the middle, tiny size, fade-out on click */}
      {showEggs && (
        <img
          src="/prompts/eggs.png"
          alt="Eggs"
          className={`absolute h-6 w-auto cursor-pointer transition-opacity duration-500 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
          onClick={handlePlaySound}
        />
      )}
    </div>
  );
};

export default EggPage;
