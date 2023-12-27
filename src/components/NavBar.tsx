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
        <Link className="title-link" to='/'>
            <div className="title-background">
                <div className="title">
                    <text>Hai's Hub</text>
                </div>
            </div>
        </Link>

        <div className="navbar">
            {itemsList}
        </div>
    </>

    )
}