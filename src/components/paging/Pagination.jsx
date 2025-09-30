import React from 'react';
import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
    const handlePrevPage = () => {
        onPageChange(prevPage => Math.max(prevPage - 1, 0));
    };

    const handleNextPage = () => {
        onPageChange(prevPage => Math.min(prevPage + 1, totalPages - 1));
    };

    const pageNumbers = [];
    for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination-container">
            <button onClick={handlePrevPage} disabled={currentPage === 0}>
                이전
            </button>
            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={currentPage === number ? 'active' : ''}
                >
                    {number + 1}
                </button>
            ))}
            <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
                다음
            </button>
        </div>
    );
}

export default Pagination;