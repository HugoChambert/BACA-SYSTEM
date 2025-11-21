#!/usr/bin/env python3

"""
BACA Robotic Arm Simulator

This script simulates a robotic arm sending diagnostic data to the dashboard.
Use this to test the real-time data flow and verify your dashboard is working.

Usage:
    python test-arm-simulator.py <arm_id>

Example:
    python test-arm-simulator.py 3e77b0e6-e8c0-4fbb-bf74-5da012218240
"""

import sys
import time
import json
import random
import signal
import requests

SUPABASE_URL = 'https://tiwmxizhofixjuoydnvg.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpd214aXpob2ZpeGp1b3lkbnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3NTQ1MzAsImV4cCI6MjA3OTMzMDUzMH0.G6BuNYTyfgEt4VXxWIfyoORztFYqESgZxxuGUuNoBVs'

headers = {
    'apikey': SUPABASE_KEY,
    'Content-Type': 'application/json'
}

class RoboticArmSimulator:
    def __init__(self, arm_id):
        self.arm_id = arm_id
        self.temperature = 40.0
        self.power_consumption = 280.0
        self.cpu_usage = 45.0
        self.memory_usage = 50.0
        self.operation_hours = 1000.0
        self.error_count = 0
        self.running = True

    def random_change(self, value, min_val, max_val, change_rate=2):
        change = (random.random() - 0.5) * change_rate
        new_value = value + change
        return max(min_val, min(max_val, new_value))

    def generate_joint_data(self):
        return {
            'j1': random.uniform(-90, 90),
            'j2': random.uniform(-90, 90),
            'j3': random.uniform(-90, 90),
            'j4': random.uniform(-180, 180),
            'j5': random.uniform(-90, 90),
            'j6': random.uniform(-180, 180)
        }

    def send_metrics(self):
        self.temperature = self.random_change(self.temperature, 30, 55, 1)
        self.power_consumption = self.random_change(self.power_consumption, 200, 350, 5)
        self.cpu_usage = self.random_change(self.cpu_usage, 20, 90, 3)
        self.memory_usage = self.random_change(self.memory_usage, 30, 85, 2)
        self.operation_hours += 0.0014

        metrics = {
            'arm_id': self.arm_id,
            'temperature': round(self.temperature, 1),
            'power_consumption': round(self.power_consumption, 1),
            'cpu_usage': round(self.cpu_usage, 1),
            'memory_usage': round(self.memory_usage, 1),
            'error_count': self.error_count,
            'operation_hours': round(self.operation_hours, 1),
            'joint_positions': self.generate_joint_data(),
            'joint_velocities': self.generate_joint_data(),
            'joint_torques': {
                'j1': random.uniform(20, 80),
                'j2': random.uniform(20, 80),
                'j3': random.uniform(20, 80),
                'j4': random.uniform(20, 80),
                'j5': random.uniform(20, 80),
                'j6': random.uniform(20, 80)
            }
        }

        try:
            response = requests.post(
                f'{SUPABASE_URL}/rest/v1/diagnostic_metrics',
                headers=headers,
                json=metrics
            )

            if response.status_code == 201:
                print(f"✓ Metrics sent - Temp: {metrics['temperature']}°C, "
                      f"Power: {metrics['power_consumption']}W, "
                      f"CPU: {metrics['cpu_usage']}%")

                if self.temperature > 50:
                    self.send_alert('warning', 'mechanical',
                                  f'Temperature elevated: {self.temperature:.1f}°C')
                if self.power_consumption > 320:
                    self.send_alert('warning', 'electrical',
                                  f'High power consumption: {self.power_consumption:.1f}W')
            else:
                print(f'✗ Failed to send metrics: {response.status_code}')
        except Exception as e:
            print(f'✗ Error sending metrics: {e}')

    def send_alert(self, severity, category, message):
        alert = {
            'arm_id': self.arm_id,
            'severity': severity,
            'category': category,
            'message': message,
            'acknowledged': False,
            'resolved': False
        }

        try:
            response = requests.post(
                f'{SUPABASE_URL}/rest/v1/system_alerts',
                headers=headers,
                json=alert
            )

            if response.status_code == 201:
                print(f'⚠ Alert sent: {message}')
        except Exception as e:
            print(f'✗ Error sending alert: {e}')

    def update_status(self, status):
        try:
            response = requests.patch(
                f'{SUPABASE_URL}/rest/v1/robotic_arms?id=eq.{self.arm_id}',
                headers=headers,
                json={'status': status}
            )

            if response.status_code == 200:
                print(f'✓ Status updated to: {status}')
        except Exception as e:
            print(f'✗ Error updating status: {e}')

    def run(self):
        print('BACA Robotic Arm Simulator Started')
        print(f'Arm ID: {self.arm_id}')
        print('Sending metrics every 5 seconds...')
        print('Press Ctrl+C to stop\n')

        self.update_status('online')

        def signal_handler(sig, frame):
            print('\n\nShutting down...')
            self.running = False
            self.update_status('offline')
            print('Goodbye!')
            sys.exit(0)

        signal.signal(signal.SIGINT, signal_handler)

        self.send_metrics()

        while self.running:
            time.sleep(5)
            self.send_metrics()


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Error: Please provide an arm ID')
        print('Usage: python test-arm-simulator.py <arm_id>')
        print('\nTo get an arm ID:')
        print('1. Open the dashboard')
        print('2. Add a new robotic arm')
        print('3. Check the database or browser console for the arm ID')
        sys.exit(1)

    arm_id = sys.argv[1]
    simulator = RoboticArmSimulator(arm_id)
    simulator.run()
