import React, { useRef, useState } from "react";

const EggPage = () => {
    const sounds = [
        "/sounds/sound1.mp3",
        "/sounds/sound2.mp3",
        "/sounds/sound3.mp3"
    ];

    const [soundIndex, setSoundIndex] = useState(0);
    const audioRef = useRef(new Audio(sounds[0]));

    const handlePlaySound = () => {
        // Update the audio source
        audioRef.current.src = sounds[soundIndex];
        audioRef.current.play();

        // Update index for next click
        setSoundIndex((prevIndex) => (prevIndex + 1) % sounds.length);
    };
    return (

        <div className="flex justify-center items-center w-full h-full">

            <img src={`/book-pages/page33.jpg`} alt="Page 1" className="w-full h-full object-cover" onClick={handlePlaySound} />

        </div>

    )
}



export default EggPage