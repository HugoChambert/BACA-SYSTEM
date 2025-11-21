#!/usr/bin/env node

/**
 * BACA Robotic Arm Simulator
 *
 * This script simulates a robotic arm sending diagnostic data to the dashboard.
 * Use this to test the real-time data flow and verify your dashboard is working.
 *
 * Usage:
 *   node test-arm-simulator.js <arm_id>
 *
 * Example:
 *   node test-arm-simulator.js 3e77b0e6-e8c0-4fbb-bf74-5da012218240
 */

const SUPABASE_URL = 'https://tiwmxizhofixjuoydnvg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpd214aXpob2ZpeGp1b3lkbnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3NTQ1MzAsImV4cCI6MjA3OTMzMDUzMH0.G6BuNYTyfgEt4VXxWIfyoORztFYqESgZxxuGUuNoBVs';

const armId = process.argv[2];

if (!armId) {
  console.error('Error: Please provide an arm ID');
  console.log('Usage: node test-arm-simulator.js <arm_id>');
  console.log('\nTo get an arm ID:');
  console.log('1. Open the dashboard');
  console.log('2. Add a new robotic arm');
  console.log('3. Check the database or browser console for the arm ID');
  process.exit(1);
}

let temperature = 40;
let powerConsumption = 280;
let cpuUsage = 45;
let memoryUsage = 50;
let operationHours = 1000;
let errorCount = 0;

function randomChange(value, min, max, changeRate = 2) {
  const change = (Math.random() - 0.5) * changeRate;
  const newValue = value + change;
  return Math.max(min, Math.min(max, newValue));
}

function generateJointData() {
  return {
    j1: Math.random() * 180 - 90,
    j2: Math.random() * 180 - 90,
    j3: Math.random() * 180 - 90,
    j4: Math.random() * 360 - 180,
    j5: Math.random() * 180 - 90,
    j6: Math.random() * 360 - 180
  };
}

async function sendMetrics() {
  temperature = randomChange(temperature, 30, 55, 1);
  powerConsumption = randomChange(powerConsumption, 200, 350, 5);
  cpuUsage = randomChange(cpuUsage, 20, 90, 3);
  memoryUsage = randomChange(memoryUsage, 30, 85, 2);
  operationHours += 0.0014;

  const metrics = {
    arm_id: armId,
    temperature: Number(temperature.toFixed(1)),
    power_consumption: Number(powerConsumption.toFixed(1)),
    cpu_usage: Number(cpuUsage.toFixed(1)),
    memory_usage: Number(memoryUsage.toFixed(1)),
    error_count: errorCount,
    operation_hours: Number(operationHours.toFixed(1)),
    joint_positions: generateJointData(),
    joint_velocities: generateJointData(),
    joint_torques: {
      j1: Math.random() * 60 + 20,
      j2: Math.random() * 60 + 20,
      j3: Math.random() * 60 + 20,
      j4: Math.random() * 60 + 20,
      j5: Math.random() * 60 + 20,
      j6: Math.random() * 60 + 20
    }
  };

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/diagnostic_metrics`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(metrics)
    });

    if (response.ok) {
      console.log(`✓ Metrics sent - Temp: ${metrics.temperature}°C, Power: ${metrics.power_consumption}W, CPU: ${metrics.cpu_usage}%`);

      if (temperature > 50) {
        await sendAlert('warning', 'mechanical', `Temperature elevated: ${temperature.toFixed(1)}°C`);
      }
      if (powerConsumption > 320) {
        await sendAlert('warning', 'electrical', `High power consumption: ${powerConsumption.toFixed(1)}W`);
      }
    } else {
      console.error('✗ Failed to send metrics:', response.status, await response.text());
    }
  } catch (error) {
    console.error('✗ Error sending metrics:', error.message);
  }
}

async function sendAlert(severity, category, message) {
  const alert = {
    arm_id: armId,
    severity: severity,
    category: category,
    message: message,
    acknowledged: false,
    resolved: false
  };

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/system_alerts`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(alert)
    });

    if (response.ok) {
      console.log(`⚠ Alert sent: ${message}`);
    }
  } catch (error) {
    console.error('✗ Error sending alert:', error.message);
  }
}

async function updateStatus(status) {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/robotic_arms?id=eq.${armId}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });

    if (response.ok) {
      console.log(`✓ Status updated to: ${status}`);
    }
  } catch (error) {
    console.error('✗ Error updating status:', error.message);
  }
}

console.log('BACA Robotic Arm Simulator Started');
console.log(`Arm ID: ${armId}`);
console.log('Sending metrics every 5 seconds...');
console.log('Press Ctrl+C to stop\n');

updateStatus('online');

const interval = setInterval(sendMetrics, 5000);
sendMetrics();

process.on('SIGINT', async () => {
  console.log('\n\nShutting down...');
  clearInterval(interval);
  await updateStatus('offline');
  console.log('Goodbye!');
  process.exit(0);
});
