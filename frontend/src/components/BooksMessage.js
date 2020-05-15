import React from "react";

function BooksMessage ({ error, meta }) {

  const message = meta ?
    `Found ${meta.totalItems} Books`
    : error;

  return (
    <div>
      <p className={"booksContentTitle"}>RESULTS</p>
      <p>
        <span style={{ "fontSize": "24px" }}>
          {message}
        </span>
      </p>
    </div>
  );
}

export default BooksMessage;
