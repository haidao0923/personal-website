import React from "react";
import { Link } from "react-router-dom";
export enum NavBarItemEnum {
    HOME,
    ABOUT,
    SECRET,
    CONTACT,
}

export interface NavBarItemProps {
    itemEnum: NavBarItemEnum;
    url: string;
    displayText: string;
    selected?: boolean;
}

export const NavBarItem = (props: NavBarItemProps) => {
    return (
        <div>
            <Link
            to={props.url}
            className={props.selected ? "selected-navbar-links" : "navbar-links"}>
                {props.displayText}
            </Link>
        </div>
    )
}

