import { ChevronRight, Edit, Trash } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../common/Button";
import React from "react";
import { Course } from "../../pages/admin/Courses";

interface CourseCardProps {
  item: Course;
  cohortId: number;
   setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
   setSelectedCourse: React.Dispatch<React.SetStateAction<Course | null>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CourseCard({
  item,
  setShowForm,
  setIsEdit,
  setSelectedCourse,
}: CourseCardProps) {
  const { cohortId } = useParams();

  if (!cohortId) {
    return;
  }

  const navigate = useNavigate();

  return (
    <div className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition bg-white">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="md:text-lg font-semibold">{item.title}</h3>

          <p className="text-sm md:text-sm text-gray-600 mt-1 line-clamp-2">
            {item.description}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-gray-50  rounded-3xl p-2">
          <Edit
            onClick={() => {
              setShowForm(true);
              setIsEdit(true);
              setSelectedCourse(item)
            }}
            className="w-4 h-4 cursor-pointer text-green-500"
          />
          <Trash className="w-4 h-4 cursor-pointer text-red-600" />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/admin/courses/${item.id}/modules`)}
          className="p-2 flex items-center"
        >
          Manage Modules
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
