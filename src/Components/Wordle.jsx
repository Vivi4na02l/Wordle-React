import { useEffect, useState } from 'react'
import GameOver from './GameOver.jsx'
import Navbar from './Navbar.jsx'
import WordsBoard from './WordsBroad.jsx'
import Keyboard from'./Keyboard.jsx'

export default function Wordle() {
    const [gameCategory, setGameCategory] = useState("animals");
    const [gameLength, setGameLength] = useState("5");
    const [modeChanged, setModeChanged] = useState(0);

    const [randomWord, setRandomWord] = useState("");
    const [wordLength, setWordLength] = useState(5);
    
    const [nbrWordsGuessed, setNbrWordsGuessed] = useState(0);
    const [guessingWord, setGuessingWord] = useState([]); //memorizes each letter added of the word that is currently being written, before hitting "enter"
    const [guessedWords, setGuessedWords] = useState([]); //memorizes words written

    const [guessedLetters, setGuessedLetters] = useState([]); //memorizes the letters of words already written (after hitting "enter") that have no corelation to the correct word
    const [guessedCorrectLetters, setGuessedCorrectLetters] = useState([]); //memorizes the letters of words already written that are also used in the correct word
    const [guessedCorrectLettersAndPos, setGuessedCorrectLettersAndPos] = useState([]); //memorizes the letters of words already written that are also used in the correct word and are simultaneously in the correct position
    const [guessedPos, setGuessedPos] = useState([]);

    const [shake,setShake] = useState(false);
    const [flip,setFlip] = useState(false);

    const [gameOver, setGameOver] = useState(false);
    const [userWon, setUserWon] = useState(false);
    const [restartClicked, setRestartClicked] = useState(0);

    function clearGame() {
        setGuessingWord([]);
        setNbrWordsGuessed(0);
        setGuessedWords([]);
        setGuessedLetters([]);
        setGuessedCorrectLetters([]);
        setGuessedCorrectLettersAndPos([]);
        setGuessedPos([]);
        setGameOver(false);
        setUserWon(false);
    }
    
    useEffect(() => {
        async function getWord() {
            clearGame();

            setWordLength(gameLength)
            setGuessedPos(Array(5).fill(null).map(() => Array(gameLength).fill(0)));
            
            const response = await fetch(`https://random-words-api.kushcreates.com/api?words=1&language=en&category=${gameCategory}&length=${gameLength}`);

            const data = await response.json();
            setRandomWord((data[0].word).toUpperCase());

            console.log(data);        
        }

        getWord();
    }, [gameCategory, gameLength, restartClicked])

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

        if (exists == true && guessedWord.length == gameLength) {
            // console.log("word exists");
            validateGuessedWord();
            triggerFlip();

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
            setUserWon(true);
            setGameOver(true);
            setModeChanged(0);
        } else if (nbrWordsGuessed >= 4) {
            // User lost, ran out of tries
            console.log("User lost.");
            setUserWon(false);
            setGameOver(true);
            setModeChanged(0);
            return
        }

        const lettersChosenWord = randomWord.toUpperCase().split('')

        for (let i = 0; i < lettersChosenWord.length; i++) {
            // console.log("ciclo: "+i, lettersChosenWord, lettersChosenWord[i], guessingWord[i]);
        
            // if both of the letters are the same and in the same position
            if (lettersChosenWord[i] == guessingWord[i]) {
                // console.log("letras iguais");
                
                setGuessedPos(prev => {
                    const newGuessedPos = [...prev];

                    newGuessedPos[nbrWordsGuessed] = [...newGuessedPos[nbrWordsGuessed]]
                    newGuessedPos[nbrWordsGuessed][i] = 2 // what defines it as "green"

                    return newGuessedPos
                })

                // if the letter was guessed correctly before, but in the wrong position, it is now removed from the array, since now it has been fully correctly guessed (letter+its position)
                if (guessedCorrectLetters.includes(guessingWord[i])) {
                    setGuessedCorrectLetters(prev =>
                        prev.filter(letter => letter != guessingWord[i])
                    )
                }
                setGuessedCorrectLettersAndPos(prev => [...prev, guessingWord[i]])
            }

            // does not have the same letters in the same positions (but might still have letters in common in both words)
            else {
                if (lettersChosenWord.includes(guessingWord[i])) {
                    console.log("letra existe");
                    
                    const amountOfLetterInChosen = lettersChosenWord.filter(letter => letter == guessingWord[i])
                    const amountOfLetterInGuessed = guessingWord.filter(letter => letter == guessingWord[i])
                    
                    let sameLetterAndPos = 0
                    for (let j = 0; j < lettersChosenWord.length; j++) {
                        if (lettersChosenWord[j] == guessingWord[j]) {
                            console.log("ciclo: "+j, lettersChosenWord, lettersChosenWord[j], guessingWord[j], sameLetterAndPos);
                            sameLetterAndPos++
                        }
                    }

                    console.log(sameLetterAndPos);
                    

                    // if the same letter appears more times in guessed word than the correct one AND the letter doesn't have a match position with the same letter in the chosen word
                    if (amountOfLetterInGuessed > amountOfLetterInChosen) { //&& !guessedCorrectLettersAndPos.includes(guessingWord[i])
                        if (sameLetterAndPos == 0) {
                            const posLetterGuessedWord = guessingWord.findIndex((letter => letter == guessingWord[i]));
                            setGuessedPos(prev => {
                                const newGuessedPos = [...prev];
    
                                newGuessedPos[nbrWordsGuessed] = [...newGuessedPos[nbrWordsGuessed]]
                                newGuessedPos[nbrWordsGuessed][posLetterGuessedWord] = 1 // what defines it as "yellow"
    
                                return newGuessedPos
                            })
                            
                            // if letter and its position has already been guessed correctly, it doesn't change the letter in the keyboard back to yellow, staying green
                            // if (!guessedCorrectLettersAndPos.includes(guessingWord[i])) {
                                setGuessedCorrectLetters(prev => [...prev, guessingWord[i]])
                            // }
                        }

                    } else {
                        setGuessedPos(prev => {
                            const newGuessedPos = [...prev];

                            newGuessedPos[nbrWordsGuessed] = [...newGuessedPos[nbrWordsGuessed]]
                            newGuessedPos[nbrWordsGuessed][i] = 1 // what defines it as "yellow"

                            return newGuessedPos
                        })
                    }
                }

                // the letter of guessed word does not exist in the chosen word at all
                else {
                    setGuessedLetters(prev => [...prev, guessingWord[i]])
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

    function triggerFlip() {
        setFlip(true);

        setTimeout(() => {
            setFlip(false)
        }, 1500)
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
            <GameOver randomWord={randomWord} gameOver={gameOver} userWon={userWon} restartClicked={restartClicked} setRestartClicked={setRestartClicked}/>
            <Navbar gameCategory={gameCategory} setGameCategory={setGameCategory} gameLength={gameLength} setGameLength={setGameLength} modeChanged={modeChanged} setModeChanged={setModeChanged}/>
            <main>
                <WordsBoard word={randomWord} nbrWordsGuessed={nbrWordsGuessed} guessingWord={guessingWord} guessedWords={guessedWords} guessedPos={guessedPos} shake={shake} flip={flip}/>
                <Keyboard letterClicked={letterClicked} deleteClicked={deleteClicked} enterClicked={enterClicked} guessedLetters={guessedLetters} guessedCorrectLetters={guessedCorrectLetters} guessedCorrectLettersAndPos={guessedCorrectLettersAndPos}/>
            </main>
        </>
    )
}