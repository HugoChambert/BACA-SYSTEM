import { Wrench, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { MachinePart, MachinePartInstance } from '../types';

interface PartsPanelProps {
  armId: string;
  model: string;
  operationHours: number;
  parts: MachinePartInstance[];
  availableParts: MachinePart[];
}

export function PartsPanel({ armId, model, operationHours, parts, availableParts }: PartsPanelProps) {
  const getPartStatus = (part: MachinePartInstance, partDetails: MachinePart) => {
    const usagePercent = (part.hours_used / partDetails.lifespan_hours) * 100;

    if (usagePercent >= 100) return 'critical';
    if (usagePercent >= 80) return 'warning';
    if (usagePercent >= 60) return 'caution';
    return 'good';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'warning': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'caution': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'caution': return <Clock className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: string, usagePercent: number) => {
    switch (status) {
      case 'critical': return 'Replace Immediately';
      case 'warning': return 'Schedule Replacement';
      case 'caution': return `${(100 - usagePercent).toFixed(0)}% Life Remaining`;
      default: return 'Good Condition';
    }
  };

  const getRemainingHours = (part: MachinePartInstance, partDetails: MachinePart) => {
    return Math.max(0, partDetails.lifespan_hours - part.hours_used);
  };

  const partsWithDetails = parts.map(partInstance => {
    const details = availableParts.find(p => p.id === partInstance.part_id);
    return { instance: partInstance, details };
  }).filter(p => p.details);

  const sortedParts = partsWithDetails.sort((a, b) => {
    const aPercent = (a.instance.hours_used / a.details!.lifespan_hours) * 100;
    const bPercent = (b.instance.hours_used / b.details!.lifespan_hours) * 100;
    return bPercent - aPercent;
  });

  const compatibleParts = availableParts.filter(part =>
    part.compatible_models.includes(model)
  );

  const installedPartIds = new Set(parts.map(p => p.part_id));
  const suggestedParts = compatibleParts.filter(part => !installedPartIds.has(part.id));

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="w-5 h-5 text-slate-700" />
          <h3 className="text-lg font-semibold text-slate-900">Installed Parts</h3>
        </div>

        {sortedParts.length === 0 ? (
          <div className="bg-slate-50 rounded-lg p-6 text-center">
            <Wrench className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600">No parts tracked yet</p>
            <p className="text-sm text-slate-500 mt-1">Add parts to track their lifespan and maintenance</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedParts.map(({ instance, details }) => {
              if (!details) return null;

              const status = getPartStatus(instance, details);
              const usagePercent = (instance.hours_used / details.lifespan_hours) * 100;
              const remainingHours = getRemainingHours(instance, details);

              return (
                <div
                  key={instance.id}
                  className={`border-2 rounded-lg p-4 ${getStatusColor(status)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(status)}
                        <h4 className="font-semibold">{details.name}</h4>
                      </div>
                      <p className="text-sm opacity-80">Part #: {details.part_number}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {getStatusLabel(status, usagePercent)}
                      </p>
                      {status !== 'critical' && (
                        <p className="text-xs opacity-80 mt-1">
                          {remainingHours.toFixed(0)}h remaining
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>Usage: {instance.hours_used.toFixed(1)} / {details.lifespan_hours}h</span>
                      <span>{usagePercent.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-white bg-opacity-50 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, usagePercent)}%`,
                          backgroundColor: status === 'critical' ? '#dc2626' :
                                         status === 'warning' ? '#ea580c' :
                                         status === 'caution' ? '#ca8a04' : '#16a34a'
                        }}
                      />
                    </div>
                  </div>

                  {status === 'critical' || status === 'warning' ? (
                    <div className="mt-3 pt-3 border-t border-current border-opacity-20">
                      <p className="text-sm font-medium">Replacement Cost: ${details.cost?.toFixed(2) || 'N/A'}</p>
                      <p className="text-xs opacity-80 mt-1">
                        Installed: {new Date(instance.installed_at).toLocaleDateString()}
                      </p>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {suggestedParts.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Available Parts for {model}
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {suggestedParts.slice(0, 5).map(part => (
              <div
                key={part.id}
                className="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900">{part.name}</h4>
                    <p className="text-sm text-slate-600 mt-1">{part.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                      <span>Part #: {part.part_number}</span>
                      <span>Lifespan: {part.lifespan_hours}h</span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-semibold text-slate-900">${part.cost?.toFixed(2)}</p>
                    <p className="text-xs text-slate-500 mt-1 capitalize">{part.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
