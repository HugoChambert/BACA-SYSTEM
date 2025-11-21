import { Activity, Cpu, Gauge, HardDrive, Thermometer, Zap } from 'lucide-react';
import { DiagnosticMetrics } from '../types';

interface MetricsPanelProps {
  metrics: DiagnosticMetrics;
}

export function MetricsPanel({ metrics }: MetricsPanelProps) {
  const getStatusColor = (value: number, thresholds: { warning: number; critical: number }) => {
    if (value >= thresholds.critical) return 'text-red-600 bg-red-50';
    if (value >= thresholds.warning) return 'text-amber-600 bg-amber-50';
    return 'text-green-600 bg-green-50';
  };

  const metricCards = [
    {
      label: 'Temperature',
      value: `${metrics.temperature}°C`,
      icon: Thermometer,
      color: getStatusColor(metrics.temperature, { warning: 45, critical: 55 })
    },
    {
      label: 'Power Usage',
      value: `${metrics.power_consumption}W`,
      icon: Zap,
      color: getStatusColor(metrics.power_consumption, { warning: 300, critical: 350 })
    },
    {
      label: 'CPU Usage',
      value: `${metrics.cpu_usage}%`,
      icon: Cpu,
      color: getStatusColor(metrics.cpu_usage, { warning: 75, critical: 90 })
    },
    {
      label: 'Memory Usage',
      value: `${metrics.memory_usage}%`,
      icon: HardDrive,
      color: getStatusColor(metrics.memory_usage, { warning: 75, critical: 90 })
    },
    {
      label: 'Error Count',
      value: metrics.error_count.toString(),
      icon: Activity,
      color: metrics.error_count > 0 ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50'
    },
    {
      label: 'Operation Hours',
      value: `${metrics.operation_hours.toFixed(0)}h`,
      icon: Gauge,
      color: 'text-slate-600 bg-slate-50'
    }
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-900 mb-4">System Metrics</h3>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {metricCards.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">{metric.label}</span>
                <div className={`p-2 rounded-lg ${metric.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Joint Positions (deg)</h4>
          <div className="space-y-2">
            {Object.entries(metrics.joint_positions).map(([joint, value]) => (
              <div key={joint} className="flex justify-between items-center">
                <span className="text-sm text-slate-600 font-medium uppercase">{joint}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-slate-600 h-2 rounded-full transition-all"
                      style={{ width: `${(Math.abs(value) / 360) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-mono text-slate-900 w-12 text-right">
                    {value.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Joint Torques (Nm)</h4>
          <div className="space-y-2">
            {Object.entries(metrics.joint_torques).map(([joint, value]) => (
              <div key={joint} className="flex justify-between items-center">
                <span className="text-sm text-slate-600 font-medium uppercase">{joint}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-slate-600 h-2 rounded-full transition-all"
                      style={{ width: `${(value / 100) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-mono text-slate-900 w-12 text-right">
                    {value.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
