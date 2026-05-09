import classes from "../css/WordsBoard.module.css"

export default function WordsBoard({word, nbrWordsGuessed, guessingWord, guessedWords, shake}) {
    const wordArray = word.split('');

    return (
        <section className={classes.sectionWords}>
            {[...Array(5)].map((_, rowIndex) => (
                <div className={`
                                ${classes.row}
                                ${shake && rowIndex == nbrWordsGuessed? classes.shake : ""}`} key={rowIndex}>
                    {wordArray.map((letter, i) => (
                        <div className={classes.letter} key={i}>
                            {guessedWords.length != 0 && rowIndex <= guessedWords.length-1 ? (
                                <p>{guessedWords[rowIndex][i]}</p>
                            ) : guessingWord.length != 0 && rowIndex == nbrWordsGuessed && (
                                <p>{guessingWord[i]}</p>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </section>
    )
}