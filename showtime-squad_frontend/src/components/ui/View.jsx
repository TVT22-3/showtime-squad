import './View.css'
import ViewBlock from '../containers/ViewBlock.jsx'

import { OptionsButtonContextProvider } from '../../context/OptionsButtonContext.jsx';

// Mock data to hold information on what ViewBlocks to render for the user.
// Real info will be loaded from db.
// 'blocks' will contain an array of (block) objects, that all contain its type,
// using objects since these might be expanded to include size and other info.
// Root object may be expanded to include other meta info like order.
const mockBlockInfoContainer = {
    blocks: [
        { type: { category: "movies", option: "top movies" } },
        { type: { category: "text", option: "news" } },
        { type: { category: "movies", option: "favorites" } }
    ],
}

function View() {
    //TODO: Implement
    console.log("component not properly implemented")

    let blockInfoContainer = mockBlockInfoContainer; // TODO: get from db

    return (
        <section className='view'>
            {generateViewBlocks(mockBlockInfoContainer)}
        </section>
    )
}

function generateViewBlocks({ blocks }) {

    return (
        <>
            {
                blocks.map((block, index) => {
                    return (
                        <OptionsButtonContextProvider key={index} type={block.type} >
                            <ViewBlock key={index} />
                        </OptionsButtonContextProvider>)
                })
            }
        </>
    )
}

export default View