import React from "react";

import "../styles/BookStand.css";

function BookStand ({ img, link }) {
  return (
    <div className="bookStand">
      <a target="_blank" rel="noopener noreferrer" href={link}>
        <img alt="bookStandImg" src={img}/>
      </a>
      <div className="bookStandTop"/>
      <div className="bookStandBottom"/>
    </div>
  );
}

export default BookStand;
