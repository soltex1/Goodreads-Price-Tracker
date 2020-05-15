import React from "react";

import Loading from "./Loading";

function BooksLoadMore ({ loading, meta, handleLoadMore }) {

  const shouldRenderButton = meta && meta.currentPage < meta.numPages && !loading;

  return (
    <div className={"loadMore"}>
      {loading && <Loading/>}
      {shouldRenderButton && <button onClick={() => handleLoadMore()}>MORE</button>}
    </div>
  );
}

export default BooksLoadMore;
