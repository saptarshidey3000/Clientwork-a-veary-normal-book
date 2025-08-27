import React, { useState } from 'react'

const RandomizerPage = () => {
    const [randomNumbers, setRandomNumbers] = useState([77, 77, 77]);
    const [randomNumbers1, setRandomNumbers1] = useState([77, 77, 77]);
    const [randomNumbers2, setRandomNumbers2] = useState([77, 77, 77]);
    const Randomizer = [77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99, 101, 103]
    const getRandomNumbers = () => {
        const shuffled = [...Randomizer].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        setRandomNumbers(selected);

    };

    const getRandomNumbers1 = () => {
        const shuffled = [...Randomizer].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        setRandomNumbers1(selected);

    };

    const getRandomNumbers2 = () => {
        const shuffled = [...Randomizer].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);


        setRandomNumbers2(selected);
    };
    return (
        <div className="flex flex-col w-full h-full">
            {/* Top Part */}
            <div className="w-full h-1/3 overflow-hidden cursor-pointer relative" onClick={getRandomNumbers}>
                <img
                    src={`/book-pages/page${randomNumbers[0]}.jpg`}
                    alt={`Page ${randomNumbers[0]}`}
                    className="w-full relative"
                    style={{ height: "300%", top: "0%" }} // show top section
                />
            </div>

            {/* Middle Part */}
            <div className="w-full h-1/3 overflow-hidden cursor-pointer relative" onClick={getRandomNumbers1}>
                <img
                    src={`/book-pages/page${randomNumbers1[1]}.jpg`}
                    alt={`Page ${randomNumbers1[1]}`}
                    className="w-full relative"
                    style={{ height: "300%", top: "-100%" }} // move up to show middle
                />
            </div>

            {/* Bottom Part */}
            <div className="w-full h-1/3 overflow-hidden cursor-pointer relative" onClick={getRandomNumbers2}>
                <img
                    src={`/book-pages/page${randomNumbers2[2]}.jpg`}
                    alt={`Page ${randomNumbers2[2]}`}
                    className="w-full relative"
                    style={{ height: "300%", top: "-200%" }} // move up to show bottom
                />
            </div>
        </div>

    )
}

export default RandomizerPage
