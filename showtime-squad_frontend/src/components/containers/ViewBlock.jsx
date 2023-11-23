import './ViewBlock.scss'
import MovieBlocks from './MovieBlocks.jsx'
import NestedOptionsMenu from '../atoms/NestedOptionsMenu.jsx'
import viewEditOptions from "../../data/viewEditOptions.json"
import viewRemoveOptions from "../../data/viewRemoveOptions.json"

function ViewBlock() {
    //TODO: Implement
    console.log("component not properly implemented")

    return (
        <article className='view-block'>
            <div className='action-row'>
                <div className='title'>
                    <h6>Title</h6>
                </div>

                <div className='options'>
                    <NestedOptionsMenu options={viewEditOptions} icon="📝"/>

                    <NestedOptionsMenu options={viewRemoveOptions} icon="❌"/>
                </div>
            </div>

            <div className='content'>
                <MovieBlocks />
            </div>
        </article>
    )
}

export default ViewBlock