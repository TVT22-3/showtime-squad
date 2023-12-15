import "./FunctionButton.scss"

// Displays a button with plus on it.
// Pass any onClick function you want and handle it in the parent element
function FunctionButton({ onClick, text, displayError, className }) {

    return (
        <div className={`function-button-wrapper ${className ? className : ''}`}>
            {displayError ?
                <div className={`error ${displayError === null ? 'transparent' : ''}`}>
                    {displayError}
                </div>
                : <></>}

            <button onClick={onClick} className='function-button' data-testid="function-button">
                {text}
            </button>
        </div>
    )
}

export default FunctionButton