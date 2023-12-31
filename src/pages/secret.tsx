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

  return (
    <div>
      <Navbar items={NAVBARCONFIG} selectedItem={NavBarItemEnum.SECRET} />
      <div className="secret">
        <button onClick={() => setClicked(true)}>Click me!</button>
        <h1 className="secret-title">Secrets</h1>
        <div className="badge-grid">
        {badges.map((badge, index) => {
            return <>
                <img className={completedBadges.includes(index) ? "completed-badge" : "badge"} src={badge.image}></img>
                <img className={completedBadges.includes(index) ? "completed-badge" : "badge"} src={badge.image}></img>
                <img className={completedBadges.includes(index) ? "completed-badge" : "badge"} src={badge.image}></img>
                <img className={completedBadges.includes(index) ? "completed-badge" : "badge"} src={badge.image}></img>
                <img className={completedBadges.includes(index) ? "completed-badge" : "badge"} src={badge.image}></img>

            </>
        })}
        </div>
      </div>
    </div>
  );
};