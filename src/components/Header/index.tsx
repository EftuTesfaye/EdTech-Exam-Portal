import { Link } from 'react-router-dom';
import DropdownUser from './DropdownUser';
import DarkModeSwitcher from './DarkModeSwitcher';

const Header = (props) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        {/* Left Side Navigation */}
        <nav className="flex space-x-6">
          <Link to="/welcome" className="flex items-center text-gray-700 dark:text-gray-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3l7 7-1 1-1-1V18H4V10L3 11l7-7z" />
            </svg>
            Home
          </Link>
          <Link to="/contents" className="flex items-center text-gray-700 dark:text-gray-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4h12v2H4V4zm0 4h12v2H4V8zm0 4h12v2H4v-2zm0 4h12v2H4v-2z" />
            </svg>
            Contents
          </Link>
          <Link to="/category" className="flex items-center text-gray-700 dark:text-gray-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3a7 7 0 100 14 7 7 0 000-14zm0 2a5 5 0 110 10 5 5 0 010-10z" />
            </svg>
            Categories
          </Link>
          <Link to="/settings" className="flex items-center text-gray-700 dark:text-gray-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3.5l-1 1H4v1h5l-1 1 1 1 1-1-1-1 1-1zM10 16.5l-1-1H4v-1h5l-1-1 1-1 1 1-1 1 1 1z" />
            </svg>
            Settings
          </Link>
        </nav>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <DarkModeSwitcher />
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;