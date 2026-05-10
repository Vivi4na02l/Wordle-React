import classes from '../css/Keyboard.module.css'
import deleteIcon from "../assets/delete.png";

export default function Keyboard({letterClicked, deleteClicked, enterClicked, guessedLetters, guessedCorrectLetters, guessedCorrectLettersAndPos}) {
    const keyboardArray = [
        ["Q","W","E","R","T","Y","U","I","O","P"],
        ["A","S","D","F","G","H","J","K","L"],
        ["Z","X","C","V","B","N","M"]
    ]

    // console.log(guessedCorrectLetters);
    // console.log(guessedCorrectLettersAndPos);
    

    return (
        <section className={classes.sectionKeyboard}>
            {keyboardArray.map((row, i) => (
                <div className={classes.row} key={i}>

                    {/* if it's the last row, add key ENTER */}
                    {i == keyboardArray.length-1 && (
                        <div className={`${classes.key} ${classes.keyAction}`}
                             onClick={() => enterClicked()}>
                            ENTER
                        </div>
                    )}
                    
                    {/* LETTERS */}
                    {row.map((letter,i) => (
                        <div className={`${classes.key} ${classes.keyLetters}
                                         ${guessedLetters.find(guessedL => guessedL == letter) ? classes.darkGrey : ''}
                                         ${guessedCorrectLetters.find(guessedL => guessedL == letter) ? classes.yellow : ''}
                                         ${guessedCorrectLettersAndPos.find(guessedL => guessedL == letter) ? classes.green : ''}`} key={i}
                             onClick={() => letterClicked(letter)}>
                            <p>{letter}</p>
                        </div>
                    ))}

                    {/* if it's the last row, add key DELETE */}
                    {i == keyboardArray.length-1 && (
                        <div className={`${classes.key} ${classes.keyAction}`}
                             onClick={() => deleteClicked()}>
                            <img src={deleteIcon} alt="Delete" />
                        </div>
                    )}
                </div>
            ))}
        </section>
    )
}