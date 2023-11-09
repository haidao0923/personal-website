import React from "react";
import "../css/about.css"
import { Navbar } from "../components/NavBar";
import { NAVBARCONFIG } from "../components/NavBarConfig";
import { NavBarItemEnum } from "../components/NavBarItem";
export const About = (): JSX.Element => {
    //const aboutImage = useCarousel()

    return (
        <div>
            <Navbar
            items={NAVBARCONFIG}
            selectedItem={NavBarItemEnum.ABOUT}/>
            <div className="about">

            </div>
        </div>
    )
}