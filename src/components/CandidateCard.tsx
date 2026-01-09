import { Calendar, Wallet, Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { Candidate } from "../types";

export default function InternProgressCard({
  data,
  index,
}: {
  data: Candidate;
  index: number;
}) {
  const normalizeSkills = (skills: string | string[] | null): string[] => {
    if (!skills) return [];
    if (Array.isArray(skills)) return skills;

    try {
      return JSON.parse(skills);
    } catch {
      return [];
    }
  };

  // 🔁 handlers (plug into mutation later)
  const handleApprove = () => {
    console.log("Approve user", data.id);
  };

  const handleReject = () => {
    console.log("Reject user", data.id);
  };

  return (
    <motion.tr
      key={data.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, ease: "easeOut" }}
      className="
    group bg-white
    hover:bg-blue-50/40
    transition-all duration-300
    border-b border-gray-100
  "
    >
      {/* User */}
      <td className="px-6 py-5">
        <div className="flex flex-col">
          <span className="font-medium text-black leading-tight">
            {data.name}
          </span>
          <span className="text-xs text-gray-500">{data.email}</span>
        </div>
      </td>

      {/* Skills */}
      <td className="px-6 py-5">
        <div className="flex flex-wrap gap-1.5 max-w-56">
          {normalizeSkills(data.skills).length > 0 ? (
            normalizeSkills(data.skills).map((skill) => (
              <span
                key={skill}
                className="
              rounded-full px-2.5 py-1
              text-[11px] font-medium
              bg-blue-100 text-blue/70
              ring-1 ring-blue/10
            "
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-xs italic text-gray-400">
              No skills added
            </span>
          )}
        </div>
      </td>

      {/* Status + Actions */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
          ${
            data.status === "approved"
              ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-600/20"
              : data.status === "pending"
              ? "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-600/20"
              : "bg-red-100 text-red-700 ring-1 ring-red-600/20"
          }
        `}
          >
            {data.status}
          </span>

          {/* Actions */}
          {data.status === "pending" && (
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={handleApprove}
                className="
              p-1.5 rounded-full
              bg-emerald-600/10 text-emerald-700
              hover:bg-emerald-600 hover:text-white
              transition shadow-sm
            "
                title="Approve"
              >
                <Check size={14} />
              </button>

              <button
                onClick={handleReject}
                className="
              p-1.5 rounded-full
              bg-red-600/10 text-red-700
              hover:bg-red-600 hover:text-white
              transition shadow-sm
            "
                title="Reject"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      </td>

      {/* Meta */}
      <td className="px-6 py-5">
        <div className="flex flex-col gap-1 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue/70" />
            Joined {new Date(data.createdAt).toLocaleDateString()}
          </div>

          <div
            className={`flex items-center gap-2 font-medium
          ${data.emailVerifiedAt ? "text-emerald-700" : "text-gray-400"}
        `}
          >
            <Wallet className="w-4 h-4" />
            {data.emailVerifiedAt ? "Email Verified" : "Email Not Verified"}
          </div>
        </div>
      </td>
    </motion.tr>
  );
}
