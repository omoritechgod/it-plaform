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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-white/5 hover:bg-white/5 transition"
    >
      {/* User Info */}
      <td className="px-6 py-4">
        <div className="font-semibold">{data.name}</div>
        <div className="text-xs text-white/50">{data.email}</div>
      </td>

      {/* Skills */}
      <td className="px-6 py-4">
        <div className="max-w-48 flex flex-wrap gap-1">
          {normalizeSkills(data.skills).length > 0 ? (
            normalizeSkills(data.skills).map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-xs rounded bg-white/10 text-white/80"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-xs text-white/40 italic">
              No skills added
            </span>
          )}
        </div>
      </td>

      {/* Status + Actions */}
      <td className="px-6 flex flex-col-reverse py-4">
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 text-xs rounded-full capitalize font-medium
              ${
                data.status === "approved"
                  ? "bg-emerald-500/15 text-emerald-400"
                  : data.status === "pending"
                  ? "bg-yellow-500/15 text-yellow-400"
                  : "bg-red-500/15 text-red-400"
              }
            `}
          >
            {data.status}
          </span>

          {/* Actions (only if pending) */}
          {data.status === "pending" && (
            <div className="flex gap-1">
              <button
                onClick={handleApprove}
                className="p-1.5 rounded-full bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition"
                title="Approve"
              >
                <Check size={14} />
              </button>

              <button
                onClick={handleReject}
                className="p-1.5 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                title="Reject"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      </td>

      {/* Meta */}
      <td className="px-6 py-4">
        <div className="flex flex-col gap-1 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Joined {new Date(data.createdAt).toLocaleDateString()}
          </div>

          <div
            className={`flex items-center gap-2 ${
              data.emailVerifiedAt ? "text-emerald-400" : "text-white/40"
            }`}
          >
            <Wallet className="w-4 h-4" />
            {data.emailVerifiedAt ? "Email Verified" : "Email Not Verified"}
          </div>
        </div>
      </td>
    </motion.tr>
  );
}
