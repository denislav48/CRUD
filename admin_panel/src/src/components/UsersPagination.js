import React, { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import "./UsersPagination.css";
function UsersPagination(props) {
  //const [pages, setPages] = useState(1);
  

  let active = props.page;

//   if(props.pages !== pages) {
//  setPages(props.pages);
//   }
  let items = [];
  // if(props.page > pages) {
  //   props.change(active-1);
  // }
  
  for (let number = 1; number <= props.pages; number++) {
    items.push(
      <Pagination.Item
        onClick={() => {props.change(number)}}
        key={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="paginationPosition">
      <Pagination>{items}</Pagination>
    </div>
  );
}

export default UsersPagination;
