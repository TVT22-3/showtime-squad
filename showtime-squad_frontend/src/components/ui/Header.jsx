import NavBar from "../../components/ui/NavBar"
import SearchBar from "../../components/ui/SearchBar"
import Hero from "./Hero";

function Header() {
    //TODO: Implement
    console.log("component not properly implemented")

    //TODO: Implement this boolean properly as a prop
    let isFrontpage = true;
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