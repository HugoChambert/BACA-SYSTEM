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
    <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-5 lg:p-6">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900">
          System Alerts
        </h3>
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-xs sm:text-sm text-slate-600">
            {alerts.filter(a => !a.acknowledged).length} unacknowledged
          </span>
          <button
            onClick={onCreateAlert}
            className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-slate-900 text-white text-xs sm:text-sm rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Add Alert</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Alerts List - Responsive scroll container */}
      <div className="space-y-2 sm:space-y-3 max-h-[400px] sm:max-h-96 overflow-y-auto">
        {sortedAlerts.length === 0 ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mx-auto mb-2" />
            <p className="text-xs sm:text-sm text-green-900">All systems operational</p>
          </div>
        ) : (
          sortedAlerts.map((alert) => {
            const config = getSeverityConfig(alert.severity);
            const Icon = config.icon;

            return (
              <div
                key={alert.id}
                className={`${config.color} border rounded-lg p-3 sm:p-4 ${
                  alert.acknowledged ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  {/* Icon */}
                  <div className={`${config.iconColor} mt-0.5 flex-shrink-0`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        {/* Badges - Responsive wrapping */}
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap mb-1">
                          <span className={`text-[10px] sm:text-xs font-semibold uppercase ${config.textColor}`}>
                            {alert.severity}
                          </span>
                          <span className="text-[10px] sm:text-xs text-slate-600">
                            {alert.category}
                          </span>
                          <span className="text-[10px] sm:text-xs text-slate-500">
                            {formatTimestamp(alert.created_at)}
                          </span>
                        </div>
                        
                        {/* Message - Allow wrapping on mobile */}
                        <p className={`text-xs sm:text-sm ${config.textColor} font-medium break-words`}>
                          {alert.message}
                        </p>
                        
                        {/* Acknowledgment info */}
                        {alert.acknowledged && (
                          <p className="text-[10px] sm:text-xs text-slate-600 mt-1.5 sm:mt-2">
                            Acknowledged by {alert.acknowledged_by}
                          </p>
                        )}
                      </div>
                      
                      {/* Acknowledge button */}
                      {!alert.acknowledged && (
                        <button
                          onClick={() => onAcknowledge(alert.id)}
                          className="p-1 hover:bg-white rounded transition-colors flex-shrink-0"
                          title="Acknowledge alert"
                        >
                          <X className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600" />
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
