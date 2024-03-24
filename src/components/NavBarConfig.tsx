import { NavBarItemEnum, NavBarItemProps } from "./NavBarItem"

export const NAVBARCONFIG: NavBarItemProps[] = [
        {
            itemEnum: NavBarItemEnum.HOME,
            url: "/gallery",
            displayText: "Gallery",
        },
        {
            itemEnum: NavBarItemEnum.ABOUT,
            url: "/",
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

