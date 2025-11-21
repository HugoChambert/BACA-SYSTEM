export interface RoboticArm {
  id: string;
  name: string;
  serial_number: string;
  model: string;
  status: 'online' | 'offline' | 'maintenance' | 'error';
  location: string;
  installed_at: string;
  last_maintenance: string;
}

export interface DiagnosticMetrics {
  id: string;
  arm_id: string;
  temperature: number;
  power_consumption: number;
  cpu_usage: number;
  memory_usage: number;
  error_count: number;
  operation_hours: number;
  joint_positions: Record<string, number>;
  joint_velocities: Record<string, number>;
  joint_torques: Record<string, number>;
  timestamp: string;
}

export interface SystemAlert {
  id: string;
  arm_id: string;
  severity: 'critical' | 'warning' | 'info';
  category: 'mechanical' | 'electrical' | 'software' | 'network';
  message: string;
  acknowledged: boolean;
  acknowledged_by?: string;
  acknowledged_at?: string;
  resolved: boolean;
  created_at: string;
}

export interface MachinePart {
  id: string;
  name: string;
  part_number: string;
  category: string;
  lifespan_hours: number;
  cost: number;
  description: string;
  compatible_models: string[];
  created_at: string;
}

export interface MachinePartInstance {
  id: string;
  arm_id: string;
  part_id: string;
  installed_at: string;
  hours_used: number;
  status: string;
  last_inspection?: string;
  notes?: string;
  created_at: string;
}

export interface MaintenanceHistory {
  id: string;
  arm_id: string;
  part_instance_id?: string;
  maintenance_type: string;
  description: string;
  technician?: string;
  cost?: number;
  performed_at: string;
  created_at: string;
}
