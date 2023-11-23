import "./NestedOptionsMenu.scss"

import React, { useContext } from 'react'
import { useMyContext } from '../../context/MyContext.jsx'

function NestedOptionsButton({ category, option }) {

    const { setClicked, setCategory, setOption } = useMyContext()

    const handleClick = () => {
        setClicked(`${category}.${option}`)
        setCategory(`${category}`)
        setOption(`${option}`)
    }

    return (
        <li onClick={handleClick}>{option}</li>
    )
}

export default NestedOptionsButton