import { Link, useParams } from "react-router-dom";
import { ROUTES } from "../../config/constants";
import { Button } from "../../components/common/Button";
import adminService from "../../services/admin.service";
import { useQuery } from "@tanstack/react-query";
import ErrorComponent from "../../components/ErrorComponent";
import { File, Loader2 } from "lucide-react";
import { useState } from "react";
import EditModuleModal from "../../components/admin/ModuleModal";
import Overview from "../../components/admin/module-sub/Overview";
import LessonModal from "../../components/admin/Lesson";
import QuestionsManagement from "../../components/admin/module-sub/QuestionsManagement";
import CreateTestTemplate from "../../components/admin/module-sub/CreateTestTemplate";

const SubModule = () => {
  const { moduleSlug } = useParams();
  const [count, setCount] = useState<number>(1);
  const [edit, setEdit] = useState<boolean>(false);

  if (!moduleSlug) {
    return;
  }

  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["shedule", moduleSlug],
    queryFn: async () => {
      const [module, question, test, lessons] = await Promise.all([
        adminService.getOneTrainingModule(moduleSlug),
        adminService.getOneQuestionModule(moduleSlug),
        adminService.getOneTestModule(moduleSlug),
        adminService.getLessonModule(),
      ]);
      console.log([module, question, test, lessons]);

      return [module, question, test, lessons];
    },
    enabled: !!moduleSlug,
  });

  if (isLoading) {
    return (
      <div className="fixed w-full z-50 backdrop-blur bg-black/70 flex justify-center items-center h-full left-0 bottom-0">
        <div className="w-96 h-48 bg-blue rounded-lg shadow-lg flex flex-col justify-center items-center p-4">
          <Loader2 className="animate-spin w-10 h-10 text-blue-700 mb-4" />
          <p className="text-blue-600 text-lg">Loading</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return <ErrorComponent error={error.message} refetch={refetch} />;
  }

  const module = data[0];
  const questions = data[1];
  const _testTemplate = data[2];
  const lessons = data[3];

  return (
    <div className="max-w-7xl mx-auto mt-28">
      {/* header link */}
      <div className="flex justify-between items-center">
        <div className="text-lg hover:underline md:text-3xl flex gap-1 items-center">
          <Link to={ROUTES.ADMIN_MODULE}>Modules</Link>/
          <p className="font-bold capitalize">{module.data.slug}</p>
        </div>
        <Button
          onClick={() => setEdit(true)}
          className="bg-dark_blue text-sm md:text-base "
        >
          Edit Module
        </Button>
      </div>
      <div className="w-full mt-10 border border-gray-100 bg-[#fff] shadow-md rounded-md px-2 md:px-4 pt-4">
        <div className="flex gap-1 items-start p-4">
          <File className="w-24 h-24 text-blue" />
          <div className="flex flex-col gap-3">
            <h1 className="capitalize text-xl md:text-2xl">
              {module.data.title}
              <span className="ml-2 bg-gray-100 rounded-md text-blue text-xs p-1.5">
                {module.data.skill_tag}
              </span>
            </h1>
            <p className="text-gray-400">{module.data.description}</p>
            <div className="flex items-center flex-wrap  capitalize gap-3">
              <p>
                <span className="mr-2 rounded-md font-bold bg-gray-100 text-blue  p-1.5">
                  level
                </span>
                <span>{module.data.level}</span>
              </p>
              <p>
                <span className="mr-2 rounded-md bg-gray-100 text-blue font-bold p-1.5">
                  status
                </span>
                <span
                  className={`${
                    module.data.status === "active"
                      ? "text-green-500"
                      : "text-red-700"
                  } `}
                >
                  {module.data.status}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-gray-50 p-0 py-3 md:p-3">
          <div className="flex items-center justify-start gap-2 md:gap-8">
            {btnText.map((item, index) => (
              <button
                onClick={() => setCount(() => index + 1)}
                className={`font-semibold relative text-xs md:text-base ease-in-out duration-500 ${
                  count === index + 1 ? "text-blue" : "text-gray-600"
                }`}
                key={index}
              >
                {item}
                <span
                  className={`w-full h-0.5 bg-blue rounded-full left-0 absolute top-7 md:top-9 ease-in-out duration-500 ${
                    count === index + 1 ? "opacity-100" : "opacity-0"
                  }`}
                ></span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {count === 1 && (
        <Overview module={module.data} questions={questions.data} />
      )}
      {count === 2 && (
        <LessonModal moduleId={module.data.id} lessons={lessons.data} refetch={refetch} />
      )}
      {count === 3 && <QuestionsManagement />}
      {count === 4 && (
        <div className="mt-6 flex items-center rounded-md shadow-md bg-white p-4 justify-center">
          <p>Coming Soon</p>
        </div>
      )}
      {count === 5 && <CreateTestTemplate />}

      {edit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setEdit(false)}
          ></div>

          {/* Modal */}
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <EditModuleModal
              module={module.data}
              onClose={() => setEdit(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const btnText = [
  "overview",
  "Lessons",
  "Questions",
  "Templates",
  "Skill Tests",
];
export default SubModule;
