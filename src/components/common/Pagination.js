import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';
const Pagination = ({
    totalPages,
    currentPage,
    onPageChange,
    pageRangeDisplayed = 5,
}) => {
    if (totalPages === 0) return null; 

    const pageNumbers = [];
    const halfRange = Math.floor(pageRangeDisplayed / 2);
    let startPage = currentPage - halfRange;
    let endPage = currentPage + halfRange;

    if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(totalPages, pageRangeDisplayed);
    }
    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, totalPages - pageRangeDisplayed + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination">
            <button
                className="page-num"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                이전
            </button>
            {startPage > 1 && (
                <>
                    <button className="page-num" onClick={() => onPageChange(1)}>
                        1
                    </button>
                    {startPage > 2 && <span className="ellipsis">...</span>}
                </>
            )}
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    className={`page-num ${currentPage === number ? 'active' : ''}`}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </button>
            ))}
            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="ellipsis">...</span>}
                    <button className="page-num" onClick={() => onPageChange(totalPages)}>
                        {totalPages}
                    </button>
                </>
            )}
            <button
                className="page-num"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                다음
            </button>
        </div>
    );
};

Pagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    pageRangeDisplayed: PropTypes.number,
};

export default Pagination;
