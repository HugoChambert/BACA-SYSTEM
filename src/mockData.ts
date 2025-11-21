import { RoboticArm, DiagnosticMetrics, SystemAlert } from './types';

export const mockArms: RoboticArm[] = [
  {
    id: '1',
    name: 'BACA-ARM-01',
    serial_number: 'BA-2024-001',
    model: 'BACA-6000',
    status: 'online',
    location: 'Production Line A',
    installed_at: '2024-01-15T08:00:00Z',
    last_maintenance: '2024-10-01T14:30:00Z'
  },
  {
    id: '2',
    name: 'BACA-ARM-02',
    serial_number: 'BA-2024-002',
    model: 'BACA-6000',
    status: 'online',
    location: 'Production Line B',
    installed_at: '2024-02-10T10:00:00Z',
    last_maintenance: '2024-10-05T09:15:00Z'
  },
  {
    id: '3',
    name: 'BACA-ARM-03',
    serial_number: 'BA-2024-003',
    model: 'BACA-7500',
    status: 'error',
    location: 'Assembly Station 1',
    installed_at: '2024-03-20T12:00:00Z',
    last_maintenance: '2024-09-20T11:00:00Z'
  },
  {
    id: '4',
    name: 'BACA-ARM-04',
    serial_number: 'BA-2024-004',
    model: 'BACA-6000',
    status: 'maintenance',
    location: 'Quality Control',
    installed_at: '2024-04-05T09:30:00Z',
    last_maintenance: '2024-11-15T10:00:00Z'
  }
];

export const generateMetrics = (armId: string): DiagnosticMetrics => {
  const baseTemp = 35 + Math.random() * 15;
  const basePower = 200 + Math.random() * 150;
  const cpuUsage = 30 + Math.random() * 50;
  const memUsage = 40 + Math.random() * 40;

  return {
    id: `metric-${Date.now()}-${armId}`,
    arm_id: armId,
    temperature: Number(baseTemp.toFixed(1)),
    power_consumption: Number(basePower.toFixed(1)),
    cpu_usage: Number(cpuUsage.toFixed(1)),
    memory_usage: Number(memUsage.toFixed(1)),
    error_count: Math.floor(Math.random() * 5),
    operation_hours: 1000 + Math.random() * 5000,
    joint_positions: {
      j1: Number((Math.random() * 360).toFixed(1)),
      j2: Number((Math.random() * 180 - 90).toFixed(1)),
      j3: Number((Math.random() * 180 - 90).toFixed(1)),
      j4: Number((Math.random() * 360).toFixed(1)),
      j5: Number((Math.random() * 180 - 90).toFixed(1)),
      j6: Number((Math.random() * 360).toFixed(1))
    },
    joint_velocities: {
      j1: Number((Math.random() * 50).toFixed(1)),
      j2: Number((Math.random() * 50).toFixed(1)),
      j3: Number((Math.random() * 50).toFixed(1)),
      j4: Number((Math.random() * 50).toFixed(1)),
      j5: Number((Math.random() * 50).toFixed(1)),
      j6: Number((Math.random() * 50).toFixed(1))
    },
    joint_torques: {
      j1: Number((Math.random() * 100).toFixed(1)),
      j2: Number((Math.random() * 100).toFixed(1)),
      j3: Number((Math.random() * 100).toFixed(1)),
      j4: Number((Math.random() * 100).toFixed(1)),
      j5: Number((Math.random() * 100).toFixed(1)),
      j6: Number((Math.random() * 100).toFixed(1))
    },
    timestamp: new Date().toISOString()
  };
};

export const mockAlerts: SystemAlert[] = [
  {
    id: 'alert-1',
    arm_id: '3',
    severity: 'critical',
    category: 'mechanical',
    message: 'Joint 3 torque exceeds safety threshold',
    acknowledged: false,
    resolved: false,
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString()
  },
  {
    id: 'alert-2',
    arm_id: '1',
    severity: 'warning',
    category: 'electrical',
    message: 'Power consumption approaching upper limit',
    acknowledged: true,
    acknowledged_by: 'System Admin',
    acknowledged_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    resolved: false,
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString()
  },
  {
    id: 'alert-3',
    arm_id: '2',
    severity: 'info',
    category: 'software',
    message: 'Firmware update available',
    acknowledged: false,
    resolved: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString()
  },
  {
    id: 'alert-4',
    arm_id: '3',
    severity: 'critical',
    category: 'electrical',
    message: 'Temperature sensor reading abnormal values',
    acknowledged: false,
    resolved: false,
    created_at: new Date(Date.now() - 1000 * 60 * 10).toISOString()
  }
];
