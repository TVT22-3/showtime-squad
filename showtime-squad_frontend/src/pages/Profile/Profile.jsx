import { Routes, Route } from "react-router-dom"
import Footer from "../../components/ui/Footer"
import Header from "../../components/ui/Header"
import ProfilePage from "../../components/ui/ProfilePage"
import Sitemap from "../../data/sitemap.json"
import LoginRegisterHandler from "../../components/ui/LoginRegisterHandler"

function Profile() {
    // TODO: Implement
    console.log("component not properly implemented")
    return (
        <>
            <Header />
            <ProfilePage />
            {/*<Routes>
                <Route path="/login" element={<LoginRegisterHandler />} />
    </Routes>*/}
            <Footer sitemap={Sitemap} loggedIn={true} />
        </>
    )
}

export default Profile