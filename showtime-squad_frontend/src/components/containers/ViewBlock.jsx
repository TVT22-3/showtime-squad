import './ViewBlock.scss'
import MovieBlocks from './MovieBlocks.jsx'
import NestedOptionsMenu from '../atoms/NestedOptionsMenu.jsx'
import viewEditOptions from "../../data/viewEditOptions.json"
import viewRemoveOptions from "../../data/viewRemoveOptions.json"

import { useMyContext } from '../../context/MyContext.jsx'

function ViewBlock() {
    //TODO: Implement
    console.log("component not properly implemented")

    const { clickedButton, clickedCategory, clickedOption } = useMyContext()

    return (
        <article className='view-block'>
            <div className='action-row'>
                <div className='title'>
                    <h6>{clickedOption ? clickedOption : 'title'}</h6>
                </div>
                
                <div className='options'>
                    <NestedOptionsMenu options={viewEditOptions} icon="📝" />

                    <NestedOptionsMenu options={viewRemoveOptions} icon="❌" />
                </div>
            </div>

            <div className='content'>
                <MovieBlocks />
            </div>
        </article>
    )
}

export default ViewBlock