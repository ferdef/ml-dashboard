// frontend/src/components/Navbar.tsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-blue-600">
            ML Dashboard
          </Link>

          <div className="flex space-x-4">
            <Link to="/" className="px-3 py-2 hover:text-blue-600">
              Dashboard
            </Link>
            <Link to="/models" className="px-3 py-2 hover:text-blue-600">
              Models
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;