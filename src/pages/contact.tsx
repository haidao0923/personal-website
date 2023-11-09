import React from "react";
import "../css/about.css"
import { Navbar } from "../components/NavBar";
import { NAVBARCONFIG } from "../components/NavBarConfig";
import { NavBarItemEnum } from "../components/NavBarItem";
export const Contact = (): JSX.Element => {
    //const aboutImage = useCarousel()

    return (
        <div>
            <Navbar
            items={NAVBARCONFIG}
            selectedItem={NavBarItemEnum.CONTACT}/>
            <div className="contact">

            </div>
        </div>
    )
}