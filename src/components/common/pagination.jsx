import React from "react";
import _ from "lodash";

const Pagination = ({ pageSize, totalItemNum, onPageChange, currentPage }) => {
  const pageNum = Math.ceil(totalItemNum / pageSize);
  if (pageNum === 0) return null;
  const pages = _.range(1, pageNum + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={currentPage === page ? "page-item active" : "page-item"}
          >
            <a
              href="#"
              className="page-link"
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
