import { NavBarItemEnum, NavBarItemProps } from "./NavBarItem"

export const NAVBARCONFIG: NavBarItemProps[] = [
        {
            itemEnum: NavBarItemEnum.HOME,
            url: "/",
            displayText: "Home",
        },
        {
            itemEnum: NavBarItemEnum.ABOUT,
            url: "/about",
            displayText: "About",
        },
        {
            itemEnum: NavBarItemEnum.SECRET,
            url: "/secret",
            displayText: "Secret Stuff",
        },
        {
            itemEnum: NavBarItemEnum.CONTACT,
            url: "/contact",
            displayText: "Contact",
        },
    ]

