import NavBar from "../../components/ui/NavBar"
import SearchBar from "../../components/ui/SearchBar"
import Hero from "./Hero";

function Header({isFrontpage = true}) {
    //TODO: Implement
    console.log("component not properly implemented")

    return (
        <>
            <NavBar />
            <SearchBar />
            {
                //TODO: Implement normal header
                isFrontpage ? <Hero /> : <header></header>
            }
        </>

    )
}

export default Header