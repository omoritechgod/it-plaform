import { Calendar, Wallet, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { Intern } from "../types";

export default function InternProgressCard({
  data,
  index,
}: {
  data: Intern;
  index: number;
}) {
  const total = 6; // example total modules
  const completed = data.progress_summary.completed_modules;
  const progress = (completed / total) * 100;
  return (
    <motion.tr
      key={data.user.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-white/5 hover:bg-white/5 transition"
    >
      {/* Intern */}
      <td className="px-6 py-4">
        <div className="font-semibold">{data.user.name}</div>
        <div className="text-xs text-white/50">{data.user.email}</div>
      </td>

      {/* Cohort */}
      <td className="px-6 py-4 text-white/70 flex items-center gap-2">
        <Layers className="w-4 h-4 text-sky-400" />
        {data.cohort.name}
      </td>

      {/* Stage */}
      <td className="px-6 py-4">
        <span className="px-3 py-1 text-xs rounded-full bg-sky-500/15 text-sky-300 capitalize">
          {data.current_stage}
        </span>
      </td>

      {/* Skills */}
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-1">
          {data.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 text-xs rounded bg-white/10 text-white/80"
            >
              {skill}
            </span>
          ))}
        </div>
      </td>

      {/* Progress */}
      <td className="px-6 py-4 min-w-[160px]">
        <div className="flex justify-between text-xs mb-1 text-white/60">
          <span>
            {completed}/{total}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full bg-emerald-400"
          />
        </div>
        <p className="mt-1 text-[11px] italic text-white/40">
          {data.progress_summary.notes}
        </p>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <div className="flex flex-col gap-1 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Agreement
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <Wallet className="w-4 h-4" />
            Wallet Active
          </div>
        </div>
      </td>
    </motion.tr>
  );
}
