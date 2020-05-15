import React from "react";

import "../styles/Header.css";
import BookDep from "../images/bookdep.png";
import Wook from "../images/wook.jpg";
import Fnac from "../images/fnac.png";
import Bertrand from "../images/bertrand.png";
import Logo from "../images/logo.png";

function Header () {
  return (
    <div className="header">
      <div className="headerContent">
        <div className={"headerContentLeft"}>
          <div className={"headerContentTitle"}>
            <p>Save Money</p>
            <p>with your books.</p>
          </div>
          <div className={"headerContentSubTitle"}>
            <p>A new and creative way to buy</p>
            <p>your books in the <span>most popular shops</span></p>
          </div>
          <div className={"headerContentImages"}>
            <img alt={"book-depository"} src={BookDep}/>
            <img alt={"wook"} src={Wook}/>
            <img alt={"fnac"} src={Fnac}/>
            <img alt={"bertrand"} src={Bertrand}/>
          </div>
        </div>
        <div className={"headerContentRight"}>
          <img alt={"logo"} src={Logo}/>
        </div>
      </div>
    </div>
  );
}

export default Header;
