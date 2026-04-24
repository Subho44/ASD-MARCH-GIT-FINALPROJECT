import { Link } from "react-router-dom";
import { useState } from "react";

const CourseCard = ({ course, onDelete }) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden border group">

      {/* Image */}
      <div className="relative">
        <img
          src={`http://localhost:5500/uploads/${course.images?.[activeImage]}`}
          className="w-full h-52 object-cover group-hover:scale-105 transition"
        />

        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
          ₹{course.price}
        </span>
      </div>

      {/* Thumbnails */}
      {course.images?.length > 1 && (
        <div className="flex gap-2 p-3 overflow-x-auto">
          {course.images.map((img, i) => (
            <img
              key={i}
              src={`http://localhost:5500/uploads/${img}`}
              onMouseEnter={() => setActiveImage(i)}
              className={`w-14 h-14 rounded-md object-cover cursor-pointer border 
              ${activeImage === i ? "border-blue-600" : "border-gray-300"}`}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <h2 className="font-bold text-lg text-gray-800 line-clamp-1">
          {course.title}
        </h2>

        <p className="text-sm text-gray-500">👨‍🏫 {course.instructor}</p>
        <p className="text-sm text-gray-500 mb-2">⏱ {course.duration}</p>

        <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
          {course.category}
        </span>

        <div className="flex gap-2 mt-4">
          <Link
            to={`/course/${course._id}`}
            className="flex-1 text-center bg-green-600 text-white py-2 rounded-lg"
          >
            View
          </Link>

          <button
            onClick={() => onDelete(course._id)}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;