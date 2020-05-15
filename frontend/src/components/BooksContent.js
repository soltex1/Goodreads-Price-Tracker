// Imports
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import BooksList from "./BooksList";
import BooksLoadMore from "./BooksLoadMore";
import BooksMessage from "./BooksMessage";
import BooksSearchBar from "./BooksSearchBar";
import { getBooks, updateBook, setBookPricesTimeout } from "../actions/books";
import { SERVER_URL } from "../constants";
import "../styles/BooksContent.css";

const socket = io.connect(SERVER_URL);

function BooksContent () {

  const [data, setData] = useState({});

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(null);
  const [getPrices, setGetPrices] = useState(false);
  const [timer, setTimer] = useState(null);

  const resetState = () => {
    setData({});
    setPage(null);
    setPage(1);
    setGetPrices(false);
  };

  const handleSubmit = (currentQuery) => async (event) => {

    event.preventDefault();

    currentQuery = currentQuery.trim().toLowerCase();

    if (currentQuery !== "") {
      if ((data.books && data.books.length) || data.meta || data.error) {
        resetState();
      }

      setQuery(currentQuery);
      getBookList(currentQuery, page);
    }
  };

  const getBookList = async (query, page, update = false) => {

    setLoading(true);

    const response = await getBooks(query, page, update ? data.books : null);

    setData(response);

    if (response && !response.error) {
      setBookPricesTimeout(setData, setTimer, timer);
      setGetPrices(response.books.map((book) => ({
        id: book.id,
        isbn: book.isbn,
        isbn13: book.isbn13
      })));
    }

    setLoading(false);
  };

  const handleLoadMore = () => {
    getBookList(query, page + 1, true);
    setPage(page + 1);
  };

  useEffect(() => {
    socket.on("book", (bookDetails) => {
      setData((previousData) => {
        return {
          books: updateBook(previousData.books, bookDetails),
          meta: previousData.meta,
          error: previousData.error
        };
      });
    });
  }, []);

  useEffect(() => {
    if (data.books && data.books.length && getPrices) {

      // Emit an event to the server to get the prices
      socket.emit("getPrices", getPrices);
      setGetPrices(false);
    }
  }, [getPrices]);

  return <div className="booksContent">
    <p className={"booksContentTitle"}>FEATURES</p>
    <p>Instantly Find The Best <span>Book Prices</span></p>
    <BooksSearchBar handleSubmit={handleSubmit}/>
    {(data.meta || data.error) && <BooksMessage meta={data.meta} error={data.error}/>}
    {data.books && <BooksList books={data.books}/>}
    <BooksLoadMore meta={data.meta} loading={loading} handleLoadMore={handleLoadMore}/>
  </div>;
}

export default BooksContent;
