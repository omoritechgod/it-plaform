import {
  BookA,
  LucideAlignHorizontalJustifyEnd,
  MessageCircleQuestion,
} from "lucide-react";
import { Lesson, Quest, Question, TrainingModule } from "../../../types";

interface Props {
  module: TrainingModule & {
    lessons: Lesson[];
    quests: Quest[];
  };
  questions: Question[];
}

const Overview = ({ module, questions }: Props) => {
  return (
    <div className="mt-10">
      <h1>Module Overview</h1>
      <div className="grid mt-6 md:grid-cols-4 gap-6">
        <div className="p-4 rounded-md border border-gray-100 bg-white shadow-xl">
          <h2>Module info</h2>
          <div className="flex mt-4 gap-2 flex-col">
            <p>
              <span className="text-gray-400 mr-2">Slug:</span>{" "}
              <span className="text-gray-400">{module.slug}</span>
            </p>
            <p>
              <span className="text-gray-400 mr-2">Skill Tag:</span>{" "}
              <span>{module.skill_tag}</span>
            </p>
            <p>
              <span className="text-gray-400 mr-2">Level:</span>{" "}
              <span>{module.level}</span>
            </p>
            <p>
              <span className="text-gray-400 mr-2">Status:</span>{" "}
              <span className="text-gray-400">{module.status}</span>
            </p>
          </div>
        </div>
        <div className="p-4 max-h-16 flex items-start gap-2 font-semibold rounded-md border border-gray-100 bg-white shadow-xl">
          <BookA className="w-8 text-blue h-8" />
          <div>
            <p>
              {module.lessons.length}{" "}
              {module.lessons.length > 1 ? "Lessons" : "Lesson"}
            </p>
            {/* <p className="flex flex-wrap font-normal text-xs text-gray-400 items-center">
              {module.lessons.map(({ title }: any, index: number) => (
                <p key={index}>{title},</p>
              ))}
            </p> */}
          </div>
        </div>
        <div className="flex max-h-16 gap-2 font-semibold  rounded-md border p-4 border-gray-100 bg-white shadow-xl items-start">
          <MessageCircleQuestion className="w-8 text-purple-700 h-8" />
          <div>
            <p>
              {questions.length}{" "}
              {questions.length > 1 ? "Questions" : "Question"}
            </p>
            <p className="flex flex-wrap font-normal text-xs text-gray-400 items-center">
              {questions.map(({ title }: any, index: number) => (
                <p key={index}>{title},</p>
              ))}
            </p>
          </div>
        </div>
        <div className="p-4 max-h-16 flex items-start gap-2 font-semibold rounded-md border border-gray-100 bg-white shadow-xl">
          <LucideAlignHorizontalJustifyEnd className="w-8 text-blue h-8" />
          <div>
            <p>
              {module.lessons.length}{" "}
              {module.lessons.length > 1 ? "Lessons" : "Lesson"}
            </p>
            {/* <p className="flex flex-wrap font-normal text-xs text-gray-400 items-center">
              {module.lessons.map(({ title }: any, index: number) => (
                <p key={index}>{title},</p>
              ))}
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
