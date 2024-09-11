import { useContext } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { AuthContext } from '../../../context/AuthContext';
import { UserContext } from '../../../context/UserContext';
import DarkModeToggle from '../../DarkModeToggle';

const HeaderAdmin = ({ toggleSidebar }) => {
  const { logout } = useContext(AuthContext);
const { user } = useContext(UserContext);
  return (
    <header className="bg-white shadow-sm dark:bg-slate-500 dark:text-white flex justify-between items-center p-4">
      <button
        onClick={toggleSidebar}
        className="text-gray-600 dark:text-white focus:outline-none"
      >
        <i className="fas fa-bars"></i>
      </button>

      <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
        Dashboard Admin
      </h1>

      <div className="flex items-center">
        <DarkModeToggle />

        <div className="ml-4">
          <img
            src={
              user?.image
                ? `http://127.0.0.1:8000${user.image}`
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profil"
            className="w-8 h-8 rounded-full"
          />
        </div>

        <button
          onClick={() => logout()}
          className="ml-4 text-gray-600 hover:text-red-500 dark:hover:text-red-400 focus:outline-none"
        >
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </header>
  );
};

// Define prop types for validation
HeaderAdmin.propTypes = {
  toggleSidebar: PropTypes.func.isRequired, // Ensure toggleSidebar is a function
  // If you decide to keep isSidebarOpen, uncomment the line below and use it within the component
  // isSidebarOpen: PropTypes.bool.isRequired,
};

export default HeaderAdmin;
