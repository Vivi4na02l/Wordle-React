import classes from "../css/WordsBoard.module.css"

export default function WordsBoard({word, nbrWordsGuessed, guessingWord, guessedWords, guessedPos, shake, flip}) {
    const wordArray = word.split('');

    return (
        <section className={classes.sectionWords}>
            {[...Array(5)].map((var_not_used, rowIndex) => (
                <div className={`
                                ${classes.row}
                                ${shake && rowIndex == nbrWordsGuessed? classes.shake : ""}
                                ${flip && rowIndex == nbrWordsGuessed-1? classes.flip : ""}`} key={rowIndex}>
                    {wordArray.map((letter, letterIndex) => (
                        <div className={`${classes.letter}
                                         ${guessedPos?.[rowIndex]?.[letterIndex] == 1 ? classes.yellow : ""}
                                         ${guessedPos?.[rowIndex]?.[letterIndex] == 2 ? classes.green : ""}`} key={letterIndex}>
                            {guessedWords.length != 0 && rowIndex <= guessedWords.length-1 ? (
                                <p>{guessedWords[rowIndex][letterIndex]}</p>
                            ) : guessingWord.length != 0 && rowIndex == nbrWordsGuessed && (
                                <p>{guessingWord[letterIndex]}</p>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </section>
    )
}