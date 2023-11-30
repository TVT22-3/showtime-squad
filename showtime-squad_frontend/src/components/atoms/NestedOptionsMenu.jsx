import "./NestedOptionsMenu.scss"
import OptionListItem from "./OptionListItem.jsx"

function NestedOptionsButton({ options, icon = '💩' }) {

    return (
        <div className='nested-options'>
            <ul className='edit menu-indicator'>
                <li className='dropdown'>
                    {icon}
                    {options ? generateNestedOptions(options) : <>null</>}
                </li>
            </ul>
        </div>
    )
}

function generateNestedOptions(items) {
    const listItems = Object.entries(items).map(([key, item]) => {

        // check if item is options
        if (item.options) {
            // recursion stops when options are met
            let options = []
            for (let i = 0; i < item.options.length; i++) {
                options.push(<OptionListItem key={i} category={key} option={item.options[i]} />)
            }
            return (<ul key={key} className="category">
                <span>{key}</span>
                {options}</ul>)
        } else {
            return (
                <li key={key} className='dropdown nest'>
                    {key}
                    {generateNestedOptions(item)}
                </li>
            )
        }
    })

    return <ul className='dropdown-content'>{listItems}</ul>;
}

export default NestedOptionsButton