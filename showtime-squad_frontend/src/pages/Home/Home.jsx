import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";
import Main from "../../components/ui/Main";
import Sitemap from "../../data/sitemap.json";
import LoginRegisterHandler from "../../components/ui/LoginRegisterHandler";

function Home() {
    // TODO: Implement
    console.log("component not properly implemented");

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Header />
                            <Main />
                            <Footer sitemap={Sitemap} loggedIn={true} />
                        </>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <>
                            <Header />
                            <LoginRegisterHandler />
                            <Main />
                            <Footer sitemap={Sitemap} loggedIn={true} />
                        </>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default Home;
