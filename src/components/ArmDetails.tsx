import { Calendar, MapPin, Package, Tag } from 'lucide-react';
import { RoboticArm } from '../types';

interface ArmDetailsProps {
  arm: RoboticArm;
}

export function ArmDetails({ arm }: ArmDetailsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const details = [
    { icon: Tag, label: 'Serial Number', value: arm.serial_number },
    { icon: Package, label: 'Model', value: arm.model },
    { icon: MapPin, label: 'Location', value: arm.location },
    { icon: Calendar, label: 'Installed', value: formatDate(arm.installed_at) },
    { icon: Calendar, label: 'Last Maintenance', value: formatDate(arm.last_maintenance) }
  ];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Arm Details</h3>
      <div className="space-y-3">
        {details.map((detail) => {
          const Icon = detail.icon;
          return (
            <div key={detail.label} className="flex items-start gap-3">
              <Icon className="w-5 h-5 text-slate-400 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500 uppercase tracking-wide">{detail.label}</p>
                <p className="text-sm font-medium text-slate-900 mt-0.5">{detail.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
