import { BrowserRouter as BrowserRouter, Route, Routes } from 'react-router-dom'
import MiikaSandbox from "./MiikaSandbox.jsx"

function DebugSandbox() {

    return (
            <Routes>
                {/* <Route path="" element={<div>debug</div>} /> */}
                <Route path="miika/*" element={<MiikaSandbox />} />
            </Routes>
    )
}

export default DebugSandbox