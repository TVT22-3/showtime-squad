import { signal } from '@preact/signals-react'

import './View.css'
import ViewBlock from '../containers/ViewBlock.jsx'
import Adder from '../atoms/Adder.jsx'

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

    let blockInfoContainer = signal(mockBlockInfoContainer) // TODO: get from db

    function handleAdder() {
        console.log("clicked adder!")
        let modify = blockInfoContainer.value.blocks
        modify.push({ type: { category: "movies", option: "free pick" } })
        blockInfoContainer.value = modify
    }

    return (
        <section className='view' data-testid='view'>
            {generateViewBlocks(blockInfoContainer.value)}

            <OptionsButtonContextProvider key='adder' category='adder' type='adder'>
                <Adder onClick={handleAdder} />
            </OptionsButtonContextProvider>
        </section>
    )
}



function generateViewBlocks({ blocks }) {

    return (
        <>
            {
                blocks.map((block, index) => {
                    return (
                        <OptionsButtonContextProvider key={index} category={block.category} type={block.type} >
                            <ViewBlock key={index} />
                        </OptionsButtonContextProvider>)
                })
            }
        </>
    )
}

export default View