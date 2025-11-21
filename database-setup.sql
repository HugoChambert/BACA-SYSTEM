-- Robotic Arms Monitoring System Database Schema
-- Run this SQL in your Supabase SQL Editor to set up the database

-- Create robotic_arms table
CREATE TABLE IF NOT EXISTS robotic_arms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  model text NOT NULL,
  location text NOT NULL,
  status text NOT NULL DEFAULT 'offline',
  ip_address text NOT NULL,
  last_maintenance timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE robotic_arms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to robotic_arms"
  ON robotic_arms FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to robotic_arms"
  ON robotic_arms FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update to robotic_arms"
  ON robotic_arms FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete from robotic_arms"
  ON robotic_arms FOR DELETE
  USING (true);

-- Create diagnostic_metrics table
CREATE TABLE IF NOT EXISTS diagnostic_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  arm_id uuid NOT NULL REFERENCES robotic_arms(id) ON DELETE CASCADE,
  timestamp timestamptz DEFAULT now(),
  operation_hours numeric NOT NULL DEFAULT 0,
  cycle_count integer NOT NULL DEFAULT 0,
  temperature numeric NOT NULL DEFAULT 0,
  vibration numeric NOT NULL DEFAULT 0,
  power_consumption numeric NOT NULL DEFAULT 0,
  error_count integer NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_diagnostic_metrics_arm_id ON diagnostic_metrics(arm_id);
CREATE INDEX IF NOT EXISTS idx_diagnostic_metrics_timestamp ON diagnostic_metrics(timestamp DESC);

ALTER TABLE diagnostic_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to diagnostic_metrics"
  ON diagnostic_metrics FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to diagnostic_metrics"
  ON diagnostic_metrics FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update to diagnostic_metrics"
  ON diagnostic_metrics FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete from diagnostic_metrics"
  ON diagnostic_metrics FOR DELETE
  USING (true);

-- Create system_alerts table
CREATE TABLE IF NOT EXISTS system_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  arm_id uuid NOT NULL REFERENCES robotic_arms(id) ON DELETE CASCADE,
  severity text NOT NULL,
  message text NOT NULL,
  details text,
  acknowledged boolean DEFAULT false,
  acknowledged_by text,
  acknowledged_at timestamptz,
  resolved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_system_alerts_arm_id ON system_alerts(arm_id);
CREATE INDEX IF NOT EXISTS idx_system_alerts_created_at ON system_alerts(created_at DESC);

ALTER TABLE system_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to system_alerts"
  ON system_alerts FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to system_alerts"
  ON system_alerts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update to system_alerts"
  ON system_alerts FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete from system_alerts"
  ON system_alerts FOR DELETE
  USING (true);

-- Create machine_parts table
CREATE TABLE IF NOT EXISTS machine_parts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  part_number text NOT NULL UNIQUE,
  category text NOT NULL,
  compatible_models text[] NOT NULL DEFAULT '{}',
  expected_lifetime_hours numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_machine_parts_category ON machine_parts(category);

ALTER TABLE machine_parts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to machine_parts"
  ON machine_parts FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to machine_parts"
  ON machine_parts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update to machine_parts"
  ON machine_parts FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete from machine_parts"
  ON machine_parts FOR DELETE
  USING (true);

-- Create machine_part_instances table
CREATE TABLE IF NOT EXISTS machine_part_instances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  arm_id uuid NOT NULL REFERENCES robotic_arms(id) ON DELETE CASCADE,
  part_id uuid NOT NULL REFERENCES machine_parts(id) ON DELETE CASCADE,
  serial_number text,
  installed_at timestamptz DEFAULT now(),
  hours_used numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_machine_part_instances_arm_id ON machine_part_instances(arm_id);
CREATE INDEX IF NOT EXISTS idx_machine_part_instances_part_id ON machine_part_instances(part_id);

ALTER TABLE machine_part_instances ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to machine_part_instances"
  ON machine_part_instances FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to machine_part_instances"
  ON machine_part_instances FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update to machine_part_instances"
  ON machine_part_instances FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete from machine_part_instances"
  ON machine_part_instances FOR DELETE
  USING (true);

-- Create maintenance_history table
CREATE TABLE IF NOT EXISTS maintenance_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  arm_id uuid NOT NULL REFERENCES robotic_arms(id) ON DELETE CASCADE,
  maintenance_type text NOT NULL,
  description text NOT NULL,
  performed_by text NOT NULL,
  performed_at timestamptz NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_maintenance_history_arm_id ON maintenance_history(arm_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_history_performed_at ON maintenance_history(performed_at DESC);

ALTER TABLE maintenance_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to maintenance_history"
  ON maintenance_history FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to maintenance_history"
  ON maintenance_history FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update to maintenance_history"
  ON maintenance_history FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete from maintenance_history"
  ON maintenance_history FOR DELETE
  USING (true);
