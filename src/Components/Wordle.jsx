import { useEffect, useState } from 'react'
import WordsBoard from './WordsBroad.jsx'
import Keyboard from'./Keyboard.jsx'

export default function Wordle() {
    const [randomWord, setRandomWord] = useState("");
    const [wordLength, setWordLength] = useState(4);
    
    const [nbrWordsGuessed, setNbrWordsGuessed] = useState(0);
    const [guessingWord, setGuessingWord] = useState([]);
    
    useEffect(() => {
        async function getWord() {
            const randomLength = Math.floor(Math.random() * 3)+4;
            setWordLength(randomLength)

            const response = await fetch(`https://random-words-api.kushcreates.com/api?words=1&language=en&category=animals&length=${randomLength}`);

            const data = await response.json();
            setRandomWord(data[0].word);

            console.log(data);        
        }

        getWord();
    }, [])

    function letterClicked(letter) {
        console.log(letter);
        
        if (guessingWord.length < wordLength) {
            setGuessingWord(prevGuessingWord => [...prevGuessingWord, letter]) //pushes letter clicked to the array
        }
        
        console.log(guessingWord);
        
    }

    function deleteClicked() {
        setGuessingWord(prevGuessingWord => {
            const copy = [...prevGuessingWord]
            copy.pop()
            return copy
        })
    }

    return (
        <main>
            <WordsBoard word={randomWord} nbrWordsGuessed={nbrWordsGuessed} guessingWord={guessingWord}/>
            <Keyboard letterClicked={letterClicked} deleteClicked={deleteClicked}/>
        </main>
    )
}