// Imports
import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import SearchBar from './SearchBar'
import BooksList from './BooksList'
import Loading from './Loading'
import '../styles/BooksContent.css'
import { getBooks } from '../actions/books'

const socket = io.connect('http://localhost:3002/')

function BooksContent () {

  const [books, setBooks] = useState([])
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState(null)
  const [getPrices, setGetPrices] = useState(false)
  const [timer, setTimer] = useState(null)

  const resetState = () => {
    setBooks([])
    setMeta(null)
    setError(null)
    setPage(null)
    setPage(1)
    setGetPrices(false)
  }

  const handleSubmit = currentQuery => async (event) => {

    event.preventDefault()

    currentQuery = currentQuery.trim().toLowerCase()


    if (query !== currentQuery && currentQuery !== '') {
      if (books.length || meta || error) {
        resetState()
      }

      setQuery(currentQuery)
      getBookList(currentQuery, page)
    }
  }

  const getBookList = async (query, page, update = false) => {

    setLoading(true)

    const response = await getBooks(query, page)

    if (response.status === 200) {
      if (update) {
        setBooks([...books, ...response.data.books])
      }
      else {
        setBooks([...response.data.books])
      }

      setMeta(response.data.meta)
      setPage(response.data.meta.currentPage)

      setGetPrices(response.data.books.map((book) => ({
        id: book.id,
        isbn: book.isbn,
        isbn13: book.isbn13
      })))

      if (timer) {
        clearTimeout(timer)
      }

      setTimer(setTimeout( function() {

          setBooks((previousBooks) => {

            let newBooks = [...previousBooks]

            return newBooks.map((book) => {

              Object.keys(book.prices).forEach((store) => {
                if (!book.prices[store].value) {
                  book.prices[store].value = 'N/A'
                }
              })

              return book
            })

          })

        },
        500000
      ));

    } else if (response.status === 404) {
      setError('Your search did not return any results.')
    } else {
      setError('An error occurred. Please try again later.')
    }

    setLoading(false)
  }

  const loadMore = () => {
    getBookList(query, page + 1, true)
    setPage(page + 1)
  }

  useEffect(() => {

    socket.on('book', (bookDetails) => {

      setBooks(previousBooks => {

        let newBooks = [...previousBooks]

        // Find index of the book to update
        const bookIndex = newBooks.findIndex((book) => book.id === bookDetails.bookId.toString())

        if (bookIndex !== -1) {

          newBooks[bookIndex] = {
            ...newBooks[bookIndex],
            prices: {
              ...newBooks[bookIndex].prices,
              [bookDetails.trackerName]: {
                value: bookDetails.bookPrice,
                uri: bookDetails.uri
              }
            }
          }
        }

        return newBooks
      })

      //updateBook(bookDetails)
    })
  }, [])

  useEffect(() => {


    if (books.length && getPrices) {
      // Emit an event to the server to get the prices
      socket.emit('getPrices', books.map((book) => ({
          id: book.id,
          isbn: book.isbn,
          isbn13: book.isbn13
        }))
      )

      setGetPrices(false)
    }

  }, [getPrices])

  return <div className="booksContent">
    <p className={'booksContentTitle'}>FEATURES</p>
    <p>Instantly Find The Best <span>Book Prices</span></p>
    <SearchBar handleSubmit={handleSubmit}/>
    {(meta || error) && <div>
      <p className={'booksContentTitle'}>RESULTS</p>
      <p><span style={{ 'fontSize': '24px' }}>{meta ? `Found ${meta.totalItems} Books` : error}</span></p>
    </div>}
    <BooksList books={books}/>
    <div className={'loadMore'}>
      {loading && <Loading/>}
      {meta && meta.currentPage < meta.numPages && !loading &&
      <button onClick={() => loadMore()}>MORE</button>}
    </div>
  </div>
}

export default BooksContent
