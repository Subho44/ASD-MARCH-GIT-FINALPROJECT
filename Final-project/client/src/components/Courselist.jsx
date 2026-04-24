import CourseCard from "./Coursecard";

const CourseList = ({ courses, onDelete }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {courses.map((course) => (
        <CourseCard
          key={course._id}
          course={course}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CourseList;