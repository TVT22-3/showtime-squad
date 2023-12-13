import Footer from "../../components/ui/Footer"
import Header from "../../components/ui/Header"
import Sitemap from "../../data/sitemap.json"
import GroupList from "./GroupList"

function Groups() {

    return (
        <>
            <Header isFrontpage={true} />

            <GroupList />

            <Footer sitemap={Sitemap} loggedIn={true} />
        </>
    )
}

export default Groups