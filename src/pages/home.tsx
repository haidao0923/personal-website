import React from "react";
// import { useCarousel } from "./../../hooks/aboutCarousel";
import "../css/home.css"
import { Navbar } from "../components/NavBar";
import { NAVBARCONFIG } from "../components/NavBarConfig";
import { NavBarItemEnum } from "../components/NavBarItem";
import Gallery from "../components/Gallery";

export const Home = (): JSX.Element => {
    //const aboutImage = useCarousel()
    return (
        <>
            <div className="home">
                <Navbar
                items={NAVBARCONFIG}
                selectedItem={NavBarItemEnum.HOME}/>
                <h2 className="quote">I am more than the sum of my parts, but if you insists :P</h2>
                <Gallery />
            </div>
            Test

        </>

    )
}