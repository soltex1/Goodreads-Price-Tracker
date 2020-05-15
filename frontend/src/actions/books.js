// Imports
import axios from "axios";

import { SERVER_URL } from "../constants";

// Load books
export const getBooks = async (userId = "53242860", page = 1, books) => {
  try {

    const response = await axios(`${SERVER_URL}/user/books?userId=${userId}&page=${page}`);

    // Returns an object { books, meta }
    return {
      books: books === null
        ? response.data.books
        : [...books, ...response.data.books],
      meta: response.data.meta
    };

  } catch (err) {

    const error = err.response.statusCode === 404
      ? "Your search did not return any results."
      : "An error occurred. Please try again later.";

    return { error };
  }
};

export const updateBook = (books, bookDetails) => {
  try {

    const newBooks = [...books];

    // Find index of the book to update
    const bookIndex = newBooks.findIndex((book) => book.id === bookDetails.bookId.toString());

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
      };
    }

    return newBooks;

  } catch (err) {
    return err;
  }
};

export const setBookPricesTimeout = (setData, setTimer, timer) => {

  if (timer) {
    clearTimeout(timer);
  }

  setTimer(setTimeout(function() {

      setData((previousData) => {

        let newBooks = [...previousData.books];

        newBooks = newBooks.map((book) => {

          Object.keys(book.prices).forEach((store) => {
            if (!book.prices[store].value) {
              book.prices[store].value = "N/A";
            }
          });

          return book;
        });

        return {
          books: newBooks,
          ...previousData
        };
      });

    },
    60000
  ));
};
