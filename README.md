
<h1 align="center">
  <br>
    <a href="https://github.com/soltex1/goodreads-price-tracker">
    <img src="https://i.imgur.com/xl7Vpcl.png" alt="goodreadspricetracker" width="180">
    </a>
  <br>
  Goodreads Price Tracker
  <br>
</h1>

<h4 align="center">:orange_book: A price tracker for your books listed on Goodreads as want-to-read .</h4>

<p align="center">
  <img src="https://i.imgur.com/Tp2xsSe.gif">
</p>

<p align="center">
  <a href="#description">Description</a> •
  <a href="#composition">Composition</a> •
  <a href="#how-it-works">How It Works</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#TODO">TODO</a> •
  <a href="#endpoints">Endpoints</a> •
  <a href="#DEMO">Demo</a> •
  <a href="#Notes">Notes</a>
</p>

## Description

I am an active user on [Goodreads](https://www.goodreads.com/), who is always updating my current readings and also adding new books to my `want-to-read` list. Most of the times when I want to buy a book, I go through my list, pick a book, and then I go check on some shops if there is a good price. So, I decided to create this application to automate the process.

:convenience_store: Stores available:

* [Book Depository](https://www.bookdepository.com/)
* [Wook](https://www.wook.pt/) 
* [Bertrand](https://www.bertrand.pt/) 
* [Fnac](https://www.fnac.pt/)

## Composition

This application is divided in two parts:

* [Backend](./backend) **Node**
* [Frontend](./frontend) **React**

The project already has the latest version of the frontend compiled. However, you can also access the source code repository through the link above.


### How It Works

1. Make a request to the [Goodreads API](https://www.goodreads.com/api) in order to figure it out if the user exists.

2. Get the books from the `want-to-read` list and parse.

3. For each book, get the price in the available stores, and send a [socket.io](https://socket.io/) event to the client.

This three points are the main steps of how the application works. The endpoint that sends a request to the Goodreads API is the **/user/books**.

### How To Use

1. `git clone`

2. `npm install`

3. Set environment variable `GOODREADS_API_KEY`

You can read more about Goodreads API [here](https://www.goodreads.com/api).

### TODO

1. This application is just a sample of an idea, so it requires alot of **optimaizations**, like reducing the number of renders.

2. Add **more shops**.

3. Add **more options to the search**, like searching by a book isbn or name, instead of just searching by the Goodreads username. 

### Endpoints

There is an endpoint that lets you get the books prices from all stores by using the isbn. You can make a GET request to **/shops/prices?isbn=ISBN_NUM** for instance: https://goodreads-price-tracker.herokuapp.com//shops/prices?isbn=9781451673319.

### Demo

https://goodreads-price-tracker.herokuapp.com/

### Notes

Each book has many versions, each one with an isbn and/or isbn13, and sometimes the stores does not have all those versions. Goodreads usually has many versions of the same book, because of that, to get some reasonable results, it is important to add the right version to the Goodreads.

**In order to get better results I recommend you to run this locally** because the Heroku has a timeout after 30 seconds without a response, which most of the cases is not enough.
