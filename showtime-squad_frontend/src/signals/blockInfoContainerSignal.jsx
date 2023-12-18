import { computed, signal } from '@preact/signals-react';
import { getRequest } from "../utils/GenericHTTPMethods.jsx";

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL;



const blockInfoContainerSignal = signal(getRequest(
    apiUrl + "/api/lists/user/" + sessionStorage.getItem(
        "username")));

const listInfoContainerSignal = computed(blockInfoContainerSignal, (blockInfoContainer) => {
    let listInfoContainer = [];
    blockInfoContainer.map((block) => {
        listInfoContainer.push({ movieIds: block.value.movieIds });
    })
    return listInfoContainer;
});

export { blockInfoContainerSignal, listInfoContainerSignal };
