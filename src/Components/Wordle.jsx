import { useEffect, useState } from 'react'
import WordsBoard from './WordsBroad.jsx'
import Keyboard from'./Keyboard.jsx'

export default function Wordle() {
    const [randomWord, setRandomWord] = useState("");
    
    useEffect(() => {
        async function getWord() {
            const randomLength = Math.floor(Math.random() * 3)+4;

            const response = await fetch(`https://random-words-api.kushcreates.com/api?words=1&language=en&category=animals&length=${randomLength}`);

            const data = await response.json();
            setRandomWord(data[0].word);

            console.log(data);        
        }

        getWord();
    }, [])

    return (
        <main>
            <WordsBoard word={randomWord} />
            <Keyboard />
        </main>
    )
}