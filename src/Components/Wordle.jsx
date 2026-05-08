import { useEffect, useState } from 'react'
import WordsBoard from './WordsBroad.jsx'
import Keyboard from'./Keyboard.jsx'

export default function Wordle() {
    const [randomWord, setRandomWord] = useState("");
    const [wordLength, setWordLength] = useState(4);
    
    const [nbrWordsGuessed, setNbrWordsGuessed] = useState(0);
    const [guessingWord, setGuessingWord] = useState([]);
    const [guessedWords, setGuessedWords] = useState([]);
    
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

    /**
     * adds letters clicked to the word being written in the "board"
     * @param {*} letter 
     */
    function letterClicked(letter) {
        console.log(letter);
        
        if (guessingWord.length < wordLength) {
            setGuessingWord(prevGuessingWord => [...prevGuessingWord, letter]) //pushes letter clicked to the array
        }
        
        console.log(guessingWord);
        
    }

    /**
     * deletes the last letter from the word being written
     */
    function deleteClicked() {
        setGuessingWord(prevGuessingWord => {
            const copy = [...prevGuessingWord]
            copy.pop()
            return copy
        })
    }

    function enterClicked() {
        const guessedWord = guessingWord.join("");
        setGuessedWords(prevGuessedWords => [...prevGuessedWords, guessedWord]) //pushes guessedWord to the array

        console.log(guessedWords);
        setNbrWordsGuessed(nbrPrev => nbrPrev +1)
        setGuessingWord([])
    }

    return (
        <main>
            <WordsBoard word={randomWord} nbrWordsGuessed={nbrWordsGuessed} guessingWord={guessingWord} guessedWords={guessedWords}/>
            <Keyboard letterClicked={letterClicked} deleteClicked={deleteClicked} enterClicked={enterClicked}/>
        </main>
    )
}