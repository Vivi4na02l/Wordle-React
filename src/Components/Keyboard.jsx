import '../css/Keyboard.css'
import deleteIcon from "../assets/delete.png";

export default function Keyboard() {
    const keyboardArray = [
        ["Q","W","E","R","T","Y","U","I","O","P"],
        ["A","S","D","F","G","H","J","K","L"],
        ["Z","X","C","V","B","N","M"]
    ]

    return (
        <section>
            {keyboardArray.map((row, i) => (
                <div className="row" key={i}>

                    {/* if it's the last row, add key ENTER */}
                    {i == keyboardArray.length-1 && (
                        <div className="key key-action">ENTER</div>
                    )}
                    
                    {/* LETTERS */}
                    {row.map((letter,i) => (
                        <div className="key key-letters" key={i}>
                            <p>{letter}</p>
                        </div>
                    ))}

                    {/* if it's the last row, add key DELETE */}
                    {i == keyboardArray.length-1 && (
                        <div className="key key-action">
                            <img src={deleteIcon} alt="Delete" />
                        </div>
                    )}
                </div>
            ))}
        </section>
    )
}