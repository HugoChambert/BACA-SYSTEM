# Parts Management & Maintenance Tracking

Comprehensive system for tracking machine parts, monitoring wear, and scheduling replacements across all stone fabrication equipment.

## Overview

The BACA Diagnostics Dashboard now includes advanced parts management capabilities designed specifically for stone fabrication machines. The system automatically tracks part usage, calculates remaining lifespan, and suggests replacements before failures occur.

## Supported Stone Fabrication Machines

### Bridge Saws
- **Bridge Saw BS-3000** - Entry-level bridge saw for general cutting
- **Bridge Saw BS-5000** - Mid-range with precision controls
- **Bridge Saw BS-7000** - Industrial heavy-duty bridge saw

### CNC Routers
- **CNC Router CR-5000** - 5-axis CNC router for detailed work
- **CNC Router CR-7000** - High-precision 7-axis routing system

### Edge Polishers
- **Edge Polisher EP-2000** - Compact edge polishing system
- **Edge Polisher EP-3000** - Industrial multi-stage polisher

### Waterjet Cutters
- **Waterjet Cutter WJ-4000** - Ultra-high pressure waterjet
- **Waterjet Cutter WJ-6000** - Multi-head waterjet system

## Parts Categories

### Cutting Components
- Diamond bridge saw blades (16", 20")
- Router bits (diamond core 6mm, 12mm, profile)
- Waterjet nozzles and mixing tubes

### Mechanical Systems
- Linear rail bearing sets
- Hydraulic cylinders
- Belt drive assemblies
- Vacuum pump motors
- Abrasive hopper valves

### Electrical Components
- Servo motors (3kW)
- Spindle motors (7.5kW)
- Control boards
- Proximity sensors
- Emergency stop buttons
- Variable frequency drives

### Hydraulic Systems
- Hydraulic pump units
- High-pressure cylinders

### Cooling & Filtration
- Water pump assemblies
- Coolant filter cartridges
- Dust collection filters

### Polishing Components
- Polishing pads (50, 100, 200, 400, 800 grit)
- Buffing pads

### Display & Interface
- Touch screen displays (15")

## How It Works

### Automatic Tracking

1. **Part Registration**: Parts are added to machines with installation date
2. **Usage Monitoring**: System tracks hours used based on machine operation hours
3. **Lifespan Calculation**: Each part has a defined lifespan in hours
4. **Status Updates**: Real-time status based on usage percentage:
   - **Good** (0-60%): Normal operation
   - **Caution** (60-80%): Plan replacement soon
   - **Warning** (80-100%): Schedule replacement
   - **Critical** (100%+): Replace immediately

### Replacement Suggestions

The system automatically:
- Calculates remaining hours for each part
- Highlights parts approaching end of life
- Displays replacement cost
- Shows compatible replacement parts
- Suggests preventive maintenance timing

## Parts Data Structure

### Machine Part
```json
{
  "name": "Diamond Bridge Saw Blade 20\"",
  "part_number": "DSB-20-001",
  "category": "cutting",
  "lifespan_hours": 500,
  "cost": 650.00,
  "description": "Premium diamond blade for bridge saws",
  "compatible_models": ["Bridge Saw BS-5000", "Bridge Saw BS-7000"]
}
```

### Part Instance
```json
{
  "arm_id": "machine-uuid",
  "part_id": "part-uuid",
  "installed_at": "2024-01-15T10:00:00Z",
  "hours_used": 410,
  "status": "warning",
  "last_inspection": "2024-11-15T14:30:00Z",
  "notes": "Slight wear observed on edge"
}
```

## Dashboard Features

### Parts Panel Display

For each machine, the dashboard shows:

1. **Installed Parts List**
   - Part name and number
   - Current status with color coding
   - Usage percentage and hours
   - Remaining lifespan
   - Replacement cost
   - Installation date

2. **Visual Indicators**
   - Red: Critical - Replace immediately
   - Orange: Warning - Schedule replacement
   - Yellow: Caution - Plan ahead
   - Green: Good condition

3. **Available Parts**
   - Compatible parts for the machine model
   - Part specifications
   - Pricing information
   - Expected lifespan

### Color Coding

- 🔴 **Red (Critical)**: Usage ≥ 100% - Immediate action required
- 🟠 **Orange (Warning)**: Usage 80-99% - Schedule replacement
- 🟡 **Yellow (Caution)**: Usage 60-79% - Plan replacement
- 🟢 **Green (Good)**: Usage 0-59% - Normal operation

## Example Scenarios

### Bridge Saw BS-5000

**BACA-ARM-01** has:
- Diamond Blade (DSB-20-001): 410/500 hours (82% - Warning ⚠️)
  - Replacement Cost: $650
  - Remaining: 90 hours
  - **Action**: Schedule replacement within 2 weeks

- Linear Rail Bearings (LRB-001): 2500/3000 hours (83% - Caution ⚠️)
  - Replacement Cost: $320
  - Remaining: 500 hours
  - **Action**: Order parts, schedule maintenance

- Water Pump (WPA-001): 1200/2000 hours (60% - Good ✓)
  - Replacement Cost: $285
  - Remaining: 800 hours
  - **Action**: Continue monitoring

### CNC Router CR-5000

**BACA-ARM-02** has:
- Router Bit 6mm (RBD-6-001): 295/300 hours (98% - Critical 🔴)
  - Replacement Cost: $85
  - Remaining: 5 hours
  - **Action**: REPLACE IMMEDIATELY

- Vacuum Pump (VPM-5HP-001): 3200/4000 hours (80% - Caution)
  - Replacement Cost: $680
  - Remaining: 800 hours
  - **Action**: Order replacement

### Edge Polisher EP-2000

**BACA-ARM-03** has multiple polishing pads at various stages:
- Grit 50 Pad: 145/150 hours (97% - Critical)
- Grit 800 Pad: 130/150 hours (87% - Warning)
- Belt Drive: 2100/2500 hours (84% - Caution)

**Action**: Order complete pad set for next maintenance

## Database Schema

### Tables

**machine_parts**
- Master catalog of all available parts
- Specifications and compatibility
- Lifespan and cost information

**machine_part_instances**
- Tracks installed parts on each machine
- Usage hours and status
- Installation and inspection dates

**maintenance_history**
- Complete maintenance log
- Part replacements
- Technician notes and costs

## API Integration

### Get Machine Parts
```javascript
const parts = await database.parts.getByModel('Bridge Saw BS-5000');
```

### Get Installed Parts
```javascript
const instances = await database.partInstances.getByArm(machineId);
```

### Update Part Hours
```javascript
await database.partInstances.updateHours(partId, newHours);
```

### Log Maintenance
```javascript
await database.maintenance.create({
  arm_id: machineId,
  part_instance_id: partId,
  maintenance_type: 'replacement',
  description: 'Replaced diamond blade',
  technician: 'John Smith',
  cost: 650.00,
  performed_at: new Date().toISOString()
});
```

## Maintenance Workflow

1. **Monitor Dashboard**: Check parts status daily
2. **Identify Issues**: Look for yellow/orange/red indicators
3. **Order Parts**: Use displayed part numbers and costs
4. **Schedule Maintenance**: Plan downtime during off-peak
5. **Replace Parts**: Perform maintenance with qualified technician
6. **Log Work**: Record maintenance in system
7. **Update Status**: System automatically tracks new part

## Benefits

### Cost Savings
- Prevent emergency repairs
- Bulk order replacement parts
- Reduce machine downtime
- Extend equipment life

### Operational Efficiency
- Schedule maintenance during downtime
- Keep critical parts in stock
- Plan technician availability
- Track maintenance costs

### Data-Driven Decisions
- Identify high-wear components
- Optimize replacement schedules
- Budget for upcoming maintenance
- Analyze part performance

## Future Enhancements

- Automated ordering integration
- Predictive failure analysis
- Mobile maintenance app
- Vendor management
- Warranty tracking
- Part supplier integration

## Support

For parts-related questions:
1. Check the dashboard's Parts Panel
2. Review this documentation
3. Contact your parts supplier with part numbers
4. Consult machine manual for specifications
