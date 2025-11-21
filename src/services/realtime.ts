import { supabase } from '../lib/supabase';
import { RoboticArm, DiagnosticMetrics, SystemAlert } from '../types';

export const realtimeService = {
  subscribeToArms(
    onInsert: (arm: RoboticArm) => void,
    onUpdate: (arm: RoboticArm) => void,
    onDelete: (armId: string) => void
  ) {
    if (!supabase) return null;

    const channel = supabase
      .channel('robotic_arms_changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'robotic_arms' },
        (payload) => {
          onInsert(payload.new as RoboticArm);
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'robotic_arms' },
        (payload) => {
          onUpdate(payload.new as RoboticArm);
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'robotic_arms' },
        (payload) => {
          onDelete(payload.old.id);
        }
      )
      .subscribe();

    return channel;
  },

  subscribeToMetrics(
    armId: string | null,
    onMetrics: (metrics: DiagnosticMetrics) => void
  ) {
    if (!supabase) return null;

    const filter = armId ? { arm_id: `eq.${armId}` } : {};

    const channel = supabase
      .channel('diagnostic_metrics_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'diagnostic_metrics',
          filter: armId ? `arm_id=eq.${armId}` : undefined
        },
        (payload) => {
          onMetrics(payload.new as DiagnosticMetrics);
        }
      )
      .subscribe();

    return channel;
  },

  subscribeToAlerts(
    onInsert: (alert: SystemAlert) => void,
    onUpdate: (alert: SystemAlert) => void
  ) {
    if (!supabase) return null;

    const channel = supabase
      .channel('system_alerts_changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'system_alerts' },
        (payload) => {
          onInsert(payload.new as SystemAlert);
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'system_alerts' },
        (payload) => {
          onUpdate(payload.new as SystemAlert);
        }
      )
      .subscribe();

    return channel;
  },

  unsubscribe(channel: any) {
    if (channel) {
      supabase?.removeChannel(channel);
    }
  }
};
