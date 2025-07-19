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
        <div className="flex justify-center items-center w-full h-full flex-col">
            <div className="border-1 w-full h-1/3 absolute overflow-hidden top-0" onClick={getRandomNumbers}>
                <img src={`/book-pages/page${randomNumbers[0]}.jpg`} alt={`Page 77`} className="w-[300%] h-[300%]  relative " />
            </div>
            <div className="border-1 w-full h-1/3" onClick={getRandomNumbers1}>
                <img src={`/book-pages/page${randomNumbers1[1]}.jpg`} alt={`Page 79`} className="w-full h-full object-cover" />
            </div>
            <div className="border-1 w-full h-1/3 absolute overflow-hidden bottom-0" onClick={getRandomNumbers2}>
                <img src={`/book-pages/page${randomNumbers2[2]}.jpg`} alt={`Page 81`} className=" w-[300%] h-[300%] relative bottom-99" />
            </div>
        </div>
    )
}

export default RandomizerPage
