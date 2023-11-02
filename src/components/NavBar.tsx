import React from "react";
import { NavBarItem, NavBarItemEnum, NavBarItemProps } from "./NavBarItem";
import { Link } from "react-router-dom";
import "../css/navbar.css"
import TitleImage from "../images/Portrait.png"

export interface NavBarProps {
    items: NavBarItemProps[]
    selectedItem: NavBarItemEnum;
}

export const Navbar = (props: NavBarProps) => {

    const itemsList = props.items.map((item: NavBarItemProps) => {
        return NavBarItem({
            ...item,
            selected: props.selectedItem === item.itemEnum,
        });
    });

    return (
    <>
        <div className="title">

            Hai's Hub
        </div>
        <div className="navbar">
            {itemsList}
        </div>
    </>

    )
}