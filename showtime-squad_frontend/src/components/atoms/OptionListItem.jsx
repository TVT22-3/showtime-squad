import "./NestedOptionsMenu.scss"

import React, { useContext } from 'react'
import { useOptionsButtonContext } from '../../context/OptionsButtonContext.jsx'

function NestedOptionsButton({ category, option }) {

    const { setClicked, setCategory, setOption } = useOptionsButtonContext()

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