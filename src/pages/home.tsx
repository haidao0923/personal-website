import React, { useState, useEffect } from "react";
import "../css/home.css"
import { Navbar } from "../components/NavBar";
import { NAVBARCONFIG } from "../components/NavBarConfig";
import { NavBarItemEnum } from "../components/NavBarItem";
import Gallery from "../components/Gallery";
import Rebus from "../components/Rebus";

import {analytics} from "../firebase.js";
import { logEvent } from "firebase/analytics";

interface HomeProps {
    getActiveSlideValues: () => void;
}

export const Home: React.FC<HomeProps> = ({getActiveSlideValues}) => {

    const category_count = [13, 23, 17, 15, 8, 13, 5, 16, 6, 3, 5, 15, 11, 11, 7, 25, 2, 6, 36, 22, 1, 3, 9, 0, 2, 2];

    useEffect(() => {
        analytics && logEvent(analytics, "page_loaded");
        console.log("Loaded Page");
      }, [])

    return (
        <>
            <div className="home">
                <Navbar
                items={NAVBARCONFIG}
                selectedItem={NavBarItemEnum.HOME}/>
                <h2 className="quote">"I am more than the sum of my parts, but if you insists 😜"</h2>
                <p className="gallery-instruction">Click or Tap on the image to enlarge<br></br>For the purpose of unlocking 'secrets', the left most image in each slides are considered 'in-focused'</p>
                <Rebus numberOfColumns={4} category_count={category_count}/>
                <Gallery category_count={category_count} getActiveSlideValues={getActiveSlideValues}/>
            </div>
            Test

        </>

    )
}