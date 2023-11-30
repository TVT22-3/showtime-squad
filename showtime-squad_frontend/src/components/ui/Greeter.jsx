import './Greeter.css'
import { useUser } from '../../context/UserContext.jsx'


function Greeter() {
    //TODO: Implement
    const { username } = useUser();
    console.log("component not properly implemented")

    return (
        <section className='greeter'>
            <div className='max-wrapper'>
                <h2>Hello {username}</h2>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta quisquam nisi quam perferendis minus temporibus incidunt voluptatem quis quibusdam voluptas, aliquid neque ratione totam voluptatibus perspiciatis. Ad exercitationem blanditiis ducimus.</p>
            </div>
        </section>
    )
}

export default Greeter