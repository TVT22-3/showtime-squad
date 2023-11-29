import './ViewBlock.scss'
import MovieBlocks from './MovieBlocks.jsx'
import NestedOptionsMenu from '../atoms/NestedOptionsMenu.jsx'
import viewEditOptions from "../../data/viewEditOptions.json"
import viewRemoveOptions from "../../data/viewRemoveOptions.json"

import { useOptionsButtonContext } from '../../context/OptionsButtonContext.jsx'

function ViewBlock() {
    //TODO: Implement
    console.log("component not properly implemented")

    const { clickedButton, clickedCategory, clickedOption } = useOptionsButtonContext()

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
                    <h6>{clickedOption ? clickedOption : 'title'}</h6>
                </div>

                <div className='options'>
                    <NestedOptionsMenu options={viewEditOptions} icon="📝" />

                    <NestedOptionsMenu options={viewRemoveOptions} icon="❌" />
                </div>
            </div>

            <div className='content'>
                <MovieBlocks type={clickedOption} />
            </div>
        </article>
    )
}

// should send delete request to backend
function handleRemove() {

}

export default ViewBlock