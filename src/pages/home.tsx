import React from "react";
import "../css/home.css"
import { Navbar } from "../components/NavBar";
import { NAVBARCONFIG } from "../components/NavBarConfig";
import { NavBarItemEnum } from "../components/NavBarItem";
import Gallery from "../components/Gallery";
import Rebus from "../components/Rebus";

export const Home = (): JSX.Element => {
    return (
        <>
            <div className="home">
                <Navbar
                items={NAVBARCONFIG}
                selectedItem={NavBarItemEnum.HOME}/>
                <h2 className="quote">"I am more than the sum of my parts, but if you insists 😜"</h2>
                <p className="gallery-instruction">Click or Tap on the image to enlarge<br></br>For the purpose of unlocking 'secrets', the left most image in each slides are considered 'in-focused'</p>
                <div className="play-prompt" >
                    <button className="play-button">Play re🚌?</button>
                    <p className="play-instruction">{'You will be shown a group of pictures from the gallery -> Quickly match the pictures to the corresponding letter of the alphabet to solve the word'}</p>
                </div>
                <Rebus numberOfColumns={4}/>
                <Gallery />
            </div>
            Test

        </>

    )
}