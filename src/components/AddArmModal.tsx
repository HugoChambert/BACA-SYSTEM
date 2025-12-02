import { X } from 'lucide-react';
import { useState } from 'react';
import { RoboticArm } from '../types';

interface AddArmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (arm: Omit<RoboticArm, 'id' | 'created_at'>) => void;
}

export function AddArmModal({ isOpen, onClose, onAdd }: AddArmModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    serial_number: '',
    model: '',
    location: '',
    status: 'offline' as const
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      installed_at: new Date().toISOString(),
      last_maintenance: new Date().toISOString()
    });
    setFormData({
      name: '',
      serial_number: '',
      model: '',
      location: '',
      status: 'offline'
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
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">Add New Robotic Arm</h2>
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
              Arm Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
              placeholder="BACA-ARM-05"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
              Serial Number
            </label>
            <input
              type="text"
              required
              value={formData.serial_number}
              onChange={(e) => setFormData({ ...formData, serial_number: e.target.value })}
              className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
              placeholder="BA-2024-005"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
              Model
            </label>
            <select
              required
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <option value="">Select a model</option>
              <optgroup label="Bridge Saws">
                <option value="Bridge Saw BS-3000">Bridge Saw BS-3000</option>
                <option value="Bridge Saw BS-5000">Bridge Saw BS-5000</option>
                <option value="Bridge Saw BS-7000">Bridge Saw BS-7000</option>
              </optgroup>
              <optgroup label="CNC Routers">
                <option value="CNC Router CR-5000">CNC Router CR-5000</option>
                <option value="CNC Router CR-7000">CNC Router CR-7000</option>
              </optgroup>
              <optgroup label="Edge Polishers">
                <option value="Edge Polisher EP-2000">Edge Polisher EP-2000</option>
                <option value="Edge Polisher EP-3000">Edge Polisher EP-3000</option>
              </optgroup>
              <optgroup label="Waterjet Cutters">
                <option value="Waterjet Cutter WJ-4000">Waterjet Cutter WJ-4000</option>
                <option value="Waterjet Cutter WJ-6000">Waterjet Cutter WJ-6000</option>
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
              Location
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
              placeholder="Production Line C"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
              Initial Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <option value="offline">Offline</option>
              <option value="online">Online</option>
              <option value="maintenance">Maintenance</option>
              <option value="error">Error</option>
            </select>
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
              Add Arm
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
