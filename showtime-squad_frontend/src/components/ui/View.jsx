import './View.css'
import ViewBlock from '../containers/ViewBlock.jsx'

import { MyContextProvider } from '../../context/MyContext.jsx';

function View() {
    //TODO: Implement
    console.log("component not properly implemented")

    return (
        <section className='view'>
            <MyContextProvider>
                <ViewBlock />
            </MyContextProvider>
        </section>
    )
}

export default View