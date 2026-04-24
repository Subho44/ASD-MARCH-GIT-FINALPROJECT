import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseForm from "../components/Courseform";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaArrowLeft, FaBookOpen } from "react-icons/fa";

const AddCourse = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    price: "",
    duration: "",
    category: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);

 

  // Handle text input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file upload + preview
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.instructor || !formData.price) {
      toast.error("Please fill required fields!");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const data = new FormData();

      // append text fields
      Object.keys(formData).forEach((key) =>
        data.append(key, formData[key])
      );

      // append images
      images.forEach((img) => data.append("images", img));

      await axios.post(
        "http://localhost:5500/api/courses",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token, // 🔐 send token
          },
        }
      );

      toast.success("Course added successfully!");

      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add course!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-10 px-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 font-medium"
        >
          <FaArrowLeft /> Back to Home
        </Link>

        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 mb-6 shadow-lg text-center">
          <FaBookOpen className="text-4xl mx-auto mb-3" />
          <h2 className="text-3xl font-bold">Add New Course</h2>
          <p className="text-sm opacity-90 mt-2">
            Create and publish a new course
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <CourseForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handelFile={handleFileChange}
            btnText={loading ? "Adding..." : "Add Course"}
          />

          {/* Preview */}
          {previewImages.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">
                Image Preview
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {previewImages.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    className="w-full h-32 object-cover rounded-lg border shadow"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Loader */}
          {loading && (
            <div className="flex justify-center mt-6">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCourse;