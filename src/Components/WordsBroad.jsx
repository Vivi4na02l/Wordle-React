import classes from "../css/WordsBoard.module.css"

export default function WordsBoard({word, nbrWordsGuessed, guessingWord}) {
    const wordArray = word.split('');

    return (
        <section className={classes.sectionWords}>
            {[...Array(5)].map((_, rowIndex) => (
                <div className={classes.row} key={rowIndex}>
                    {wordArray.map((letter, i) => (
                        <div className={classes.letter} key={i}>
                            {guessingWord.length != 0 && rowIndex == nbrWordsGuessed && (
                                <p>{guessingWord[i]}</p>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </section>
    )
}