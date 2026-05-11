import classes from '../css/GameOver.module.css'

export default function GameOver({randomWord, gameOver, userWon}) {
    function title() {
        if (userWon) {
            return "You win!"
        } else {
            return "You lose!"
        }
    }

    function message() {
        if (userWon) {
            return "Congratulations! You've guessed the word correctly!"
        } else {
            return `The word was "${randomWord.toLowerCase()}". Better luck next time!`
        }
    }

    return(
        <div className={`${classes.overlay} ${gameOver ? classes.visible : classes.hidden}`}>
            <dialog open>
                <h2>{title()}</h2>
                <p>{message()}</p>

                <footer>
                    <button className={classes.btnRestart}>Restart</button>
                    <button className={classes.btnCancel}>Cancel</button>
                </footer>
            </dialog>
        </div>
    )
}