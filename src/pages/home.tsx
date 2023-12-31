import React, { useState } from "react";
import "../css/home.css"
import { Navbar } from "../components/NavBar";
import { NAVBARCONFIG } from "../components/NavBarConfig";
import { NavBarItemEnum } from "../components/NavBarItem";
import Gallery from "../components/Gallery";
import Rebus from "../components/Rebus";

export const Home = (): JSX.Element => {

    const category_count = [12, 23, 17, 13, 8, 13, 3, 16, 5, 2, 5, 14, 11, 9, 7, 21, 2, 6, 32, 17, 1, 3, 9, 0, 2, 2];

    return (
        <>
            <div className="home">
                <Navbar
                items={NAVBARCONFIG}
                selectedItem={NavBarItemEnum.HOME}/>
                <h2 className="quote">"I am more than the sum of my parts, but if you insists 😜"</h2>
                <p className="gallery-instruction">Click or Tap on the image to enlarge<br></br>For the purpose of unlocking 'secrets', the left most image in each slides are considered 'in-focused'</p>
                <Rebus numberOfColumns={4} category_count={category_count}/>
                <Gallery category_count={category_count}/>
            </div>
            Test

        </>

    )
}