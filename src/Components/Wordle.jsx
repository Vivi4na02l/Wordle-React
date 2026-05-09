import { useEffect, useState } from 'react'
import WordsBoard from './WordsBroad.jsx'
import Keyboard from'./Keyboard.jsx'

export default function Wordle() {
    const [randomWord, setRandomWord] = useState("");
    const [wordLength, setWordLength] = useState(4);
    
    const [nbrWordsGuessed, setNbrWordsGuessed] = useState(0);
    const [guessingWord, setGuessingWord] = useState([]);
    const [guessedWords, setGuessedWords] = useState([]);

    const [guessedLetters, setGuessedLetters] = useState([[],[],[],[],[],[]]);

    const [shake,setShake] = useState(false);
    
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

    /**
     * checks if the word written exists (!) and if it does, saves it and moves user to the next line to write more words
     */
    async function enterClicked() {
        const guessedWord = guessingWord.join("");

        const exists = await doesGuessedWordExist(guessedWord);

        if (exists == true) {
            console.log("word exists");

            validateGuessedWord();

            setGuessedWords(prevGuessedWords => [...prevGuessedWords, guessedWord]) //pushes guessedWord to the array
            setNbrWordsGuessed(nbrPrev => nbrPrev +1) //moves on to the next line
            setGuessingWord([]) //restarts the value that stores the word being currently written
        } else {
            console.log("word doesn't exist");
            triggerShake()
        }
    }

    function validateGuessedWord() {
        const lettersChosenWord = randomWord.split('')
        for (const letterGuessingWord of guessingWord) {

            // if a letter of guessing word exists within the chosen word
            if (lettersChosenWord.includes(letterGuessingWord)) {

                // if both of the letters are in the same position
                if (lettersChosenWord.findIndex((letter => letter == letterGuessingWord)) == guessingWord.findIndex((letter => letter == letterGuessingWord))) {
                    const letterObject = {
                        letter: letterGuessingWord,
                        color: "#27ca11"
                    }

                    setGuessedLetters(prevGuessedLetters => {
                        const newGuessedLetters = [...prevGuessedLetters]

                        newGuessedLetters[nbrWordsGuessed] = [...newGuessedLetters[nbrWordsGuessed], letterObject]

                        return newGuessedLetters
                    })

                // if they are in different positions
                } else {
                    const letterObject = {
                        letter: letterGuessingWord,
                        color: "#cabe11"
                    }

                    setGuessedLetters(prevGuessedLetters => {
                        const newGuessedLetters = [...prevGuessedLetters]

                        newGuessedLetters[nbrWordsGuessed] = [...newGuessedLetters[nbrWordsGuessed], letterObject]

                        return newGuessedLetters
                    })
                }
            }
        }
    }

    function triggerShake() {
        setShake(true);

        setTimeout(() => {
            setShake(false)
        }, 500)
    }

    /**
     * api that checks if the word written by the user exists
     * @param {*} word 
     */
    async function doesGuessedWordExist(word) {
        try {
            const response = await fetch(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
            );

            if (!response.ok) {
                const doesNotExistData = await response.json();
                console.log(doesNotExistData);
                // word doesn't exist
                return false
            }

            // word exists
            const data = await response.json();
            console.log(data);
            return true
        }

        catch (error) {
            console.log('error: '+error);
            return false
        }
    }

    return (
        <main>
            <WordsBoard word={randomWord} nbrWordsGuessed={nbrWordsGuessed} guessingWord={guessingWord} guessedWords={guessedWords} guessedLetters={guessedLetters} shake={shake}/>
            <Keyboard letterClicked={letterClicked} deleteClicked={deleteClicked} enterClicked={enterClicked}/>
        </main>
    )
}