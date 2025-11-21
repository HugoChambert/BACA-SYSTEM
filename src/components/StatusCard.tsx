import { Activity, AlertTriangle, CheckCircle2, MoreVertical, Wrench } from 'lucide-react';
import { RoboticArm } from '../types';

interface StatusCardProps {
  arm: RoboticArm;
  onClick: () => void;
  onEdit: (e: React.MouseEvent) => void;
  isSelected: boolean;
}

export function StatusCard({ arm, onClick, onEdit, isSelected }: StatusCardProps) {
  const statusConfig = {
    online: { color: 'bg-green-500', icon: CheckCircle2, text: 'Online' },
    offline: { color: 'bg-gray-400', icon: Activity, text: 'Offline' },
    maintenance: { color: 'bg-blue-500', icon: Wrench, text: 'Maintenance' },
    error: { color: 'bg-red-500', icon: AlertTriangle, text: 'Error' }
  };

  const config = statusConfig[arm.status];
  const StatusIcon = config.icon;

  return (
    <div
      className={`w-full p-4 rounded-lg border-2 transition-all hover:shadow-lg cursor-pointer relative ${
        isSelected
          ? 'border-slate-600 bg-white shadow-md'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
      onClick={onClick}
    >
      <button
        onClick={onEdit}
        className="absolute top-2 right-2 p-1 hover:bg-slate-100 rounded transition-colors"
        title="Edit arm"
      >
        <MoreVertical className="w-4 h-4 text-slate-600" />
      </button>
      <div className="flex items-start justify-between pr-6">
        <div className="flex-1 text-left">
          <h3 className="font-semibold text-slate-900 text-lg">{arm.name}</h3>
          <p className="text-sm text-slate-600 mt-1">{arm.model}</p>
          <p className="text-xs text-slate-500 mt-1">{arm.location}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className={`${config.color} rounded-full p-2`}>
            <StatusIcon className="w-5 h-5 text-white" />
          </div>
          <span className={`text-xs font-medium ${
            arm.status === 'online' ? 'text-green-700' :
            arm.status === 'error' ? 'text-red-700' :
            arm.status === 'maintenance' ? 'text-blue-700' :
            'text-gray-700'
          }`}>
            {config.text}
          </span>
        </div>
      </div>
    </div>
  );
}
