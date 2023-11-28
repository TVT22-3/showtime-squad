import "./Adder.scss"


function Adder({ onClick }) {

    return (
        <section className='adder'>
            <div className="inner" onClick={onClick}>
                <span>+</span>
            </div>
        </section>
    )
}

export default Adder