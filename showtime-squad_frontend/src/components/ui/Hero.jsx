import './Hero.scss'

function Hero() {
    //TODO: Implement
    console.log("component not properly implemented")

    return (
        <header id="header" className='header'>
            <hgroup className='hero-title-group'>
                <h1 className='hero-title'>
                    <span className='hero-title-subgroup'>
                        <span className='hero-title-slogan'>For die-hard movie lovers, there's only one place to be:</span>
                        <span className='hero-title-main'>Showtime</span><br />
                    </span>
                    <span className='hero-title-subgroup'>
                        <span className='hero-title-main'>Squad</span>
                        <span className='hero-title-slogan'>, where passion meets cinema.</span>
                    </span>
                </h1>
            </hgroup>
        </header>
    )
}

export default Hero