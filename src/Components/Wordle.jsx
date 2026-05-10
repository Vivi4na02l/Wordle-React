import { useEffect, useState, useRef } from 'react'
import Navbar from './Navbar.jsx'
import WordsBoard from './WordsBroad.jsx'
import Keyboard from'./Keyboard.jsx'

export default function Wordle() {
    const [randomWord, setRandomWord] = useState("");
    const [wordLength, setWordLength] = useState(4);
    
    const [nbrWordsGuessed, setNbrWordsGuessed] = useState(0);
    const [guessingWord, setGuessingWord] = useState([]);
    const [guessedWords, setGuessedWords] = useState([]);

    const [guessedLetters, setGuessedLetters] = useState([]);
    const [guessedCorrectLetters, setGuessedCorrectLetters] = useState([]);
    const [guessedCorrectLettersAndPos, setGuessedCorrectLettersAndPos] = useState([]);
    const [guessedPos, setGuessedPos] = useState([]);

    const [shake,setShake] = useState(false);

    const [gameOver, setGameOver] = useState(false);
    
    useEffect(() => {
        async function getWord() {
            const randomLength = Math.floor(Math.random() * 3)+4;
            setWordLength(randomLength)
            setGuessedPos(Array(5).fill(null).map(() => Array(randomLength).fill(0)));
            
            const response = await fetch(`https://random-words-api.kushcreates.com/api?words=1&language=en&category=animals&length=${randomLength}`);

            const data = await response.json();
            setRandomWord((data[0].word).toUpperCase());

            console.log(data);        
        }

        getWord();
    }, [])

    /**
     * adds letters clicked to the word being written in the "board"
     * @param {*} letter 
     */
    function letterClicked(letter) {
        if (guessingWord.length < wordLength && !gameOver) {
            setGuessingWord(prevGuessingWord => [...prevGuessingWord, letter]) //pushes letter clicked to the array
        }
        
        // console.log(guessingWord);
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
     * checks if the word written exists and if it does, saves it and moves user to the next line to write more words
     */
    async function enterClicked() {
        if (gameOver) {
            return
        }

        const guessedWord = guessingWord.join("");

        const exists = await doesGuessedWordExist(guessedWord);

        if (exists == true) {
            // console.log("word exists");

            validateGuessedWord();

            setGuessedWords(prevGuessedWords => [...prevGuessedWords, guessedWord]) //pushes guessedWord to the array
            setNbrWordsGuessed(nbrPrev => nbrPrev +1) //moves on to the next line
            setGuessingWord([]) //restarts the value that stores the word being currently written
        } else {
            // console.log("word doesn't exist");
            triggerShake()
        }
    }

    function validateGuessedWord() {
        const wordGuessed = guessingWord.join("").toUpperCase();
        
        if (randomWord == wordGuessed) {
            // User wins, they guessed the word
            console.log("User wins!");
            setGameOver(true);
        }

        const lettersChosenWord = randomWord.toUpperCase().split('')
        for (const letterGuessingWord of guessingWord) {

            // if a letter of guessing word exists within the chosen word
            if (lettersChosenWord.includes(letterGuessingWord)) {

                // if both of the letters are in the same position
                if (lettersChosenWord.findIndex((letter => letter == letterGuessingWord)) == guessingWord.findIndex((letter => letter == letterGuessingWord))) {
                    const posLetterGuessedWord = guessingWord.findIndex((letter => letter == letterGuessingWord));
                    setGuessedPos(prev => {
                        const newGuessedPos = [...prev];

                        newGuessedPos[nbrWordsGuessed] = [...newGuessedPos[nbrWordsGuessed]]
                        newGuessedPos[nbrWordsGuessed][posLetterGuessedWord] = 2

                        return newGuessedPos
                    })

                    // if the letter was guessed correctly before, but in the wrong position, it is now removed from the array, since now it has been fully correctly guessed (letter+its position)
                    if (guessedCorrectLetters.includes(letterGuessingWord)) {
                        setGuessedCorrectLetters(prev =>
                            prev.filter(letter => letter != letterGuessingWord)
                        )
                    }
                    setGuessedCorrectLettersAndPos(prev => [...prev, letterGuessingWord])

                // if they are in different positions
                } else {
                    const posLetterGuessedWord = guessingWord.findIndex((letter => letter == letterGuessingWord));
                    setGuessedPos(prev => {
                        const newGuessedPos = [...prev];

                        newGuessedPos[nbrWordsGuessed] = [...newGuessedPos[nbrWordsGuessed]]
                        newGuessedPos[nbrWordsGuessed][posLetterGuessedWord] = 1

                        return newGuessedPos
                    })
                    
                    // if letter and its position has already been guessed correctly, it doesn't change the letter in the keyboard back to yellow, staying green
                    if (!guessedCorrectLettersAndPos.includes(letterGuessingWord)) {
                        setGuessedCorrectLetters(prev => [...prev, letterGuessingWord])
                    }
                }
            } else {
                setGuessedLetters(prev => [...prev, letterGuessingWord])
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
        <>
            <Navbar />
            <main>
                <WordsBoard word={randomWord} nbrWordsGuessed={nbrWordsGuessed} guessingWord={guessingWord} guessedWords={guessedWords} guessedPos={guessedPos} shake={shake}/>
                <Keyboard letterClicked={letterClicked} deleteClicked={deleteClicked} enterClicked={enterClicked} guessedLetters={guessedLetters} guessedCorrectLetters={guessedCorrectLetters} guessedCorrectLettersAndPos={guessedCorrectLettersAndPos}/>
            </main>
        </>
    )
}