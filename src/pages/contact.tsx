import React, {useState} from "react";
import "../css/contact.css"
import { Navbar } from "../components/NavBar";
import { NAVBARCONFIG } from "../components/NavBarConfig";
import { NavBarItemEnum } from "../components/NavBarItem";

import ContactForm from "../components/ContactForm";
import ChatWindow from "../components/ChatWindow";

export const Contact = (): JSX.Element => {

    const [chatOpened, setChatOpened] = useState<boolean>(false);

    return (
        <div>
            <Navbar
            items={NAVBARCONFIG}
            selectedItem={NavBarItemEnum.CONTACT}/>
            <div className="contact">
            <h1 className="rate-me">Rate me 🥰</h1>
            <ContactForm></ContactForm>
            </div>
            <button className="chat-button" onClick={() => setChatOpened(!chatOpened)}>
                Chat with an AI!
            </button>
            {chatOpened && <ChatWindow/>}
        </div>
    )
}