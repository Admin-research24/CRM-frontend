import { ChevronRight, ChevronLeft } from 'lucide-react';
import { ITEM_PER_PAGE } from '../../constant';

interface PaginationProps {
  page: number;
  totalProducts: number;
  handlePage: (page: number) => void;
}

export default function Pagination({
  page,
  handlePage,
  totalProducts,
}: PaginationProps) {
  const totalPage = Math.ceil(totalProducts / ITEM_PER_PAGE);

  // Function to create an array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers: number[] = [];
    const delta = 2; // Number of page numbers to show around the current page

    for (let i = 1; i <= totalPage; i++) {
      if (i <= delta + 1 || i >= totalPage - delta || (i >= page - delta && i <= page + delta)) {
        pageNumbers.push(i);
      }
    }

    // Add ellipsis if needed
    if (pageNumbers[0] > 1) {
      pageNumbers.unshift(-1); // -1 represents the ellipsis
    }
    if (pageNumbers[pageNumbers.length - 1] < totalPage) {
      pageNumbers.push(-2); // -2 represents the ellipsis
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-between border-t border-gray-200 my-3 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          type="button"
          onClick={() => handlePage(page > 1 ? page - 1 : page)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => handlePage(page < totalPage ? page + 1 : page)}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">
              {(page - 1) * ITEM_PER_PAGE + 1}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {page * ITEM_PER_PAGE < totalProducts
                ? page * ITEM_PER_PAGE
                : totalProducts}
            </span>{' '}
            of <span className="font-medium">{totalProducts}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              type="button"
              onClick={() => handlePage(page > 1 ? page - 1 : page)}
              className="cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            {pageNumbers.map((number, index) =>
              number === -1 ? (
                <span
                  key={index}
                  className="relative cursor-pointer inline-flex items-center border border-border px-4 py-2 text-sm font-semibold text-gray-400"
                >
                  ...
                </span>
              ) : number === -2 ? (
                <span
                  key={index}
                  className="relative cursor-pointer inline-flex items-center border border-border px-4 py-2 text-sm font-semibold text-gray-400"
                >
                  ...
                </span>
              ) : (
                <button
                  type="button"
                  key={number}
                  onClick={() => handlePage(number)}
                  aria-current={number === page ? "page" : undefined}
                  className={`relative cursor-pointer z-10 border border-border inline-flex items-center ${
                    number === page ? 'bg-primary text-white' : 'text-gray-400'
                  } px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {number}
                </button>
              )
            )}
            <button
              type="button"
              onClick={() => handlePage(page < totalPage ? page + 1 : page)}
              className="cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
