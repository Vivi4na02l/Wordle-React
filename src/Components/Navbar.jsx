import { useState } from 'react';
import classes from '../css/Navbar.module.css'

export default function Navbar({gameCategory, setGameCategory, gameLength, setGameLength, modeChanged, setModeChanged}) {
    const [isAlertOn, setIsAlertOn] = useState(false);

    function gCategory(e) {
        if (modeChanged >= 2) {
            Alert();
            console.log("You must finish this game before making any other changes.");
        } else {
            setModeChanged((nbr) => nbr + 1);
            setGameCategory(e.target.value)
        }
    }

    function gLength(e) {
        if (modeChanged >= 2) {
            Alert();
            console.log("You must finish this game before making any other changes.");
        } else {
            setModeChanged((nbr) => nbr + 1);
            setGameLength(e.target.value)
        }
    }

    function Alert() {
        setIsAlertOn(true)

        setTimeout(() => {
            setIsAlertOn(false)
        }, 3000)
    }

    return (
        <>
            <header className={classes.header}>
                <div>
                    <p>Category:</p>
                    <select value={gameCategory} onChange={(e) => gCategory(e)}>
                        <option value="Animals">Animals</option>
                        <option value="Birds">Birds</option>
                        <option value="Countries">Countries</option>
                        <option value="Sports">Sports</option>
                    </select>
                </div>

                <div>
                    <p>Length:</p>
                    <select value={gameLength} onChange={(e) => gLength(e)}>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </div>
            </header>

            <dialog className={classes.alert} open={isAlertOn}>
                <p>To make more changes to the word, you must complete this game.</p>
            </dialog>
        </>
    )
}