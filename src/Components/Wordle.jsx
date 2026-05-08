import { useEffect, useState } from 'react'
import WordsBoard from './WordsBroad.jsx'
import Keyboard from'./Keyboard.jsx'

export default function Wordle() {
    const randomLength = Math.floor(Math.random() * 3)+4;
    const [randomWord, setRandomWord] = useState("");

    const [nbrWordsGuessed, setNbrWordsGuessed] = useState(0);
    const [guessingWord, setGuessingWord] = useState([]);
    
    useEffect(() => {
        async function getWord() {

            const response = await fetch(`https://random-words-api.kushcreates.com/api?words=1&language=en&category=animals&length=${randomLength}`);

            const data = await response.json();
            setRandomWord(data[0].word);

            console.log(data);        
        }

        getWord();
    }, [])

    function letterClicked(letter) {
        console.log(letter);
        
        if (guessingWord.length < randomLength) {
            setGuessingWord(prevGuessingWord => [...prevGuessingWord, letter]) //pushes letter clicked to the array
        }
        
        console.log(guessingWord);
        
    }

    return (
        <main>
            <WordsBoard word={randomWord} nbrWordsGuessed={nbrWordsGuessed} guessingWord={guessingWord}/>
            <Keyboard letterClicked={letterClicked} />
        </main>
    )
}