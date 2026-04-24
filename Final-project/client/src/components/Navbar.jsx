import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-600 tracking-wide cursor-pointer"
        >
          E-Learning
        </h1>

        {/* Menu */}
        <div className="flex gap-6 items-center text-gray-700 font-medium">

          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
          <Link
              to="/add-course"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Course
            </Link>
       
        </div>
      </div>
    </div>
  );
};

export default Navbar;