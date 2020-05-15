import React from "react";

import BookRow from "./BookRow";

const BooksList = function BooksList(props) {
  return (
    <div className={"tableWrapper"}>
      <table className="Table-Normal">
        <thead/>
        <tbody>
        {props.books.map((book) => <BookRow key={book.id} book={book}/>)}
        </tbody>
      </table>
    </div>
  );
};

export default BooksList;
