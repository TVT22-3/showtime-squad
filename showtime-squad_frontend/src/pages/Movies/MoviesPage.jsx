import { Routes, Route } from "react-router-dom"
import Footer from "../../components/ui/Footer"
import Header from "../../components/ui/Header"
import Sitemap from "../../data/sitemap.json"
import LoginRegisterHandler from "../../components/ui/LoginRegisterHandler"
import FilterBar from "../../components/ui/FilterBar"
import Movies from "../../components/ui/Movies"

function MoviesPage() {
    // TODO: Implement
    console.log("component not properly implemented")

    return (
        <>
            <Header />
            <FilterBar />
            <Movies />
            <Routes>
                <Route path="/login" element={<LoginRegisterHandler />} />
            </Routes>
            <Footer sitemap={Sitemap} />
        </>
    )
}

export default MoviesPage