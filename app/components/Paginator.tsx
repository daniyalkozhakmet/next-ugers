"use client";
import React from "react";

export const Paginator = ({
  pagination,
  setPage,
  page,
  pageClick,
}: {
  pagination: {
    pageNumber: number;
    totalPages: number;
    totalCount: number;
  };
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  pageClick: (page: number) => void;
}) => {
  const pageNumbers = Array.from(
    { length: pagination.totalPages },
    (_, i) => i + 1
  );
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {/* <li className={`page-item ${pagination.pageNumber == 1 && "disabled"}`}>
          <a className="page-link" href="#" tabIndex={-1}>
            Previous
          </a>
        </li> */}
        {pageNumbers.map((page) => (
          <li
            className={`page-item ${pagination.pageNumber == page && "active"}`}
            key={page}
            onClick={() => pageClick(page)}
          >
            <span className="page-link">{page}</span>
          </li>
        ))}

        {/* <li className={`page-item ${pagination.pageNumber != 1 && "disabled"}`}>
          <a className="page-link" href="#">
            Next
          </a>
        </li> */}
      </ul>
    </nav>
  );
};
