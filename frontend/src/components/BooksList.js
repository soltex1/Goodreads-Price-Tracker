import React from 'react'
import BookRow from './BookRow'

function BooksList ({ books }) {

  return <div className={'tableWrapper'}>
    <table className="Table-Normal">
      <thead/>
      <tbody>
      {books.map((book) => <BookRow key={book.id} book={book}/>)}
      </tbody>
    </table>
  </div>
}

export default BooksList
