import { Routes, Route } from "react-router-dom"
import Footer from "../../components/ui/Footer"
import Header from "../../components/ui/Header"
import Sitemap from "../../data/sitemap.json"
import LoginRegisterHandler from "../../components/ui/LoginRegisterHandler"
import FilterBarTv from "../../components/ui/FilterBarTv"
import Tvseries from "../../components/ui/Tvseries"

function TvSeriesPage() {
    // TODO: Implement
    console.log("component not properly implemented")

    return (
        <>
            <Header />
            <FilterBarTv />
            <Tvseries />
            <Routes>
                <Route path="/login" element={<LoginRegisterHandler />} />
            </Routes>
            <Footer sitemap={Sitemap} />
        </>
    )
}

export default TvSeriesPage