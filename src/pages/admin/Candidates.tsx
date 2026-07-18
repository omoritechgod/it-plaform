import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Mail,
  Download,
  CheckCircle,
  XCircle,
  Eye,
  Users,
  Loader2,
} from "lucide-react";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { useQuery } from "@tanstack/react-query";
import adminService from "../../services/admin.service";
import { Candidate } from "../../types";
import ErrorComponent from "../../components/ErrorComponent";
import InternProgressCard from "../../components/CandidateCard";

type Active = "all" | "active" | "rejected" | "pending";
export const Candidates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStage, setSelectedStage] = useState("all");
  const [selectedCandidates, _setSelectedCandidates] = useState<string[]>([]);
  const [showBulkEmailModal, setShowBulkEmailModal] = useState(false);
  const [filterByActive, setFilterByActive] = useState<Active>("all");

  const {
    data: candidates,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["candidates"],
    queryFn: async () => {
      const res = await adminService.getCandidates();
      console.log("candidate", res);
      return res.data;
    },
    enabled: true,
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

  const stages = [
    { value: "all", label: "All Stages" },
    { value: "application", label: "Application" },
    { value: "agreement", label: "Agreement" },
    { value: "skill_test", label: "Skill Test" },
    { value: "interview", label: "Interview" },
    { value: "training", label: "Training" },
  ];

  const status = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "rejected", label: "Rejected" },
    { value: "pending", label: "Pending" },
  ];

  const filteredCandidates = candidates?.filter((candidate: Candidate) => {
    const matchesSearch =
      candidate?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate?.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterByActive === "all" || candidate.status === filterByActive;
    return matchesSearch && matchesStatus;
  });

  // const handleSelectAll = () => {
  //   if (selectedCandidates.length === filteredCandidates?.length) {
  //     setSelectedCandidates([]);
  //   } else {
  //     setSelectedCandidates(
  //       filteredCandidates?.map((c: Candidate) => String(c.id)) ?? []
  //     );
  //   }
  // };

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case "approved":
  //       return "text-green-600 bg-green-50";
  //     case "rejected":
  //       return "text-red-600 bg-red-50";
  //     default:
  //       return "text-yellow-600 bg-yellow-50";
  //   }
  // };

  // const getStageColor = (stage: string) => {
  //   switch (stage) {
  //     case "application":
  //       return "text-blue-600 bg-blue-50";
  //     case "agreement":
  //       return "text-purple-600 bg-purple-50";
  //     case "skill_test":
  //       return "text-orange-600 bg-orange-50";
  //     case "interview":
  //       return "text-green-600 bg-green-50";
  //     case "training":
  //       return "text-indigo-600 bg-indigo-50";
  //     default:
  //       return "text-gray-600 bg-gray-50";
  //   }
  // };

  const BulkEmailModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Send Bulk Email
        </h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipients: {selectedCandidates.length} candidates
            </label>
          </div>
          <Input label="Subject" placeholder="Email subject" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={5}
              placeholder="Email message"
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">
              Send Email
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowBulkEmailModal(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );

  return (
    <div className="space-y-8 mt-28">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Candidate Management
          </h1>
          <p className="text-gray-600 mt-2">
            Review and manage intern applications
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          {selectedCandidates.length > 0 && (
            <Button onClick={() => setShowBulkEmailModal(true)}>
              <Mail className="w-4 h-4 mr-2" />
              Bulk Email ({selectedCandidates.length})
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">
                {candidates?.length}
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  candidates?.filter((c: Candidate) => c.status === "pending")
                    .length
                }
              </p>
            </div>
            <Eye className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">
                {candidates?.filter((c) => c.status === "active").length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">
                {candidates?.filter((c) => c.status === "rejected").length}
              </p>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {stages.map((stage) => (
                <option key={stage.value} value={stage.value}>
                  {stage.label}
                </option>
              ))}
            </select>

            <select
              value={filterByActive}
              onChange={(e) => setFilterByActive(e.target.value as Active)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {status.map((stage) => (
                <option key={stage.value} value={stage.value}>
                  {stage.label}
                </option>
              ))}
            </select>

            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Candidates Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          {/* <input
            type="checkbox"
            checked={
              selectedCandidates.length === filteredCandidates?.length &&
              filteredCandidates.length > 0
            }
            onChange={handleSelectAll}
            className="rounded border-gray-300 text-blue-600"
          /> */}
          <table className="w-full rounded-md text-sm text-left text-white">
            {/* Header */}
            <thead className=" text-gray-600 border-b border-gray-100 ">
              <tr>
                {/* User */}
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Intern
                </th>

                {/* Skills */}
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Skills
                </th>

                {/* Status */}
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Status
                </th>

                {/* Meta */}
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Meta
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates?.map((data, index) => (
                <InternProgressCard
                  refetch={refetch}
                  data={data}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Bulk Email Modal */}
      {showBulkEmailModal && <BulkEmailModal />}
    </div>
  );
};
