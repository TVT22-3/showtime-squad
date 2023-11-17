import './Footer.scss'
import gitHubLogo from '../../assets/logo/github-mark-white.svg'
import discordLogo from '../../assets/logo/discord-clyde-white.svg'

function Footer({ sitemap, loggedIn }) {
    //TODO: change this (guest) to use context when login system implemented
    console.log("component not properly implemented")

    return (
        <footer id="footer" className='footer'>
            <div className='max-wrapper footer-wrapper'>

                <div className='footer-item _about'>
                    <h2>CONTACT</h2>
                    <ul>
                        <li>
                            <a href="https://github.com/TVT22-3/showtime-squad" className="hover-logo">
                                <img src={gitHubLogo} alt="GitHub" />
                                <span className='_social-name'>GitHub</span>
                            </a>
                        </li>

                        <li>
                            <a href="#" className="hover-logo">
                                <img src={discordLogo} alt="Antti Discord" />
                                <span className='_social-name'>Antti</span>
                            </a>
                        </li>

                        <li>
                            <a href="https://discord.com/users/135457199919988736" className="hover-logo">
                                <img src={discordLogo} alt="Miika Discord" />
                                <span className='_social-name'>Miika</span>
                            </a>
                        </li>

                        <li>
                            <a href="#" className="hover-logo">
                                <img src={discordLogo} alt="Mika Discord" />
                                <span className='_social-name'>Mika</span>
                            </a>
                        </li>

                        <li>
                            <a href="#" className="hover-logo">
                                <img src={discordLogo} alt="Santtu Discord" />
                                <span className='_social-name'>Santtu</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className='footer-item _info'>
                    <h2>ABOUT SHOWTIME SQUAD</h2>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores fuga a ratione atque, expedita quam? Recusandae voluptatibus quia explicabo voluptates iure, saepe fugit cum non autem perspiciatis beatae, nesciunt hic?
                    </p>
                </div>

                <div className='footer-item _sitemap'>
                    <h2>SITEMAP</h2>
                    {sitemap ? generateNestedList(sitemap, loggedIn) : <>sitemap not found...</>}
                </div>

                <div className='footer-item _related'>
                    <h2>RELATED</h2>
                    <ul>
                        <li><a href="https://www.themoviedb.org/">TMDB</a>
                            <ul>
                                <li><a href="https://developer.themoviedb.org/reference/intro/getting-started">API</a></li>
                            </ul>
                        </li>

                        <li><a href="https://www.finnkino.fi/">Finnkino</a>
                            <ul>
                                <li><a href="https://www.finnkino.fi/xml/">API</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>

            </div>
        </footer>
    )
}

// generates nested ul out of object such as sitemap.json that is formatted like:
// const example = 
// {
//     key: {
//         title: "example",
//         path: "/url",
//         //...
//         show: "guest|user|both",
//         subpages: { // optional
//             key: "etc..." 
//             // can continue recursively...
//         },
//     }
// }
function generateNestedList(pages, loggedIn) {
    const listItems = Object.entries(pages).map(([key, page]) => {
        // guard clause to check if user is logged in
        if (page.show &&
            (!loggedIn && page.show === 'user') || (loggedIn && page.show === 'guest')) {
            return
        }

        // check if page contains subpages
        if (page.subpages) {
            // recurse into subpages
            return (
                <li key={key}>
                    <a href={page.path}>{page.title}</a>
                    {generateNestedList(page.subpages, loggedIn)}
                </li>
            )
        } else {
            // recursion stops when no more subpages are met
            return <li key={key}><a href={page.path}>{page.title}</a></li>
        }
    })

    return <ul>{listItems}</ul>;
}


export default Footer