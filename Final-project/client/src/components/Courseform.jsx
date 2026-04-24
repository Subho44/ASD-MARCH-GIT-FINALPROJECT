const CourseForm = ({
  formData,
  handleChange,
  handleSubmit,
  handelFile,
  btnText,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-card space-y-4"
    >
      <h2 className="text-2xl font-bold text-primary text-center">
        {btnText}
      </h2>

      {[
        { name: "title", placeholder: "Course Title" },
        { name: "instructor", placeholder: "Instructor Name" },
        { name: "price", placeholder: "Price", type: "number" },
        { name: "duration", placeholder: "Duration" },
        { name: "category", placeholder: "Category" },
      ].map((field) => (
        <input
          key={field.name}
          type={field.type || "text"}
          name={field.name}
          placeholder={field.placeholder}
          value={formData[field.name]}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-primary"
          required
        />
      ))}

      <textarea
        name="description"
        placeholder="Course Description"
        value={formData.description}
        onChange={handleChange}
        rows="4"
        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-primary"
        required
      ></textarea>

      <input
        type="file"
        multiple
        onChange={handelFile}
        className="w-full border p-3 rounded-lg"
      />

      <button className="w-full bg-white text-black py-3 rounded-lg hover:bg-blue-700 transition">
        {btnText}
      </button>
    </form>
  );
};

export default CourseForm;