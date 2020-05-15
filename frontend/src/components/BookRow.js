import React from "react";
import BookStand from "./BookStand";
import "../styles/BookRow.css";
import PencilImage from "../images/pencil.png";
import BookImage from "../images/book.png";
import StarImage from "../images/star.png";
import Loading from "../images/loading2.gif";

const storeNames = new Map([
  ["bertrand", "Bertrand"],
  ["bookDepository", "Book Depository"],
  ["wook", "Wook"],
  ["fnac", "Fnac"]
]);

const BookRow = function BookRow({ book }) {

  const { id, title, author, numPages, avgRating, prices, imageUrl, link } = book;

  const min = Math.min.apply(null, Object.values(prices).filter(({ value, _ }) => value !== null && parseInt(value)).map((price) => price.value));

  return <tr>
    <td><BookStand img={imageUrl} link={link}/></td>
    <td>
      <p>{title}</p>
      <div className={"bookDetails"}>
        <div className={"bookAuthor"}>
          <img className="bookStandIcon" src={PencilImage} alt={"pencil"}/>
          <p>{author}</p>
        </div>
        {numPages && <div className={"bookPages"}>
          <img className="bookStandIcon" src={BookImage} alt={"book"}/>
          <p>{numPages}</p>
        </div>}
        <div className={"bookRating"}>
          <img className="bookStandIcon" src={StarImage} alt={"start"}/>
          <p>{avgRating}</p>
        </div>
      </div>
    </td>
    <td>{Object.keys(prices).map((store, index) => <div key={index} className={"storeNameWrapper"}>
      <div className="storeName">{storeNames.get(store)}</div>
    </div>)}</td>
    <td style={{ minWidth: "42px" }}>{Object.values(prices).map(({ value, uri }, index) => {
      return <div key={index} className="storePrice">{
        value === null
          ? <img alt={"loading"} src={Loading} className={"bookPriceLoading"}/>
          : typeof value === "string"
          ? <p>{value}</p>
          : <a target="_blank" href={uri} className={min === value ? "min" : "normal"}>
            <p>{value}</p>
          </a>
      }
      </div>;
    })}
    </td>
    <td>{Object.values(prices).map(({ value, uri }, index) => {
      return <div key={index} className="storePrice euroSymbol">
        {value !== null
        && value !== "N/A"
        && <p className={min.value === value ? "min" : "normal"}>€</p>}
      </div>;
    })}
    </td>
  </tr>;
};

export default BookRow;
