import { HelpCircle, X } from 'lucide-react';

interface HelpPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpPanel({ isOpen, onClose }: HelpPanelProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Help & Instructions</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
          </button>
        </div>

        <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
          <section>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">Dashboard Overview</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              The BACA Diagnostics Dashboard provides real-time monitoring and diagnostic
              information for your robotic arms. Use this interface to track performance,
              identify issues, and maintain operational efficiency.
            </p>
          </section>

          <section>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">Connecting Your Robotic Arm</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                <h4 className="text-sm sm:text-base font-medium text-slate-900 mb-1.5 sm:mb-2">Step 1: Register Your Arm</h4>
                <p className="text-xs sm:text-sm text-slate-700 mb-1.5 sm:mb-2">
                  Click the + button in the sidebar to add a new robotic arm. Enter:
                </p>
                <ul className="text-xs sm:text-sm text-slate-700 space-y-1 ml-3 sm:ml-4">
                  <li>• Arm name (e.g., BACA-ARM-05)</li>
                  <li>• Serial number (e.g., BA-2024-005)</li>
                  <li>• Model (BACA-6000, 7500, or 9000)</li>
                  <li>• Physical location</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                <h4 className="text-sm sm:text-base font-medium text-slate-900 mb-1.5 sm:mb-2">Step 2: Get Your Arm ID</h4>
                <p className="text-xs sm:text-sm text-slate-700">
                  After registration, note the arm's unique ID. You'll need this to send data
                  from your physical robotic arm controller.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                <h4 className="text-sm sm:text-base font-medium text-slate-900 mb-1.5 sm:mb-2">Step 3: Configure Your Arm</h4>
                <p className="text-xs sm:text-sm text-slate-700 mb-1.5 sm:mb-2">
                  Program your robotic arm controller to send data to:
                </p>
                <div className="bg-white rounded p-1.5 sm:p-2 text-[10px] sm:text-xs font-mono break-all mb-1.5 sm:mb-2">
                  https://tiwmxizhofixjuoydnvg.supabase.co/rest/v1/diagnostic_metrics
                </div>
                <p className="text-xs sm:text-sm text-slate-700">
                  Use the API key from ARM_INTEGRATION_GUIDE.md file in your project folder.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                <h4 className="text-sm sm:text-base font-medium text-slate-900 mb-1.5 sm:mb-2">Step 4: Send Data</h4>
                <p className="text-xs sm:text-sm text-slate-700 mb-1.5 sm:mb-2">
                  Your arm should send metrics every 1-10 seconds including:
                </p>
                <ul className="text-xs sm:text-sm text-slate-700 space-y-1 ml-3 sm:ml-4">
                  <li>• Temperature, power, CPU/memory usage</li>
                  <li>• Joint positions, velocities, torques</li>
                  <li>• Error counts and operation hours</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                <h4 className="text-sm sm:text-base font-medium text-slate-900 mb-1.5 sm:mb-2">✓ Real-Time Updates</h4>
                <p className="text-xs sm:text-sm text-slate-700">
                  Once configured, your dashboard will automatically update in real-time
                  as your robotic arm sends data. No refresh needed!
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">Using the Dashboard</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                <h4 className="text-sm sm:text-base font-medium text-slate-900 mb-1.5 sm:mb-2">1. Select a Robotic Arm</h4>
                <p className="text-xs sm:text-sm text-slate-700">
                  Click on any arm card in the left sidebar to view its detailed diagnostics.
                  The selected arm will be highlighted with a darker border.
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                <h4 className="text-sm sm:text-base font-medium text-slate-900 mb-1.5 sm:mb-2">2. Monitor Metrics</h4>
                <p className="text-xs sm:text-sm text-slate-700">
                  View real-time system metrics including temperature, power consumption,
                  CPU/memory usage, and joint performance data.
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                <h4 className="text-sm sm:text-base font-medium text-slate-900 mb-1.5 sm:mb-2">3. Manage Alerts</h4>
                <p className="text-xs sm:text-sm text-slate-700">
                  Review system alerts and acknowledge them by clicking the X button.
                  Acknowledged alerts remain visible but are marked as handled.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">Status Indicators</h3>
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white"></div>
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-slate-900">Online</p>
                  <p className="text-[10px] sm:text-xs text-slate-600">System is operational and running normally</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white"></div>
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-slate-900">Error</p>
                  <p className="text-[10px] sm:text-xs text-slate-600">System has encountered an error requiring attention</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white"></div>
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-slate-900">Maintenance</p>
                  <p className="text-[10px] sm:text-xs text-slate-600">System is undergoing scheduled maintenance</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-400 flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white"></div>
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-slate-900">Offline</p>
                  <p className="text-[10px] sm:text-xs text-slate-600">System is not currently connected</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">Alert Severity Levels</h3>
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-red-100 rounded text-[10px] sm:text-xs font-semibold text-red-700 flex-shrink-0">
                  CRITICAL
                </div>
                <p className="text-xs sm:text-sm text-slate-700">Immediate action required</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-amber-100 rounded text-[10px] sm:text-xs font-semibold text-amber-700 flex-shrink-0">
                  WARNING
                </div>
                <p className="text-xs sm:text-sm text-slate-700">Attention needed soon</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-100 rounded text-[10px] sm:text-xs font-semibold text-blue-700 flex-shrink-0">
                  INFO
                </div>
                <p className="text-xs sm:text-sm text-slate-700">Informational message</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">Managing Robotic Arms</h3>
            <p className="text-xs sm:text-sm text-slate-700 mb-2 sm:mb-3">
              Use the "Add New Arm" button in the sidebar to register a new robotic arm
              in the system. You can edit arm details or remove arms by clicking the menu
              button on each arm card.
            </p>
          </section>

          <section>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">Understanding Metrics</h3>
            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-700">
              <p><strong>Temperature:</strong> Operating temperature in Celsius. Warning threshold at 45°C, critical at 55°C.</p>
              <p><strong>Power Usage:</strong> Current power consumption in watts. Warning at 300W, critical at 350W.</p>
              <p><strong>CPU Usage:</strong> Processor utilization percentage. Warning at 75%, critical at 90%.</p>
              <p><strong>Memory Usage:</strong> RAM utilization percentage. Warning at 75%, critical at 90%.</p>
              <p><strong>Joint Positions:</strong> Current angular position of each joint in degrees.</p>
              <p><strong>Joint Torques:</strong> Current torque applied to each joint in Newton-meters.</p>
            </div>
          </section>

          <section>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">Best Practices</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-700">
              <li className="flex gap-2">
                <span className="text-slate-400">•</span>
                <span>Monitor critical alerts immediately and acknowledge after addressing</span>
              </li>
              <li className="flex gap-2">
                <span className="text-slate-400">•</span>
                <span>Check temperature and power metrics regularly for anomalies</span>
              </li>
              <li className="flex gap-2">
                <span className="text-slate-400">•</span>
                <span>Schedule maintenance when operation hours reach service intervals</span>
              </li>
              <li className="flex gap-2">
                <span className="text-slate-400">•</span>
                <span>Keep firmware updated to ensure optimal performance</span>
              </li>
              <li className="flex gap-2">
                <span className="text-slate-400">•</span>
                <span>Document any unusual behavior in the maintenance log</span>
              </li>
            </ul>
          </section>

          <section className="border-t border-slate-200 pt-4 sm:pt-6">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">Need More Help?</h3>
            <p className="text-xs sm:text-sm text-slate-700">
              For technical support or additional questions, please contact your system
              administrator or refer to the BACA system documentation.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
