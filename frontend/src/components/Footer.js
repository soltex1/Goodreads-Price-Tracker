import React from 'react'
import '../styles/Footer.css'
import LinkedinImg from '../images/linkedin.png'
import GithubImg from '../images/github.png'
import StackImg from '../images/stack.png'

function Footer () {
  return <footer>
    <div>
      <div className="footerImages">
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/soltex1">
          <img src={GithubImg} alt="github"/>
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/ruben-santos/">
          <img src={LinkedinImg} alt="linkedin"/>
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://stackoverflow.com/users/2908330/soltex">
          <img src={StackImg} alt="stackoverflow"/>
        </a>
      </div>
      <div className="footerText"><p>copyright @ soltex 2019</p></div>
    </div>

  </footer>
}

export default Footer
