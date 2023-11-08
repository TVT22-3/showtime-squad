import Greeter from "./Greeter"
import SideBar from "./SideBar"
import View from "./View"

import './Main.css'

function Main() {
    //TODO: Implement
    console.log("component not properly implemented")

    return (
        <main className='main'>
            <Greeter />

            <div className='max-wrapper view-wrapper'>
                <View />

                <SideBar />
            </div>
        </main>
    )
}

export default Main