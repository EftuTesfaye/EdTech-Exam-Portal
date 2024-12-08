import { useState } from "react";

export type Props = {
  pageSize: number;
  totalItems: number;
  activePage: number;
  onPageChange: (n: number) => void;
};

export default function CustomPagination({
  pageSize,
  totalItems,
  onPageChange,
  activePage = 0,
}: Props) {
  const pageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalItems / pageSize); i++) {
      pages.push(i);
    }
    return pages;
  };

  const [activeNum, setActiveNum] = useState(activePage > 0 ? activePage : 1);

  return (
    <div className="flex justify-center mt-4">
      <ul className="flex space-x-2">
        {pageNumbers().map((num) => (
          <li
            key={num}
            onClick={() => {
              setActiveNum(num);
              onPageChange(num);
            }}
            className={`cursor-pointer px-3 py-2 rounded-md transition-colors duration-200 ease-in-out ${
              activeNum === num
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {num}
          </li>
        ))}
      </ul>
    </div>
  );
}
