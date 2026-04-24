import React, { useEffect, useState } from "react";
import API from "../api/courseApi";
import CourseForm from "../components/Courseform";
import { useNavigate, useParams } from "react-router-dom";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    price: "",
    duration: "",
    category: "",
    description: "",
  });

  const getSingleCourse = async () => {
    try {
      const res = await API.get(`/${id}`);
      setFormData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleCourse();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/${id}`, formData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Edit Course</h2>
      <CourseForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        btnText="Update Course"
      />
    </div>
  );
};

export default EditCourse;