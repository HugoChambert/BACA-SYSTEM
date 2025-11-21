# Stone Fabrication Machine Setup Guide

Complete guide for setting up and monitoring stone fabrication equipment with the BACA Diagnostics Dashboard.

## Quick Start

Your dashboard is now configured for all stone fabrication machines with:
- ✅ 9 machine models across 4 categories
- ✅ 30 different parts in the catalog
- ✅ Real-time diagnostics and monitoring
- ✅ Automatic parts wear tracking
- ✅ Replacement suggestions based on lifespan

## Available Machine Models

### Bridge Saws
1. **Bridge Saw BS-3000** - Entry-level cutting
2. **Bridge Saw BS-5000** - Precision mid-range (TEST MACHINE)
3. **Bridge Saw BS-7000** - Heavy-duty industrial

### CNC Routers
4. **CNC Router CR-5000** - 5-axis precision (TEST MACHINE)
5. **CNC Router CR-7000** - 7-axis advanced

### Edge Polishers
6. **Edge Polisher EP-2000** - Compact polishing (TEST MACHINE)
7. **Edge Polisher EP-3000** - Multi-stage industrial

### Waterjet Cutters
8. **Waterjet Cutter WJ-4000** - Ultra-high pressure
9. **Waterjet Cutter WJ-6000** - Multi-head system

## Test Machines Already Configured

Three test machines with real data are ready to explore:

### BACA-ARM-01 (Bridge Saw BS-5000)
- Status: Online
- Location: Production Line A
- Parts Tracked: 3
  - Diamond Blade 20": 410/500 hours (82% - ⚠️ Replace Soon)
  - Water Pump: 1200/2000 hours (60% - ✅ Good)
  - Linear Rails: 2500/3000 hours (83% - ⚠️ Monitor)

### BACA-ARM-02 (CNC Router CR-5000)
- Status: Online
- Location: Production Line B
- Parts Tracked: 3
  - Router Bit 6mm: 295/300 hours (98% - 🔴 CRITICAL)
  - Spindle Motor: 1500/5000 hours (30% - ✅ Good)
  - Vacuum Pump: 3200/4000 hours (80% - ⚠️ Plan Ahead)

### BACA-ARM-03 (Edge Polisher EP-2000)
- Status: Maintenance
- Location: Production Line C
- Parts Tracked: 3
  - Polishing Pad (Grit 50): 145/150 hours (97% - 🔴 Replace)
  - Polishing Pad (Grit 800): 130/150 hours (87% - ⚠️ Warning)
  - Belt Drive: 2100/2500 hours (84% - ⚠️ Monitor)

## Adding Your First Machine

1. **Click the + button** in the sidebar
2. **Select machine type** from the dropdown:
   - Choose the model that matches your equipment
3. **Enter details**:
   - Name: Your machine identifier (e.g., "FAB-SHOP-BRIDGE-01")
   - Serial: Manufacturer serial number
   - Location: Physical location in your facility
4. **Click "Add Arm"**
5. **Machine appears** in sidebar with status indicator

## Configuring Parts Tracking

Parts are automatically tracked once your machine sends operation hours. The system:
- Updates part usage every minute
- Calculates remaining lifespan
- Changes status colors based on wear
- Suggests replacements at 80% usage

### Part Status Indicators

- 🟢 **Green (Good)**: 0-60% used - Normal operation
- 🟡 **Yellow (Caution)**: 60-80% used - Plan replacement
- 🟠 **Orange (Warning)**: 80-100% used - Schedule soon
- 🔴 **Red (Critical)**: 100%+ used - Replace immediately

## Real-Time Updates

The dashboard automatically updates when:
- Machines send new diagnostic data
- Operation hours increase
- Part usage crosses thresholds
- Alerts are created
- Status changes occur

No manual refresh required - everything updates live!

## Sending Data from Machines

Your stone fabrication machines should send:

```json
{
  "arm_id": "your-machine-id",
  "temperature": 42.5,
  "power_consumption": 285.3,
  "cpu_usage": 45.2,
  "memory_usage": 52.1,
  "error_count": 0,
  "operation_hours": 1523.5,
  "joint_positions": {...},
  "joint_velocities": {...},
  "joint_torques": {...}
}
```

See ARM_INTEGRATION_GUIDE.md for complete API documentation.

## Parts Catalog

30+ parts available including:

**Cutting Tools**
- Diamond bridge saw blades (16", 20")
- Router bits (6mm, 12mm, profile)
- Waterjet nozzles

**Motors & Drives**
- Servo motors (3kW)
- Spindle motors (7.5kW)
- Vacuum pumps (5HP)
- VFDs (5kW)

**Mechanical**
- Linear rail bearings
- Hydraulic cylinders
- Belt drives
- Mixing tubes

**Polishing**
- Pads (50, 100, 200, 400, 800 grit)
- Buffing pads

**Electrical**
- Control boards
- Touch screens
- Proximity sensors
- Emergency stops

**Filtration**
- Water pumps
- Coolant filters
- Dust collection filters

Each part includes:
- Part number for ordering
- Expected lifespan in hours
- Replacement cost
- Compatible machine models
- Detailed description

## Maintenance Workflow

### Daily
1. Check dashboard for red/orange indicators
2. Note any critical parts
3. Monitor active alerts

### Weekly
1. Review all yellow (caution) parts
2. Plan upcoming maintenance
3. Order replacement parts

### Monthly
1. Generate parts usage report
2. Analyze wear patterns
3. Budget for replacements
4. Schedule preventive maintenance

## Cost Savings

Real-world example from test data:

**Before Parts Tracking**
- Emergency blade replacement: $650 + 4 hours downtime
- Rush shipping: $150
- Lost production: ~$2000
- **Total Cost**: $2800

**With Parts Tracking**
- Scheduled replacement: $650
- Standard shipping: $25
- Planned 1-hour maintenance: $500
- **Total Cost**: $1175

**Savings**: $1625 per incident (58% reduction)

## Dashboard Sections

### Header Stats
- Total machines
- Online count
- Error count
- Active alerts

### Sidebar
- Machine list
- Status indicators
- Add machine button
- Edit machine options

### Main Panel (per machine)
- Machine details
- Real-time metrics
- **Parts Panel** (NEW!)
  - Installed parts with status
  - Usage percentages
  - Remaining hours
  - Replacement costs
  - Available compatible parts
- System alerts

## Testing the System

Use the included simulators to test:

```bash
# JavaScript simulator
node test-arm-simulator.js <machine-id>

# Python simulator
python test-arm-simulator.py <machine-id>
```

The simulator will:
- Set machine online
- Send metrics every 5 seconds
- Generate realistic sensor data
- Create alerts for thresholds
- Update parts usage
- Set offline when stopped

## Database Tables

**robotic_arms** - Machine registry
**diagnostic_metrics** - Real-time sensor data
**system_alerts** - Notifications and warnings
**machine_parts** - Parts catalog (30+ items)
**machine_part_instances** - Installed parts tracking
**maintenance_history** - Complete maintenance log

All with Row Level Security enabled and real-time subscriptions active.

## Documentation Files

- **README.md** - Overall project documentation
- **ARM_INTEGRATION_GUIDE.md** - API integration details
- **PARTS_MANAGEMENT.md** - Parts system deep dive
- **STONE_FABRICATION_SETUP.md** - This file

## Next Steps

1. ✅ Explore the three test machines
2. ✅ Check the Parts Panel on each
3. ✅ Note the critical router bit on BACA-ARM-02
4. ✅ Review available parts for each model
5. Add your real machines
6. Configure machine controllers
7. Start receiving live data
8. Monitor parts and schedule maintenance

## Support

Need help?
1. Click the help (?) button in dashboard
2. Review ARM_INTEGRATION_GUIDE.md
3. Check PARTS_MANAGEMENT.md
4. Inspect browser console for errors

Your stone fabrication monitoring system is ready!
