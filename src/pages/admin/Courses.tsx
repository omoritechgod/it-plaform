import { Link, useParams } from "react-router-dom";
import { Button } from "../../components/common/Button";
import CourseCard from "../../components/admin/CourseCard";
import React, { Dispatch, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export interface Course {
  id: number;
  title: string;
  description: string;
  cohortId: number;
}

const courseSchema = z.object({
  
})

const Courses = () => {
  const [showForm, setShowform] = useState<boolean>(false);
  const [isEdit, setIsEditing] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const { cohortId } = useParams();

  if (!cohortId) {
    return;
  }
  const mockCourses = [
    {
      id: 1,
      title: "React Fundamentals",
      description: "Learn the basics of React",
      cohortId: 12,
    },
    {
      id: 2,
      title: "TypeScript Essentials",
      description: "Understand TypeScript in real projects",
      cohortId: 12,
    },

    // 🔹 Courses for Cohort 20
    {
      id: 3,
      title: "UI/UX Basics",
      description: "Introduction to user interface and user experience design",
      cohortId: 20,
    },
    {
      id: 4,
      title: "JavaScript Advanced",
      description: "Deep dive into JS concepts and async programming",
      cohortId: 20,
    },

    // 🔹 Courses for Cohort 30
    {
      id: 5,
      title: "Backend Fundamentals",
      description: "Learn how APIs and servers work",
      cohortId: 30,
    },
    {
      id: 6,
      title: "Database Design",
      description: "Understanding SQL and relational data models",
      cohortId: 30,
    },

    // 🔹 Courses for Cohort 45
    {
      id: 7,
      title: "Python for Beginners",
      description: "Learn Python from scratch",
      cohortId: 45,
    },
  ];

  const filteredCourses = mockCourses.filter(
    (id) => id.cohortId === Number(cohortId),
  );

  return (
    <div className="mt-28">
      {showForm && (
        <CourseForm
          isEdit={isEdit}
          selectedCourse={selectedCourse}
          setShowForm={setShowform}
        />
      )}
      <div className=" flex justify-between items-center">
        <div className="flex gap-1 items-center text-lg capitalize">
          <Link className="underline" to="/admin/cohorts">
            cohorts
          </Link>
          /
          <Link
            className="underline font-bold"
            to={`cohort/${cohortId}/courses`}
          >
            Courses
          </Link>
        </div>
        <Button
          onClick={() => {
            setShowform(true);
          }}
          variant="primary"
        >
          Add Course
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-10">
        {filteredCourses.map((item, _index) => (
          <CourseCard
            setIsEdit={setIsEditing}
            setSelectedCourse={setSelectedCourse}
            setShowForm={setShowform}
            cohortId={item.cohortId}
            item={item}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};

const CourseForm = ({
  setShowForm,
  isEdit,
  selectedCourse,
}: {
  setShowForm: Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  selectedCourse: Course | null;
}) => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    // resolver: zodResolver
  });
  return (
    <div className="w-full h-screen bg-black/70 z-50 fixed left-0 bottom-0">
      <div className="border mx-auto max-w-xl h-[500px] mt-20 bg-white p-4 overflow-y-auto rounded-xl">
        <form className="space-y-4">
          <h2 className="text-lg font-semibold">Create Course</h2>

          <select className="w-full border p-2 rounded">
            <option value={12}>Frontend Cohort</option>
            <option value={20}>UI/UX Cohort</option>
            <option value={30}>Backend Cohort</option>
          </select>

          <input
            placeholder="Course Title"
            className="w-full border p-2 rounded"
          />

          <input
            placeholder="Course Slug"
            className="w-full border p-2 rounded"
          />

          <textarea
            placeholder="Course Description"
            className="w-full border p-2 rounded"
          />

          <input
            placeholder="Skill Tag"
            className="w-full border p-2 rounded"
          />

          <select className="w-full border p-2 rounded">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <input
            type="number"
            placeholder="Order"
            className="w-full border p-2 rounded"
          />

          <select className="w-full border p-2 rounded">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <div>
            <Button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:opacity-80"
            >
              Save Course
            </Button>
            <Button
              onClick={() => setShowForm(false)}
              variant="danger"
              type="button"
              className="w-full mt-2 bg-black text-white py-2 rounded-lg hover:opacity-80"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Courses;
