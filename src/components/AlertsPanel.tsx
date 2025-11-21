import { AlertTriangle, CheckCircle2, Info, Plus, X } from 'lucide-react';
import { SystemAlert } from '../types';

interface AlertsPanelProps {
  alerts: SystemAlert[];
  onAcknowledge: (alertId: string) => void;
  onCreateAlert: () => void;
}

export function AlertsPanel({ alerts, onAcknowledge, onCreateAlert }: AlertsPanelProps) {
  const getSeverityConfig = (severity: SystemAlert['severity']) => {
    switch (severity) {
      case 'critical':
        return { color: 'bg-red-50 border-red-200', icon: AlertTriangle, iconColor: 'text-red-600', textColor: 'text-red-900' };
      case 'warning':
        return { color: 'bg-amber-50 border-amber-200', icon: AlertTriangle, iconColor: 'text-amber-600', textColor: 'text-amber-900' };
      case 'info':
        return { color: 'bg-blue-50 border-blue-200', icon: Info, iconColor: 'text-blue-600', textColor: 'text-blue-900' };
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const sortedAlerts = [...alerts].sort((a, b) => {
    if (a.acknowledged !== b.acknowledged) return a.acknowledged ? 1 : -1;
    const severityOrder = { critical: 0, warning: 1, info: 2 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">System Alerts</h3>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-600">
            {alerts.filter(a => !a.acknowledged).length} unacknowledged
          </span>
          <button
            onClick={onCreateAlert}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Alert
          </button>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {sortedAlerts.length === 0 ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-green-900">All systems operational</p>
          </div>
        ) : (
          sortedAlerts.map((alert) => {
            const config = getSeverityConfig(alert.severity);
            const Icon = config.icon;

            return (
              <div
                key={alert.id}
                className={`${config.color} border rounded-lg p-4 ${
                  alert.acknowledged ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`${config.iconColor} mt-0.5`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-xs font-semibold uppercase ${config.textColor}`}>
                            {alert.severity}
                          </span>
                          <span className="text-xs text-slate-600">
                            {alert.category}
                          </span>
                          <span className="text-xs text-slate-500">
                            {formatTimestamp(alert.created_at)}
                          </span>
                        </div>
                        <p className={`text-sm mt-1 ${config.textColor} font-medium`}>
                          {alert.message}
                        </p>
                        {alert.acknowledged && (
                          <p className="text-xs text-slate-600 mt-2">
                            Acknowledged by {alert.acknowledged_by}
                          </p>
                        )}
                      </div>
                      {!alert.acknowledged && (
                        <button
                          onClick={() => onAcknowledge(alert.id)}
                          className="p-1 hover:bg-white rounded transition-colors flex-shrink-0"
                          title="Acknowledge alert"
                        >
                          <X className="w-4 h-4 text-slate-600" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
