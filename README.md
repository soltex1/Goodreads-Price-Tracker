
<h1 align="center">
  <br>
<img src="https://cryptic-waters-92928.herokuapp.com/static/media/header.16a85765.png" alt="book" height="120" align="right" />
  <br>
  Goodreads Price Tracker (backend)
  <br>
</h1>

:orange_book:<h4 align="center">:orange_book: This is a price tracker for your books listed on [Goodreads](https://www.goodreads.com/) as `want-to-read`.</h4>

:convenience_store: Stores available:

* [Book Depository](https://www.bookdepository.com/)
* [Wook](https://www.wook.pt/) 
* [Bertrand](https://www.bertrand.pt/) 
* [Fnac](https://www.fnac.pt/)

### Description

I am an active user on [Goodreads](https://www.goodreads.com/), who is always updating my current readings and also adding new books to my `want-to-read` list. Most of the times when I want to buy a book, I go through my list, pick a book, and then I go check on some shops if there is a good price. So, I decided to create this application to automate the process.

### Composition

This application is divided in two parts:

* [Backend](https://github.com/soltex1/goodreads-price-tracker-backend) **Node**
* [Frontend](https://github.com/soltex1/goodreads-price-tracker-frontend) **React**

The project already has the latest version of the frontend compiled. However, you can also access the source code repository through the link above.


### How It Works

1. Make a request to the [Goodreads API](https://www.goodreads.com/api) in order to figure it out if the user exists.

2. Get the books from the `want-to-read` list and parse.

3. For each book, get the price in the available stores, and send a [socket.io](https://socket.io/) event.

This tree points are the main steps of how the application works. The endpoint that send a request to the Goodreads API is the /user/books?
