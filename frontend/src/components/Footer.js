import React from "react";

import LinkedinImg from "../images/linkedin.png";
import GithubImg from "../images/github.png";
import StackImg from "../images/stack.png";
import "../styles/Footer.css";

const githubLink = "https://github.com/soltex1";
const linkedinLink = "https://www.linkedin.com/in/ruben-santos/";
const stackoverflowLink = "https://stackoverflow.com/users/2908330/soltex";

function Footer () {
  return (
    <footer>
      <div>
        <div className="footerImages">
          <a target="_blank" rel="noopener noreferrer" href={githubLink}>
            <img src={GithubImg} alt="github"/>
          </a>
          <a target="_blank" rel="noopener noreferrer" href={linkedinLink}>
            <img src={LinkedinImg} alt="linkedin"/>
          </a>
          <a target="_blank" rel="noopener noreferrer" href={stackoverflowLink}>
            <img src={StackImg} alt="stackoverflow"/>
          </a>
        </div>
        <div className="footerText"><p>copyright @ soltex 2020</p></div>
      </div>
    </footer>
  );
}

export default Footer;
