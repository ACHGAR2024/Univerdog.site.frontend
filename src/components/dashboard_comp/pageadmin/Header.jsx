import { useContext } from 'react';
import PropTypes from 'prop-types'; 
import { AuthContext } from '../../../context/AuthContext';
import { UserContext } from '../../../context/UserContext';
import DarkModeToggle from '../../DarkModeToggle';
import { useNavigate } from 'react-router-dom'; 

const HeaderAdmin = ({ toggleSidebar }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate(); 
  const handleLogout = () => {
    logout();
    navigate('/'); 
  }
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
          onClick={() => handleLogout()} 
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
  toggleSidebar: PropTypes.func.isRequired, 
};

export default HeaderAdmin;