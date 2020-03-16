
<h1 align="center">
  Goodreads Price Tracker - Frontend
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
  <a href="#DEMO">Demo</a> •
  <a href="#Inspiration">Inspiration</a>
</p>

### Description

A client that consumes the API described on [this](https://github.com/soltex1/goodreads-price-tracker-backend) respository. Basically, the main point here, more than creating a user interce, was getting used with React Hooks, specially useEffect, and [socket.io](https://socket.io/) events.

### How It Works

1. Make a request to the server introducing the Goodreads username in the search bar.

2. After receive the data, send an event to the server saying 'Already got the books, I am ready to receive the prices'. That event is called *getPrices*.

3. For each price event received, update the book's list.

### How To Use

1. `git clone`

2. `npm install`



### Demo

https://cryptic-waters-92928.herokuapp.com/

### Inspiration

The design was inspired by Ayoub kada's work on [Behance](https://dribbble.com/shots/7173758-CaseMe-Landing-Page).

##### Components

Although almost the design was inspirated by the author referenced above, some components design were created from scratch:

<p align="center">
  <img src="https://i.imgur.com/XDRkEdn.png">
</p>


