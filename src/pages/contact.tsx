import React from "react";
import "../css/contact.css"
import { Navbar } from "../components/NavBar";
import { NAVBARCONFIG } from "../components/NavBarConfig";
import { NavBarItemEnum } from "../components/NavBarItem";

import ContactForm from "../components/ContactForm";

export const Contact = (): JSX.Element => {
    //const aboutImage = useCarousel()

    return (
        <div>
            <Navbar
            items={NAVBARCONFIG}
            selectedItem={NavBarItemEnum.CONTACT}/>
            <div className="contact">
            <h1 className="rate-me">Rate me 🥰</h1>
            <ContactForm></ContactForm>
            </div>
        </div>
    )
}