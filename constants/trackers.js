const BOOKDEPOSITORY_URI = `https://www.bookdepository.com/search?`
const WOOK_URI = `https://www.wook.pt/pesquisa/`

const trackers = new Map([
  ['BOOK_DEPOSITORY', {
    name: 'BOOK_DEPOSITORY',
    uri: (isbn) => BOOKDEPOSITORY_URI + `searchIsbn=${isbn}`,
    transform: require('../utils/trackers/bookdepository')
  }],
  ['WOOK', {
    name: 'WOOK',
    uri: (isbn) => WOOK_URI + isbn,
    transform: require('../utils/trackers/wook')
  }],
])

module.exports = {
  trackers
}
