# BACA Diagnostics Dashboard

Real-time monitoring and diagnostic system for BACA robotic arms with live data updates.

## Features

### Real-Time Monitoring
- Live metrics updates as robotic arms send data
- Real-time alerts and notifications
- WebSocket-based subscriptions for instant updates
- No page refresh required

### Comprehensive Diagnostics
- **System Metrics**: Temperature, power consumption, CPU/memory usage
- **Joint Analysis**: Positions, velocities, and torques for all 6 joints
- **Alert Management**: Categorized alerts with severity levels
- **Historical Tracking**: Operation hours and error counts
- **Status Monitoring**: Online/offline/maintenance/error states

### Dashboard Features
- Add, edit, and delete robotic arms
- Create manual alerts
- Acknowledge and resolve alerts
- View detailed arm information
- Real-time statistics in header
- Comprehensive help documentation

## Getting Started

### Prerequisites
- Node.js 18 or higher
- A Supabase account (database already configured)

### Installation

```bash
npm install
```

### Running the Dashboard

```bash
npm run dev
```

Open your browser to the URL shown (typically http://localhost:5173)

### Building for Production

```bash
npm run build
```

## Connecting Your Robotic Arms

### Quick Start

1. **Add a new robotic arm** through the dashboard UI (click the + button in sidebar)
2. **Note the arm ID** from the database
3. **Configure your arm** to send data to the Supabase endpoint
4. **Watch live updates** appear automatically!

### Testing with Simulators

We provide test simulators to verify your setup:

#### Node.js Simulator
```bash
node test-arm-simulator.js <arm_id>
```

#### Python Simulator
```bash
python test-arm-simulator.py <arm_id>
```

**Example:**
```bash
# Using existing test arm
node test-arm-simulator.js 3e77b0e6-e8c0-4fbb-bf74-5da012218240
```

The simulator will:
- Update arm status to "online"
- Send metrics every 5 seconds
- Generate realistic sensor data
- Create alerts when thresholds are exceeded
- Set status to "offline" when stopped (Ctrl+C)

### Integration Guide

See `ARM_INTEGRATION_GUIDE.md` for complete documentation including:
- REST API endpoints
- Data structures
- Python and Node.js examples
- cURL commands for testing
- Troubleshooting tips

## Database Schema

### Tables

**robotic_arms**
- Stores arm registration and basic info
- Fields: id, name, serial_number, model, status, location

**diagnostic_metrics**
- Real-time diagnostic data
- Fields: temperature, power, CPU/memory usage, joint data, timestamps

**system_alerts**
- Alert and notification system
- Fields: severity, category, message, acknowledgment status

## Architecture

### Frontend
- React + TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Lucide React for icons
- Supabase client for real-time data

### Backend
- Supabase (PostgreSQL + Real-time)
- Row Level Security (RLS) enabled
- REST API for data operations
- WebSocket subscriptions for live updates

### Real-Time Features
- Database changes trigger instant UI updates
- Multiple arms can send data simultaneously
- All connected dashboards update in sync
- No polling or manual refresh needed

## Test Data

The database is pre-populated with 3 test arms:

1. **BACA-ARM-01** (BA-2024-001) - Online on Production Line A
2. **BACA-ARM-02** (BA-2024-002) - Online on Production Line B
3. **BACA-ARM-03** (BA-2024-003) - Maintenance on Production Line C

Each has sample metrics and alerts to demonstrate all features.

## Features Overview

### Dashboard Header
- Total arms count
- Online arms count
- Error count
- Active alerts count
- Help button (?) for instructions

### Sidebar
- List of all registered arms
- Status indicators (color-coded)
- Add new arm button (+)
- Edit arm button (menu icon)

### Main Panel
- **Arm Details**: Model, location, serial number, operation hours
- **Metrics Panel**: Real-time sensor readings with progress bars
- **Alerts Panel**: Categorized alerts with severity badges
- **Joint Analysis**: Visual representation of all 6 joints

### Help System
Click the help button (?) to access:
- Connection instructions
- Dashboard usage guide
- Status indicator meanings
- Alert severity levels
- Best practices

## Development

### Project Structure
```
src/
├── components/          # React components
│   ├── AddArmModal.tsx
│   ├── AlertsPanel.tsx
│   ├── ArmDetails.tsx
│   ├── CreateAlertModal.tsx
│   ├── EditArmModal.tsx
│   ├── HelpPanel.tsx
│   ├── MetricsPanel.tsx
│   └── StatusCard.tsx
├── services/           # Business logic
│   ├── database.ts    # Database operations
│   └── realtime.ts    # WebSocket subscriptions
├── lib/
│   └── supabase.ts    # Supabase client
├── types.ts           # TypeScript definitions
├── mockData.ts        # Test data
└── App.tsx            # Main application
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Check TypeScript types

## API Endpoints

Base URL: `https://tiwmxizhofixjuoydnvg.supabase.co`

### Register Arm
```
POST /rest/v1/robotic_arms
```

### Send Metrics
```
POST /rest/v1/diagnostic_metrics
```

### Create Alert
```
POST /rest/v1/system_alerts
```

### Update Status
```
PATCH /rest/v1/robotic_arms?id=eq.<arm_id>
```

See `ARM_INTEGRATION_GUIDE.md` for detailed API documentation.

## Security

- Row Level Security (RLS) enabled on all tables
- Public read/write policies for development
- All data validated at database level
- API key authentication required

## Troubleshooting

### Dashboard shows no data
- Check browser console for errors
- Verify Supabase connection in `.env` file
- Ensure tables exist in database

### Real-time updates not working
- Check browser WebSocket connection
- Verify Supabase real-time is enabled
- Check for JavaScript console errors

### Simulator not connecting
- Verify arm ID is correct
- Check network connectivity
- Ensure API key is valid

## Support

For additional help:
- Check the Help panel (?) in the dashboard
- Review `ARM_INTEGRATION_GUIDE.md`
- Inspect browser console for errors
- Check Supabase dashboard logs

## License

MIT
