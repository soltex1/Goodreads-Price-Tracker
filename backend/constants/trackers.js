const BOOKDEPOSITORY_URI = `https://www.bookdepository.com/search?`;
const BERTRAND_URI = `https://www.bertrand.pt/pesquisa/`;
const FNAC_URI = `https://www.fnac.pt/SearchResult/ResultList.aspx?SCat=2%211&Search=`;
const WOOK_URI = `https://www.wook.pt/pesquisa/`;

const trackers = new Map([
  ["BOOK_DEPOSITORY", {
    name: "bookDepository",
    uri: (isbn) => BOOKDEPOSITORY_URI + `searchIsbn=${isbn}`,
    transform: require("../utils/trackers/bookdepository")
  }],
  ["BERTRAND", {
    name: "bertrand",
    uri: (isbn) => BERTRAND_URI + isbn,
    transform: require("../utils/trackers/bertrand")
  }],
  ["FNAC", {
    name: "fnac",
    uri: (isbn) => FNAC_URI + isbn,
    transform: require("../utils/trackers/fnac")
  }],
  ["WOOK", {
    name: "wook",
    uri: (isbn) => WOOK_URI + isbn,
    transform: require("../utils/trackers/wook")
  }]
]);

module.exports = {
  trackers
};
