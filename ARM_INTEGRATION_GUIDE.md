# BACA Robotic Arm Integration Guide

This guide explains how to integrate your physical robotic arms with the BACA Diagnostics Dashboard to get real-time monitoring.

## Database Connection Details

Your Supabase database is already configured. Use these credentials:

- **URL**: `https://tiwmxizhofixjuoydnvg.supabase.co`
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpd214aXpob2ZpeGp1b3lkbnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3NTQ1MzAsImV4cCI6MjA3OTMzMDUzMH0.G6BuNYTyfgEt4VXxWIfyoORztFYqESgZxxuGUuNoBVs`

## Step 1: Register Your Robotic Arm

First, register your robotic arm in the system. You can do this through the dashboard UI or via API.

### Via API (REST)

```bash
curl -X POST 'https://tiwmxizhofixjuoydnvg.supabase.co/rest/v1/robotic_arms' \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpd214aXpob2ZpeGp1b3lkbnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3NTQ1MzAsImV4cCI6MjA3OTMzMDUzMH0.G6BuNYTyfgEt4VXxWIfyoORztFYqESgZxxuGUuNoBVs" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "name": "BACA-ARM-05",
    "serial_number": "BA-2024-005",
    "model": "BACA-6000",
    "status": "online",
    "location": "Production Line C"
  }'
```

**Response:** You'll receive the full arm object including the generated `id`. Save this ID for sending metrics.

## Step 2: Send Diagnostic Metrics

Your robotic arm should send diagnostic data periodically (recommended: every 1-10 seconds).

### Metrics Data Structure

```json
{
  "arm_id": "YOUR_ARM_ID_FROM_STEP_1",
  "temperature": 42.5,
  "power_consumption": 280.3,
  "cpu_usage": 45.2,
  "memory_usage": 52.1,
  "error_count": 0,
  "operation_hours": 1523.5,
  "joint_positions": {
    "j1": 45.0,
    "j2": -30.5,
    "j3": 60.2,
    "j4": 180.0,
    "j5": -45.3,
    "j6": 90.0
  },
  "joint_velocities": {
    "j1": 12.5,
    "j2": 8.3,
    "j3": 15.2,
    "j4": 20.1,
    "j5": 10.5,
    "j6": 18.0
  },
  "joint_torques": {
    "j1": 45.2,
    "j2": 38.5,
    "j3": 52.3,
    "j4": 60.1,
    "j5": 42.8,
    "j6": 55.0
  }
}
```

### Send Metrics via cURL

```bash
curl -X POST 'https://tiwmxizhofixjuoydnvg.supabase.co/rest/v1/diagnostic_metrics' \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpd214aXpob2ZpeGp1b3lkbnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3NTQ1MzAsImV4cCI6MjA3OTMzMDUzMH0.G6BuNYTyfgEt4VXxWIfyoORztFYqESgZxxuGUuNoBVs" \
  -H "Content-Type: application/json" \
  -d '{
    "arm_id": "YOUR_ARM_ID",
    "temperature": 42.5,
    "power_consumption": 280.3,
    "cpu_usage": 45.2,
    "memory_usage": 52.1,
    "error_count": 0,
    "operation_hours": 1523.5,
    "joint_positions": {"j1": 45.0, "j2": -30.5, "j3": 60.2, "j4": 180.0, "j5": -45.3, "j6": 90.0},
    "joint_velocities": {"j1": 12.5, "j2": 8.3, "j3": 15.2, "j4": 20.1, "j5": 10.5, "j6": 18.0},
    "joint_torques": {"j1": 45.2, "j2": 38.5, "j3": 52.3, "j4": 60.1, "j5": 42.8, "j6": 55.0}
  }'
```

### Python Example

```python
import requests
import time
import json

SUPABASE_URL = "https://tiwmxizhofixjuoydnvg.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpd214aXpob2ZpeGp1b3lkbnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3NTQ1MzAsImV4cCI6MjA3OTMzMDUzMH0.G6BuNYTyfgEt4VXxWIfyoORztFYqESgZxxuGUuNoBVs"

headers = {
    "apikey": SUPABASE_KEY,
    "Content-Type": "application/json"
}

def send_metrics(arm_id, temperature, power, cpu, memory, errors, hours, joints):
    """Send diagnostic metrics to the dashboard"""

    data = {
        "arm_id": arm_id,
        "temperature": temperature,
        "power_consumption": power,
        "cpu_usage": cpu,
        "memory_usage": memory,
        "error_count": errors,
        "operation_hours": hours,
        "joint_positions": joints["positions"],
        "joint_velocities": joints["velocities"],
        "joint_torques": joints["torques"]
    }

    response = requests.post(
        f"{SUPABASE_URL}/rest/v1/diagnostic_metrics",
        headers=headers,
        json=data
    )

    return response.status_code == 201

def update_arm_status(arm_id, status):
    """Update the arm's operational status"""

    data = {"status": status}

    response = requests.patch(
        f"{SUPABASE_URL}/rest/v1/robotic_arms?id=eq.{arm_id}",
        headers=headers,
        json=data
    )

    return response.status_code == 200

# Example usage
ARM_ID = "your-arm-id-here"

while True:
    # Read sensor data from your robotic arm
    metrics = {
        "temperature": read_temperature(),
        "power": read_power_consumption(),
        "cpu": read_cpu_usage(),
        "memory": read_memory_usage(),
        "errors": get_error_count(),
        "hours": get_operation_hours(),
        "joints": {
            "positions": get_joint_positions(),
            "velocities": get_joint_velocities(),
            "torques": get_joint_torques()
        }
    }

    # Send to dashboard
    if send_metrics(ARM_ID, **metrics):
        print("Metrics sent successfully")
    else:
        print("Failed to send metrics")

    time.sleep(5)  # Send every 5 seconds
```

### Node.js Example

```javascript
const axios = require('axios');

const SUPABASE_URL = 'https://tiwmxizhofixjuoydnvg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpd214aXpob2ZpeGp1b3lkbnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3NTQ1MzAsImV4cCI6MjA3OTMzMDUzMH0.G6BuNYTyfgEt4VXxWIfyoORztFYqESgZxxuGUuNoBVs';

const headers = {
  'apikey': SUPABASE_KEY,
  'Content-Type': 'application/json'
};

async function sendMetrics(armId, metrics) {
  try {
    const response = await axios.post(
      `${SUPABASE_URL}/rest/v1/diagnostic_metrics`,
      {
        arm_id: armId,
        temperature: metrics.temperature,
        power_consumption: metrics.power,
        cpu_usage: metrics.cpu,
        memory_usage: metrics.memory,
        error_count: metrics.errors,
        operation_hours: metrics.hours,
        joint_positions: metrics.joints.positions,
        joint_velocities: metrics.joints.velocities,
        joint_torques: metrics.joints.torques
      },
      { headers }
    );

    return response.status === 201;
  } catch (error) {
    console.error('Failed to send metrics:', error);
    return false;
  }
}

// Example usage
const ARM_ID = 'your-arm-id-here';

setInterval(async () => {
  const metrics = {
    temperature: readTemperature(),
    power: readPowerConsumption(),
    cpu: readCpuUsage(),
    memory: readMemoryUsage(),
    errors: getErrorCount(),
    hours: getOperationHours(),
    joints: {
      positions: getJointPositions(),
      velocities: getJointVelocities(),
      torques: getJointTorques()
    }
  };

  const success = await sendMetrics(ARM_ID, metrics);
  console.log(success ? 'Metrics sent' : 'Failed to send metrics');
}, 5000);
```

## Step 3: Send Alerts

Your robotic arm can automatically create alerts when issues are detected.

```bash
curl -X POST 'https://tiwmxizhofixjuoydnvg.supabase.co/rest/v1/system_alerts' \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpd214aXpob2ZpeGp1b3lkbnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3NTQ1MzAsImV4cCI6MjA3OTMzMDUzMH0.G6BuNYTyfgEt4VXxWIfyoORztFYqESgZxxuGUuNoBVs" \
  -H "Content-Type: application/json" \
  -d '{
    "arm_id": "YOUR_ARM_ID",
    "severity": "critical",
    "category": "mechanical",
    "message": "Joint 3 temperature exceeds safe threshold",
    "acknowledged": false,
    "resolved": false
  }'
```

**Alert Severity Levels:**
- `critical` - Immediate action required
- `warning` - Attention needed soon
- `info` - Informational message

**Alert Categories:**
- `mechanical` - Mechanical issues
- `electrical` - Electrical problems
- `software` - Software errors
- `network` - Network connectivity issues

## Step 4: Update Arm Status

Update your arm's status based on its operational state:

```bash
curl -X PATCH 'https://tiwmxizhofixjuoydnvg.supabase.co/rest/v1/robotic_arms?id=eq.YOUR_ARM_ID' \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpd214aXpob2ZpeGp1b3lkbnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3NTQ1MzAsImV4cCI6MjA3OTMzMDUzMH0.G6BuNYTyfgEt4VXxWIfyoORztFYqESgZxxuGUuNoBVs" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "online"
  }'
```

**Valid Status Values:**
- `online` - Operating normally
- `offline` - Not connected
- `maintenance` - Undergoing maintenance
- `error` - Error state

## Real-Time Updates

The dashboard uses Supabase real-time subscriptions, so:
- New metrics appear instantly when you insert them
- Status changes are reflected immediately
- Alerts show up in real-time
- No polling or refresh required!

## Testing Your Integration

1. Register a test arm through the dashboard
2. Note the arm ID from the database
3. Use the Python/Node.js examples to send test metrics
4. Watch the dashboard update in real-time!

## Troubleshooting

**Problem:** Data not appearing in dashboard
- Verify your arm_id is correct
- Check that the arm exists in the robotic_arms table
- Ensure your API key is correct

**Problem:** Metrics not updating
- Confirm you're sending data to the correct endpoint
- Check network connectivity
- Verify JSON structure matches the schema

**Problem:** Connection refused
- Ensure Supabase URL is correct
- Verify your API key hasn't expired
- Check firewall settings

## Support

For additional help, check the Supabase documentation at https://supabase.com/docs
