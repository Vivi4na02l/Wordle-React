import classes from '../css/Navbar.module.css'
// import { useState } from 'react';

export default function Navbar({gameCategory, setGameCategory, gameLength, setGameLength}) {
    // const [category, setCategory] = useState("Animals");
    // const [length, setLength] = useState("5");

    return (
        <header className={classes.header}>
            <div>
                <p>Category:</p>
                <select value={gameCategory} onChange={(e) => setGameCategory(e.target.value)}>
                    <option value="Animals">Animals</option>
                    <option value="Birds">Birds</option>
                    <option value="Countries">Countries</option>
                    <option value="Games">Games</option>
                    <option value="Sports">Sports</option>
                </select>
            </div>

            <div>
                <p>Words:</p>
                <select value={gameLength} onChange={(e) => setGameLength(e.target.value)}>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </div>
        </header>
    )
}