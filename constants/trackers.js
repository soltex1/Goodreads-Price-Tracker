const BOOKDEPOSITORY_URI = `https://www.bookdepository.com/search?`
const WOOK_URI = `https://www.wook.pt/pesquisa/`
const FNAC_URI = `https://www.fnac.pt/SearchResult/ResultList.aspx?SCat=2%211&Search=`
const BERTRAND_URI = `https://www.bertrand.pt/pesquisa/`

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
  ['FNAC', {
    name: 'FNAC',
    uri: (isbn) => FNAC_URI + isbn,
    transform: require('../utils/trackers/fnac')
  }],
  ['BERTRAND', {
    name: 'BERTRAND',
    uri: (isbn) => BERTRAND_URI + isbn,
    transform: require('../utils/trackers/bertrand')
  }],
])

module.exports = {
  trackers
}
