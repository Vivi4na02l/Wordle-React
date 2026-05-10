import classes from '../css/Navbar.module.css'

export default function Navbar() {
    return (
        <header className={classes.header}>
            <div>
                <p>Category:</p>
                <select>
                    <option value="">Animals</option>
                    <option value="">Brainrot</option>
                    <option value="">Countries</option>
                    <option value="">Games</option>
                    <option value="">Sports</option>
                </select>
            </div>

            <div>
                <p>Words:</p>
                <select name="" id="">
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                </select>
            </div>
        </header>
    )
}