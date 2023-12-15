import './ViewBlock.scss'
import './MovieBlocks.scss'
import MovieBlock from '../atoms/MovieBlock.jsx'
import NestedOptionsMenu from '../atoms/NestedOptionsMenu.jsx'
import viewEditOptions from "../../data/viewEditOptions.json"
import viewRemoveOptions from "../../data/viewRemoveOptions.json"

import { listInfoContainerSignal } from '../../signals/blockInfoContainerSignal.jsx'
import { useOptionsButtonContext } from '../../context/OptionsButtonContext.jsx'
import MovieBlocks from './MovieBlocks.jsx'
import { useSignal } from '@preact/signals-react'


function ViewBlock({ listName, movieIds, index }) {
    //TODO: Implement

    
    console.log("component not properly implemented")
    
    const { clickedCategory, clickedOption } = useOptionsButtonContext()

    if (clickedCategory === 'remove') {
        switch (clickedOption) {
            case 'remove':
                handleRemove()
                return <></>

            case 'reset':
                break
        }
    }

    return (
        <article className='view-block' data-testid='view-block'>
            <div className='action-row'>
                <div className='title'>
                    <h6>{listName}</h6>
                </div>

                <div className='options'>
                    <NestedOptionsMenu options={viewEditOptions} icon="📝" />

                    <NestedOptionsMenu options={viewRemoveOptions} icon="❌" />
                </div>
            </div>

            <div className='content'>
                <section className='movie-blocks' data-testid='movie-blocks'>
                    <MovieBlocks key={index} ids={movieIds} />
                </section>
            </div>
        </article>
    )
}

// should send delete request to backend
function handleRemove() {

}

export default ViewBlock