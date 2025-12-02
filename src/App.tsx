import { useEffect, useState } from 'react';
import { Activity, HelpCircle, Plus } from 'lucide-react';
import { StatusCard } from './components/StatusCard';
import { MetricsPanel } from './components/MetricsPanel';
import { AlertsPanel } from './components/AlertsPanel';
import { ArmDetails } from './components/ArmDetails';
import { HelpPanel } from './components/HelpPanel';
import { AddArmModal } from './components/AddArmModal';
import { EditArmModal } from './components/EditArmModal';
import { CreateAlertModal } from './components/CreateAlertModal';
import { MachineModelInfo } from './components/MachineModelInfo';
import { mockArms, mockAlerts } from './mockData';
import { DiagnosticMetrics, RoboticArm, SystemAlert, MachinePart, MachinePartInstance } from './types';
import { database } from './services/database';
import { realtimeService } from './services/realtime';
import { PartsPanel } from './components/PartsPanel';

function App() {
  const [arms, setArms] = useState<RoboticArm[]>([]);
  const [selectedArmId, setSelectedArmId] = useState<string>('');
  const [metrics, setMetrics] = useState<Record<string, DiagnosticMetrics>>({});
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isAddArmOpen, setIsAddArmOpen] = useState(false);
  const [isEditArmOpen, setIsEditArmOpen] = useState(false);
  const [isCreateAlertOpen, setIsCreateAlertOpen] = useState(false);
  const [editingArm, setEditingArm] = useState<RoboticArm | null>(null);
  const [useDatabase, setUseDatabase] = useState(false);
  const [allParts, setAllParts] = useState<MachinePart[]>([]);
  const [partInstances, setPartInstances] = useState<Record<string, MachinePartInstance[]>>({});

  useEffect(() => {
    loadData();
    loadParts();
    setupRealtimeSubscriptions();
  }, []);

  useEffect(() => {
    if (selectedArmId) {
      loadPartInstances(selectedArmId);
    }
  }, [selectedArmId]);

  useEffect(() => {
    arms.forEach(async (arm) => {
      if (useDatabase) {
        try {
          const latestMetrics = await database.metrics.getLatest(arm.id);
          if (latestMetrics) {
            setMetrics(prev => ({ ...prev, [arm.id]: latestMetrics }));
          }
        } catch (error) {
          console.error('Failed to load metrics for arm:', arm.id, error);
        }
      }
    });
  }, [arms, useDatabase]);

  const loadData = async () => {
    try {
      const dbArms = await database.arms.getAll();
      const dbAlerts = await database.alerts.getAll();

      if (dbArms.length > 0) {
        setArms(dbArms);
        setSelectedArmId(dbArms[0].id);
        setUseDatabase(true);
      } else {
        setArms(mockArms);
        setSelectedArmId(mockArms[0].id);
      }

      if (dbAlerts.length > 0) {
        setAlerts(dbAlerts);
      } else {
        setAlerts(mockAlerts);
      }

      setUseDatabase(true);
    } catch (error) {
      console.error('Database not available, using mock data:', error);
      setArms(mockArms);
      setSelectedArmId(mockArms[0].id);
      setAlerts(mockAlerts);
    }
  };

  const setupRealtimeSubscriptions = () => {
    const armsChannel = realtimeService.subscribeToArms(
      (newArm) => {
        setArms(prev => [...prev, newArm]);
        if (!selectedArmId) setSelectedArmId(newArm.id);
      },
      (updatedArm) => {
        setArms(prev => prev.map(arm => arm.id === updatedArm.id ? updatedArm : arm));
      },
      (deletedArmId) => {
        setArms(prev => prev.filter(arm => arm.id !== deletedArmId));
        if (selectedArmId === deletedArmId && arms.length > 1) {
          const remainingArms = arms.filter(a => a.id !== deletedArmId);
          if (remainingArms.length > 0) {
            setSelectedArmId(remainingArms[0].id);
          }
        }
      }
    );

    const metricsChannel = realtimeService.subscribeToMetrics(
      null,
      (newMetrics) => {
        setMetrics(prev => ({ ...prev, [newMetrics.arm_id]: newMetrics }));
      }
    );

    const alertsChannel = realtimeService.subscribeToAlerts(
      (newAlert) => {
        setAlerts(prev => [newAlert, ...prev]);
      },
      (updatedAlert) => {
        setAlerts(prev => prev.map(alert => alert.id === updatedAlert.id ? updatedAlert : alert));
      }
    );

    return () => {
      if (armsChannel) realtimeService.unsubscribe(armsChannel);
      if (metricsChannel) realtimeService.unsubscribe(metricsChannel);
      if (alertsChannel) realtimeService.unsubscribe(alertsChannel);
    };
  };

  const loadParts = async () => {
    try {
      const parts = await database.parts.getAll();
      setAllParts(parts);
    } catch (error) {
      console.error('Failed to load parts:', error);
    }
  };

  const loadPartInstances = async (armId: string) => {
    try {
      const instances = await database.partInstances.getByArm(armId);
      setPartInstances(prev => ({ ...prev, [armId]: instances }));
    } catch (error) {
      console.error('Failed to load part instances:', error);
      setPartInstances(prev => ({ ...prev, [armId]: [] }));
    }
  };

  const handleAddArm = async (armData: Omit<RoboticArm, 'id'>) => {
    try {
      await database.arms.create(armData);
    } catch (error) {
      console.error('Failed to add arm to database:', error);
      const newArm: RoboticArm = {
        ...armData,
        id: `arm-${Date.now()}`
      };
      setArms(prev => [...prev, newArm]);
    }
  };

  const handleEditArm = async (updatedArm: RoboticArm) => {
    try {
      await database.arms.update(updatedArm.id, updatedArm);
    } catch (error) {
      console.error('Failed to update arm in database:', error);
      setArms(prev => prev.map(arm => arm.id === updatedArm.id ? updatedArm : arm));
    }
  };

  const handleDeleteArm = async (armId: string) => {
    try {
      await database.arms.delete(armId);
    } catch (error) {
      console.error('Failed to delete arm from database:', error);
      setArms(prev => prev.filter(arm => arm.id !== armId));
      if (selectedArmId === armId && arms.length > 1) {
        const remaining = arms.filter(a => a.id !== armId);
        if (remaining.length > 0) setSelectedArmId(remaining[0].id);
      }
    }
  };

  const handleCreateAlert = async (alertData: Omit<SystemAlert, 'id' | 'created_at'>) => {
    try {
      await database.alerts.create({
        ...alertData,
        created_at: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to create alert in database:', error);
      const newAlert: SystemAlert = {
        ...alertData,
        id: `alert-${Date.now()}`,
        created_at: new Date().toISOString()
      };
      setAlerts(prev => [newAlert, ...prev]);
    }
  };

  const handleAcknowledge = async (alertId: string) => {
    try {
      await database.alerts.acknowledge(alertId, 'System Admin');
    } catch (error) {
      console.error('Failed to acknowledge alert in database:', error);
      setAlerts(prev => prev.map(alert =>
        alert.id === alertId
          ? { ...alert, acknowledged: true, acknowledged_by: 'System Admin', acknowledged_at: new Date().toISOString() }
          : alert
      ));
    }
  };

  const handleEditClick = (e: React.MouseEvent, arm: RoboticArm) => {
    e.stopPropagation();
    setEditingArm(arm);
    setIsEditArmOpen(true);
  };

  const selectedArm = arms.find(arm => arm.id === selectedArmId);
  const selectedMetrics = metrics[selectedArmId];
  const selectedAlerts = alerts.filter(alert => alert.arm_id === selectedArmId);

  const stats = {
    total: arms.length,
    online: arms.filter(a => a.status === 'online').length,
    errors: arms.filter(a => a.status === 'error').length,
    alerts: alerts.filter(a => !a.acknowledged).length
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!selectedArmId || !selectedMetrics) return;

      const currentHours = selectedMetrics.operation_hours;
      const instances = partInstances[selectedArmId] || [];

      for (const instance of instances) {
        try {
          await database.partInstances.updateHours(instance.id, currentHours);
        } catch (error) {
          console.error('Failed to update part hours:', error);
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [selectedArmId, selectedMetrics, partInstances]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-slate-900 rounded-lg p-1.5 sm:p-2">
                <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">BACA Diagnostics</h1>
                <p className="text-xs sm:text-sm text-slate-600 hidden sm:block">Robotic Arm Monitoring System</p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-6">
              <div className="hidden md:flex gap-4 lg:gap-6">
                <div className="text-center">
                  <div className="text-lg lg:text-2xl font-bold text-slate-900">{stats.total}</div>
                  <div className="text-[10px] lg:text-xs text-slate-600 uppercase tracking-wide">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-lg lg:text-2xl font-bold text-green-600">{stats.online}</div>
                  <div className="text-[10px] lg:text-xs text-slate-600 uppercase tracking-wide">Online</div>
                </div>
                <div className="text-center">
                  <div className="text-lg lg:text-2xl font-bold text-red-600">{stats.errors}</div>
                  <div className="text-[10px] lg:text-xs text-slate-600 uppercase tracking-wide">Errors</div>
                </div>
                <div className="text-center">
                  <div className="text-lg lg:text-2xl font-bold text-amber-600">{stats.alerts}</div>
                  <div className="text-[10px] lg:text-xs text-slate-600 uppercase tracking-wide">Alerts</div>
                </div>
              </div>
              <button
                onClick={() => setIsHelpOpen(true)}
                className="p-1.5 sm:p-2 hover:bg-slate-100 rounded-lg transition-colors"
                title="Help"
              >
                <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
              </button>
            </div>
          </div>

          {/* Mobile Stats */}
          <div className="md:hidden mt-3 grid grid-cols-4 gap-2">
            <div className="text-center">
              <div className="text-base font-bold text-slate-900">{stats.total}</div>
              <div className="text-[10px] text-slate-600 uppercase">Total</div>
            </div>
            <div className="text-center">
              <div className="text-base font-bold text-green-600">{stats.online}</div>
              <div className="text-[10px] text-slate-600 uppercase">Online</div>
            </div>
            <div className="text-center">
              <div className="text-base font-bold text-red-600">{stats.errors}</div>
              <div className="text-[10px] text-slate-600 uppercase">Errors</div>
            </div>
            <div className="text-center">
              <div className="text-base font-bold text-amber-600">{stats.alerts}</div>
              <div className="text-[10px] text-slate-600 uppercase">Alerts</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <h2 className="text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Robotic Arms
                </h2>
                <button
                  onClick={() => setIsAddArmOpen(true)}
                  className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors"
                  title="Add new arm"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                </button>
              </div>
              <div className="space-y-2 sm:space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 hover:scrollbar-thumb-slate-400" style={{ maxHeight: 'calc(100vh - 12rem)' }}>
                {arms.map(arm => (
                  <StatusCard
                    key={arm.id}
                    arm={arm}
                    onClick={() => setSelectedArmId(arm.id)}
                    onEdit={(e) => handleEditClick(e, arm)}
                    isSelected={selectedArmId === arm.id}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-9">
            {selectedArm && selectedMetrics ? (
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-gradient-to-r from-slate-900 to-slate-700 rounded-lg p-4 sm:p-5 md:p-6 text-white">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{selectedArm.name}</h2>
                  <p className="text-xs sm:text-sm md:text-base text-slate-300">Real-time diagnostic monitoring and analysis</p>
                </div>

                <ArmDetails arm={selectedArm} />

                <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-5 md:p-6">
                  <MetricsPanel metrics={selectedMetrics} />
                </div>

                <MachineModelInfo model={selectedArm.model} />

                <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-5 md:p-6">
                  <PartsPanel
                    armId={selectedArm.id}
                    model={selectedArm.model}
                    operationHours={selectedMetrics?.operation_hours || 0}
                    parts={partInstances[selectedArm.id] || []}
                    availableParts={allParts.filter(p => p.compatible_models.includes(selectedArm.model))}
                  />
                </div>

                <AlertsPanel
                  alerts={selectedAlerts}
                  onAcknowledge={handleAcknowledge}
                  onCreateAlert={() => setIsCreateAlertOpen(true)}
                />
              </div>
            ) : selectedArm ? (
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-gradient-to-r from-slate-900 to-slate-700 rounded-lg p-4 sm:p-5 md:p-6 text-white">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{selectedArm.name}</h2>
                  <p className="text-xs sm:text-sm md:text-base text-slate-300">Real-time diagnostic monitoring and analysis</p>
                </div>

                <ArmDetails arm={selectedArm} />

                <MachineModelInfo model={selectedArm.model} />
              </div>
            ) : (
              <div className="bg-slate-50 rounded-lg p-6 sm:p-8 md:p-12 text-center">
                <Activity className="w-12 h-12 sm:w-16 sm:h-16 text-slate-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-slate-700 mb-2">No Machine Selected</h3>
                <p className="text-sm sm:text-base text-slate-600">
                  Select a robotic arm from the sidebar to view detailed diagnostics and machine information.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <HelpPanel isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <AddArmModal
        isOpen={isAddArmOpen}
        onClose={() => setIsAddArmOpen(false)}
        onAdd={handleAddArm}
      />
      <EditArmModal
        isOpen={isEditArmOpen}
        arm={editingArm}
        onClose={() => setIsEditArmOpen(false)}
        onSave={handleEditArm}
        onDelete={handleDeleteArm}
      />
      <CreateAlertModal
        isOpen={isCreateAlertOpen}
        armId={selectedArmId}
        onClose={() => setIsCreateAlertOpen(false)}
        onCreate={handleCreateAlert}
      />
    </div>
  );
}

export default App;
