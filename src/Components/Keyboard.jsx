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
                    {row.map((letter,i) => (
                        <div className="key" key={i}>
                            <p>{letter}</p>
                        </div>
                    ))}
                </div>
            ))}
        </section>
    )
}