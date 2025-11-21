import { supabase } from '../lib/supabase';
import { RoboticArm, DiagnosticMetrics, SystemAlert, MachinePart, MachinePartInstance, MaintenanceHistory } from '../types';

export const database = {
  arms: {
    async getAll(): Promise<RoboticArm[]> {
      if (!supabase) throw new Error('Database not available');

      const { data, error } = await supabase
        .from('robotic_arms')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data || [];
    },

    async create(arm: Omit<RoboticArm, 'id'>): Promise<RoboticArm> {
      if (!supabase) throw new Error('Database not available');

      const { data, error } = await supabase
        .from('robotic_arms')
        .insert(arm)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    async update(id: string, updates: Partial<RoboticArm>): Promise<RoboticArm> {
      if (!supabase) throw new Error('Database not available');

      const { data, error } = await supabase
        .from('robotic_arms')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    async delete(id: string): Promise<void> {
      if (!supabase) throw new Error('Database not available');

      const { error } = await supabase
        .from('robotic_arms')
        .delete()
        .eq('id', id);

      if (error) throw error;
    }
  },

  metrics: {
    async getLatest(armId: string): Promise<DiagnosticMetrics | null> {
      if (!supabase) throw new Error('Database not available');

      const { data, error } = await supabase
        .from('diagnostic_metrics')
        .select('*')
        .eq('arm_id', armId)
        .order('timestamp', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data;
    },

    async create(metrics: Omit<DiagnosticMetrics, 'id'>): Promise<DiagnosticMetrics> {
      if (!supabase) throw new Error('Database not available');

      const { data, error } = await supabase
        .from('diagnostic_metrics')
        .insert(metrics)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    async getHistory(armId: string, limit: number = 100): Promise<DiagnosticMetrics[]> {
      if (!supabase) throw new Error('Database not available');

      const { data, error } = await supabase
        .from('diagnostic_metrics')
        .select('*')
        .eq('arm_id', armId)
        .order('timestamp', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    }
  },

  alerts: {
    async getAll(): Promise<SystemAlert[]> {
      if (!supabase) throw new Error('Database not available');

      const { data, error } = await supabase
        .from('system_alerts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },

    async getByArm(armId: string): Promise<SystemAlert[]> {
      if (!supabase) throw new Error('Database not available');

      const { data, error } = await supabase
        .from('system_alerts')
        .select('*')
        .eq('arm_id', armId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },

    async create(alert: Omit<SystemAlert, 'id'>): Promise<SystemAlert> {
      if (!supabase) throw new Error('Database not available');

      const { data, error } = await supabase
        .from('system_alerts')
        .insert(alert)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    async acknowledge(id: string, acknowledgedBy: string): Promise<SystemAlert> {
      if (!supabase) throw new Error('Database not available');

      const { data, error } = await supabase
        .from('system_alerts')
        .update({
          acknowledged: true,
          acknowledged_by: acknowledgedBy,
          acknowledged_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    async resolve(id: string): Promise<SystemAlert> {
      if (!supabase) throw new Error('Database not available');

      const { data, error } = await supabase
        .from('system_alerts')
        .update({ resolved: true })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  },

  parts: {
    async getAll(): Promise<MachinePart[]> {
      if (!supabase) throw new Error('Database not available');

      const { data, error } = await supabase
        .from('machine_parts')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      return data || [];
    },

    async getByModel(model: string): Promise<MachinePart[]> {
      if (!supabase) throw new Error('Database not available');

      const { data, error } = await supabase
        .from('machine_parts')
        .select('*')
        .contains('compatible_models', [model])
        .order('category', { ascending: true });

      if (error) throw error;
      return data || [];
    }
  },

  partInstances: {
    async getByArm(armId: string): Promise<MachinePartInstance[]> {
      if (!supabase) throw new Error('Database not available');

      const { data, error } = await supabase
        .from('machine_part_instances')
        .select('*')
        .eq('arm_id', armId)
        .order('hours_used', { ascending: false });

      if (error) throw error;
      return data || [];
    },

    async create(instance: Omit<MachinePartInstance, 'id' | 'created_at'>): Promise<MachinePartInstance> {
      if (!supabase) throw new Error('Database not available');

      const { data, error } = await supabase
        .from('machine_part_instances')
        .insert(instance)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    async updateHours(id: string, hoursUsed: number): Promise<MachinePartInstance> {
      if (!supabase) throw new Error('Database not available');

      const { data, error } = await supabase
        .from('machine_part_instances')
        .update({ hours_used: hoursUsed })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  },

  maintenance: {
    async getByArm(armId: string): Promise<MaintenanceHistory[]> {
      if (!supabase) throw new Error('Database not available');

      const { data, error } = await supabase
        .from('maintenance_history')
        .select('*')
        .eq('arm_id', armId)
        .order('performed_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },

    async create(record: Omit<MaintenanceHistory, 'id' | 'created_at'>): Promise<MaintenanceHistory> {
      if (!supabase) throw new Error('Database not available');

      const { data, error } = await supabase
        .from('maintenance_history')
        .insert(record)
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  }
};
