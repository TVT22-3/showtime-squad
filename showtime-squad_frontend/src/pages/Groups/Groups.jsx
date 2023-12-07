import { Routes, Route } from "react-router-dom"
import Footer from "../../components/ui/Footer"
import Header from "../../components/ui/Header"
import Sitemap from "../../data/sitemap.json"
import GroupList from "./GroupList"

function Groups() {
    // TODO: Implement
    console.log("component not properly implemented")

    return (
        <>
            <Header isFrontpage={true} />

            <GroupList />

            <Footer sitemap={Sitemap} loggedIn={true} />
        </>
    )
}

export default Groups