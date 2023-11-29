import "./Adder.scss"

// Displays a button with plus on it.
// Pass any onClick function you want and handle it in the parent element
function Adder({ onClick }) {

    return (
        <section className='adder' data-testid="adder">
            <div className="inner" onClick={onClick}>
                <span>+</span>
            </div>
        </section>
    )
}

export default Adder