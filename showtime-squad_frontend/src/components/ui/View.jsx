import { signal, useSignal} from '@preact/signals-react'
import { postRequest, putRequest, deleteRequest, getRequest} from "../../utils/GenericHTTPMethods"

import './View.css'
import { useUser } from '../../context/UserContext.jsx'
import ViewBlock from '../containers/ViewBlock.jsx'
import Adder from '../atoms/Adder.jsx'

import { OptionsButtonContextProvider } from '../../context/OptionsButtonContext.jsx';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL



function View() {
    //TODO: Implement
    console.log("component not properly implemented")
    const blockInfoContainerSignal = signal(getRequest(apiUrl + "/api/lists/user/"+useUser().username))
    console.log(blockInfoContainerSignal)
    
    // use signal to get blockInfoContainer from db
    const [blockInfoContainer, send] = useSignal(blockInfoContainerSignal);

    function handleAdder() {
        console.log("clicked adder!")
        const newListName = prompt("Please enter a name for your new list", "My List");
        if (newListName === null || newListName === "") { 
            alert("Please enter a valid name for your new list");
            return;
        }

        let modify = blockInfoContainer.value;
        modify.push({ listname: newListName, username: sessionStorage.getItem("username"), movieIds: [] })
        // update signal
        send({ ...blockInfoContainer, blocks: modify })

        // update db
        postRequest(apiUrl + "/api/lists/create", { listname: newListName, movieIds: [] })

    }

    return (
        <section className='view' data-testid='view'>
            {generateViewBlocks(blockInfoContainer)}

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
                    const listName = block.value.listname;
                    const movieIds = block.value.movieIds;
                    return (
                        <OptionsButtonContextProvider key={index} category={"movies"} >
                            <ViewBlock key={index} listName={listName} movieIds={movieIds} index={index}/>
                        </OptionsButtonContextProvider>)
                })
            }
        </>
    )
}

export default View