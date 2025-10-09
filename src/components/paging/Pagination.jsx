import React from 'react';
import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
    const handlePrevPage = () => {
        const newPage = Math.max(currentPage - 1, 1);
        onPageChange(newPage);
    };

    const handleNextPage = () => {
        const newPage = Math.min(currentPage + 1, totalPages);
        onPageChange(newPage);
    };

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination-container">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
                이전
            </button>
            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={currentPage === number ? 'active' : ''}
                >
                    {number}
                </button>
            ))}
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                다음
            </button>
        </div>
    );
}

export default Pagination;