/* global process */
import './ViewBlock.scss'
import MovieBlocks from './MovieBlocks.jsx'
import NestedOptionsMenu from '../atoms/NestedOptionsMenu.jsx'
import viewEditOptions from "../../data/viewEditOptions.json"
import viewRemoveOptions from "../../data/viewRemoveOptions.json"
import userList from '../../../../showtime-squad_backend/src/data/userList.java'

import React, { useEffect, useState } from 'react'
import { useOptionsButtonContext } from '../../context/OptionsButtonContext.jsx'


function ViewBlock() {
    //TODO: Implement

    const baseUrl = process.env.VITE_REACT_APP_BACKEND_BASE_URL
    console.log("component not properly implemented")
    const groupName = 

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