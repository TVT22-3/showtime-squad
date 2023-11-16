import Footer from "../../components/ui/Footer"
import Header from "../../components/ui/Header"
import Main from "../../components/ui/Main"
import Sitemap from "../../data/sitemap.json"

function Home() {
    //TODO: Implement
    console.log("component not properly implemented")

        return (
        <>
            <Header />

            <Main />

            <Footer sitemap={Sitemap} isGuest={false} />
        </>
    )
}

export default Home