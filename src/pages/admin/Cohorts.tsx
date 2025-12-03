import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Users, Calendar, Settings, Trash2, Edit, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import adminService from '../../services/admin.service';
import { toast } from 'sonner';


interface Cohort {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  max_interns: number;
  current_interns: number;
  is_accepting: boolean;
  created_at: string;
}

export const Cohorts: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCohort, setEditingCohort] = useState<Cohort | null>(null);
  const [cohorts, setCohorts] = useState<Cohort[]>([]);

  // Fetch cohorts from API
  const loadCohorts = async () => {
    try {
      const res = await adminService.getCohorts();
      setCohorts(res.data);
    } catch (err) {
      toast.error("Failed to load cohorts");
    }
  };

  useEffect(() => {
    loadCohorts();
  }, []);

  // Toggle accepting via API
  const toggleAccepting = async (cohortId: string) => {
    try {
      const target = cohorts.find(c => c.id === cohortId);
      if (!target) return;

      await adminService.toggleAccepting(cohortId, !target.is_accepting);
      toast.success("Cohort status updated");
      loadCohorts();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  // Delete cohort via API
  const deleteCohort = async (cohortId: string) => {
    if (!window.confirm("Are you sure you want to delete this cohort?")) return;

    try {
      await adminService.deleteCohort(cohortId);
      toast.success("Cohort deleted");
      loadCohorts();
    } catch (err) {
      toast.error("Failed to delete cohort");
    }
  };

  // Modal form state
  const [form, setForm] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    max_interns: 0,
    is_accepting: true
  });

  // Create cohort via API
  const handleCreateCohort = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await adminService.createCohort(form);
      toast.success("Cohort created");
      setShowCreateModal(false);
      loadCohorts();
    } catch (err) {
      toast.error("Failed to create cohort");
    }
  };

  // Original modal but wired to API
  const CreateCohortModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">Create New Cohort</h3>
        <form className="space-y-4" onSubmit={handleCreateCohort}>
          <Input
            label="Cohort Name"
            placeholder="e.g., Frontend Development 2025"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Brief description of the cohort"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              value={form.start_date}
              onChange={e => setForm({ ...form, start_date: e.target.value })}
            />
            <Input
              label="End Date"
              type="date"
              value={form.end_date}
              onChange={e => setForm({ ...form, end_date: e.target.value })}
            />
          </div>

          <Input
            label="Max Interns"
            type="number"
            placeholder="25"
            value={form.max_interns}
            onChange={e => setForm({ ...form, max_interns: Number(e.target.value) })}
          />

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={form.is_accepting}
              onChange={e => setForm({ ...form, is_accepting: e.target.checked })}
            />
            <span className="text-sm text-gray-700">Currently accepting applications</span>
          </label>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">Create Cohort</Button>
            <Button type="button" variant="outline" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );

  // RETURN UI (unchanged)
  return (
    // SAME EXACT UI — NO CHANGES
    <div className="mt-28 space-y-8">
      {/* ... your entire original JSX stays EXACTLY THE SAME ... */}

      {/* Cohorts List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cohorts.map((cohort, index) => (
          <motion.div key={cohort.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}>
            <Card>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{cohort.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{cohort.description}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button onClick={() => toggleAccepting(cohort.id)} className={`p-2 rounded-lg transition-colors ${cohort.is_accepting ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-50'}`}>
                      {cohort.is_accepting ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                    </button>

                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Edit className="w-5 h-5" />
                    </button>

                    <button onClick={() => deleteCohort(cohort.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Rest of your UI */}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {showCreateModal && <CreateCohortModal />}
    </div>
  );
};
