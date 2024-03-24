import React, { useEffect, useState } from "react";
import "../css/secret.css";
import { Navbar } from "../components/NavBar";
import { NAVBARCONFIG } from "../components/NavBarConfig";
import { NavBarItemEnum } from "../components/NavBarItem";
import badges from "../lists/badge_list";

interface SecretProps {
    unlockedBadges: number[],
    completedBadges: number[];
}

export const Secret: React.FC<SecretProps> = ({unlockedBadges, completedBadges}): JSX.Element => {

  const attributionLink = `<a href="https://www.flaticon.com/free-icons/shield" title="shield icons">Shield icons created by justicon - Flaticon</a>`;
  const [clicked, setClicked] = useState(false);

  const displayBadges = () => {
    let completedBadgesDisplay = completedBadges.map((badgeIndex) => (
      <img className="completed-badge" src={badges[badgeIndex].image}></img>
    ));
    let unlockedBadgesDisplay = unlockedBadges.map((badgeIndex) => (
      <img className="badge" src={badges[badgeIndex].image}></img>
    ));
    console.log("DSFSDFSD");

    return (<>
    {completedBadgesDisplay}
    {unlockedBadgesDisplay}
    </>)
  }

  return (
    <div>
      <Navbar items={NAVBARCONFIG} selectedItem={NavBarItemEnum.SECRET} />
      <div className="secret">
        <h1 className="secret-title">Secrets</h1>
        <div className="badge-grid">
        {displayBadges()}
        </div>
      </div>
    </div>
  );
};