import { Routes, Route } from "react-router-dom"
import Footer from "../../components/ui/Footer"
import Header from "../../components/ui/Header"
import Main from "../../components/ui/Main"
import Sitemap from "../../data/sitemap.json"
import LoginRegisterHandler from "../../components/ui/LoginRegisterHandler"

function Home() {
    // TODO: Implement
    console.log("component not properly implemented")

    return (
        <>
            <Header />
            <Main />
            <Routes>
                <Route path="/login" element={<LoginRegisterHandler />} />
            </Routes>
            <Footer sitemap={Sitemap} loggedIn={true} />
        </>
    )
}

export default Home