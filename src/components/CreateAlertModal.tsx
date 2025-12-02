import { X } from 'lucide-react';
import { useState } from 'react';
import { SystemAlert } from '../types';

interface CreateAlertModalProps {
  isOpen: boolean;
  armId: string;
  onClose: () => void;
  onCreate: (alert: Omit<SystemAlert, 'id' | 'created_at'>) => void;
}

export function CreateAlertModal({ isOpen, armId, onClose, onCreate }: CreateAlertModalProps) {
  const [formData, setFormData] = useState({
    severity: 'warning' as const,
    category: 'software' as const,
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      arm_id: armId,
      ...formData,
      acknowledged: false,
      resolved: false
    });
    setFormData({
      severity: 'warning',
      category: 'software',
      message: ''
    });
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] sm:w-full max-w-md bg-white rounded-lg shadow-2xl z-50 max-h-[90vh] overflow-y-auto">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">Create New Alert</h2>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-4 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
              Severity
            </label>
            <select
              value={formData.severity}
              onChange={(e) => setFormData({ ...formData, severity: e.target.value as any })}
              className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <option value="mechanical">Mechanical</option>
              <option value="electrical">Electrical</option>
              <option value="software">Software</option>
              <option value="network">Network</option>
            </select>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
              Message
            </label>
            <textarea
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 h-20 sm:h-24 resize-none"
              placeholder="Describe the alert..."
            />
          </div>

          <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
            >
              Create Alert
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
