import classes from "../css/WordsBoard.module.css"

export default function WordsBoard({word}) {
    const wordArray = word.split('');

    return (
        <section className={classes.sectionWords}>
            {[...Array(5)].map((_, rowIndex) => (
                <div className={classes.row} key={rowIndex}>
                    {wordArray.map((letter, i) => (
                        <div className={classes.letter} key={i}></div>
                    ))}
                </div>
            ))}
        </section>
    )
}