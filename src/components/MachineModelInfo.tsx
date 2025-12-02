import { Info, Gauge, Zap, Droplet, Wind, Ruler, Weight, Activity } from 'lucide-react';

interface MachineModelInfoProps {
  model: string;
}

const machineSpecs: Record<string, {
  category: string;
  description: string;
  specifications: {
    cuttingArea?: string;
    bladeSize?: string;
    motorPower?: string;
    pumpPressure?: string;
    waterFlow?: string;
    axes?: string;
    workArea?: string;
    spindleSpeed?: string;
    polishingSpeed?: string;
    polishingHeads?: string;
    maxThickness?: string;
    weight?: string;
    powerRequirement?: string;
    coolantSystem?: string;
  };
  capabilities: string[];
  applications: string[];
}> = {
  "Bridge Saw BS-3000": {
    category: "Bridge Saw",
    description: "Entry-level bridge saw designed for small to medium-scale stone fabrication operations. Ideal for countertops, tiles, and general stone cutting.",
    specifications: {
      cuttingArea: "3000mm x 2000mm",
      bladeSize: "400-600mm",
      motorPower: "11 kW (15 HP)",
      maxThickness: "80mm",
      weight: "3,500 kg",
      powerRequirement: "380V / 3-phase / 50-60Hz",
      coolantSystem: "Integrated water cooling"
    },
    capabilities: [
      "Straight and miter cuts",
      "45° angle cutting",
      "Automatic blade positioning",
      "Digital length measurement",
      "Water recycling system"
    ],
    applications: [
      "Kitchen countertops",
      "Bathroom vanities",
      "Flooring tiles",
      "General stone cutting"
    ]
  },
  "Bridge Saw BS-5000": {
    category: "Bridge Saw",
    description: "Mid-range bridge saw with enhanced precision and cutting capacity. Features advanced automation for improved productivity.",
    specifications: {
      cuttingArea: "5000mm x 2500mm",
      bladeSize: "600-800mm",
      motorPower: "18.5 kW (25 HP)",
      maxThickness: "120mm",
      weight: "5,800 kg",
      powerRequirement: "380V / 3-phase / 50-60Hz",
      coolantSystem: "Automatic water cooling with filtration"
    },
    capabilities: [
      "Full CNC control",
      "Multi-angle cutting (0-90°)",
      "Automatic tool changer",
      "Laser cutting guide",
      "Touch screen operation",
      "Material optimization software"
    ],
    applications: [
      "Large format countertops",
      "Commercial installations",
      "Architectural stone work",
      "Monument fabrication"
    ]
  },
  "Bridge Saw BS-7000": {
    category: "Bridge Saw",
    description: "Professional-grade bridge saw with maximum cutting capacity and precision. Built for high-volume production environments.",
    specifications: {
      cuttingArea: "7000mm x 3200mm",
      bladeSize: "800-1200mm",
      motorPower: "30 kW (40 HP)",
      maxThickness: "200mm",
      weight: "9,200 kg",
      powerRequirement: "380V / 3-phase / 50-60Hz",
      coolantSystem: "Advanced dual-tank filtration system"
    },
    capabilities: [
      "Full 5-axis CNC control",
      "Automatic slab loading",
      "Multi-blade configuration",
      "3D cutting patterns",
      "Remote monitoring",
      "Automated quality control"
    ],
    applications: [
      "Large commercial projects",
      "Industrial stone processing",
      "Architectural facades",
      "High-volume production"
    ]
  },
  "CNC Router CR-5000": {
    category: "CNC Router",
    description: "Versatile CNC router for precision cutting, shaping, and engraving of stone materials. Perfect for intricate designs and custom work.",
    specifications: {
      workArea: "5000mm x 3000mm x 400mm",
      axes: "5-axis",
      spindleSpeed: "0-24,000 RPM",
      motorPower: "15 kW",
      weight: "6,500 kg",
      powerRequirement: "380V / 3-phase / 50-60Hz",
      coolantSystem: "Mist cooling system"
    },
    capabilities: [
      "3D carving and sculpting",
      "Edge profiling",
      "Lettering and engraving",
      "Inlay work",
      "Pattern replication",
      "CAD/CAM integration"
    ],
    applications: [
      "Custom countertop designs",
      "Decorative stone work",
      "Signage and monuments",
      "Artistic stone sculptures"
    ]
  },
  "CNC Router CR-7000": {
    category: "CNC Router",
    description: "Heavy-duty CNC router with extended work area and enhanced capabilities for large-scale precision stone fabrication.",
    specifications: {
      workArea: "7000mm x 4000mm x 600mm",
      axes: "5-axis with rotary attachment",
      spindleSpeed: "0-30,000 RPM",
      motorPower: "22 kW",
      weight: "9,800 kg",
      powerRequirement: "380V / 3-phase / 50-60Hz",
      coolantSystem: "Advanced mist and flood cooling"
    },
    capabilities: [
      "Full 5-axis machining",
      "Automatic tool changer (20 tools)",
      "High-speed cutting",
      "Column turning capability",
      "Vacuum table hold-down",
      "Automatic edge finder"
    ],
    applications: [
      "Architectural installations",
      "Large format sculptures",
      "Complex 3D designs",
      "Industrial stone processing"
    ]
  },
  "Edge Polisher EP-2000": {
    category: "Edge Polisher",
    description: "Compact edge polishing machine for finishing stone edges with various profiles. Essential for professional countertop fabrication.",
    specifications: {
      polishingSpeed: "Variable, 500-3000 RPM",
      polishingHeads: "4 heads",
      motorPower: "7.5 kW",
      maxThickness: "80mm",
      weight: "1,800 kg",
      powerRequirement: "380V / 3-phase / 50-60Hz",
      coolantSystem: "Water spray system"
    },
    capabilities: [
      "Multiple edge profiles",
      "Automatic head positioning",
      "Variable speed control",
      "Wet polishing",
      "Quick profile changes"
    ],
    applications: [
      "Countertop edge finishing",
      "Table edge polishing",
      "Vanity tops",
      "Windowsills"
    ]
  },
  "Edge Polisher EP-3000": {
    category: "Edge Polisher",
    description: "Professional edge polishing system with multiple heads for high-quality finishing and complex edge profiles.",
    specifications: {
      polishingSpeed: "Variable, 500-4000 RPM",
      polishingHeads: "8 heads + bullnose",
      motorPower: "15 kW",
      maxThickness: "120mm",
      weight: "3,200 kg",
      powerRequirement: "380V / 3-phase / 50-60Hz",
      coolantSystem: "Recirculating water system with filtration"
    },
    capabilities: [
      "Advanced edge profiling",
      "Multiple head operation",
      "Automatic profile detection",
      "Digital thickness measurement",
      "Programmable sequences",
      "Mirror finish capability"
    ],
    applications: [
      "Premium countertops",
      "Commercial installations",
      "Complex edge designs",
      "High-volume production"
    ]
  },
  "Waterjet Cutter WJ-4000": {
    category: "Waterjet Cutter",
    description: "Precision waterjet cutting system for intricate designs and complex shapes. No heat-affected zones, perfect for delicate materials.",
    specifications: {
      cuttingArea: "4000mm x 2000mm",
      pumpPressure: "60,000 PSI (4,150 bar)",
      motorPower: "50 HP",
      waterFlow: "3.8 L/min",
      weight: "5,500 kg",
      powerRequirement: "480V / 3-phase / 50-60Hz",
      coolantSystem: "High-pressure water filtration"
    },
    capabilities: [
      "Precision cutting without heat",
      "Complex curve cutting",
      "Multi-material capability",
      "Fine detail work",
      "Automatic abrasive feed",
      "Dynamic head tilting"
    ],
    applications: [
      "Intricate inlays",
      "Custom designs",
      "Mosaic patterns",
      "Specialty cuts"
    ]
  },
  "Waterjet Cutter WJ-6000": {
    category: "Waterjet Cutter",
    description: "High-capacity waterjet cutting system with advanced 5-axis capability for maximum precision and versatility in stone fabrication.",
    specifications: {
      cuttingArea: "6000mm x 3000mm",
      pumpPressure: "90,000 PSI (6,200 bar)",
      motorPower: "100 HP",
      waterFlow: "5.7 L/min",
      weight: "8,900 kg",
      powerRequirement: "480V / 3-phase / 50-60Hz",
      coolantSystem: "Advanced filtration and recycling system"
    },
    capabilities: [
      "5-axis cutting",
      "Ultra-high precision",
      "Bevel cutting up to 60°",
      "Multi-head operation",
      "Automatic nesting",
      "Real-time quality monitoring"
    ],
    applications: [
      "Large-scale artistic installations",
      "Architectural features",
      "Complex 3D cutting",
      "Industrial fabrication"
    ]
  }
};

export function MachineModelInfo({ model }: MachineModelInfoProps) {
  const specs = machineSpecs[model];

  if (!specs) {
    return (
      <div className="bg-slate-50 rounded-lg p-6 sm:p-8 md:p-12 text-center">
        <Info className="w-12 h-12 sm:w-16 sm:h-16 text-slate-400 mx-auto mb-3 sm:mb-4" />
        <h3 className="text-lg sm:text-xl font-semibold text-slate-700 mb-2">Machine Information Not Available</h3>
        <p className="text-sm sm:text-base text-slate-600">
          Detailed specifications for {model} are currently unavailable.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 rounded-lg p-4 sm:p-5 md:p-6 text-white">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-slate-300 uppercase tracking-wide">
                {specs.category}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{model}</h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
              {specs.description}
            </p>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-5 md:p-6">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Gauge className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">Technical Specifications</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {specs.specifications.cuttingArea && (
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
              <Ruler className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-600">Cutting Area</p>
                <p className="text-sm sm:text-base font-semibold text-slate-900">{specs.specifications.cuttingArea}</p>
              </div>
            </div>
          )}

          {specs.specifications.workArea && (
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
              <Ruler className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-600">Work Area</p>
                <p className="text-sm sm:text-base font-semibold text-slate-900">{specs.specifications.workArea}</p>
              </div>
            </div>
          )}

          {specs.specifications.bladeSize && (
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
              <Activity className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-600">Blade Size</p>
                <p className="text-sm sm:text-base font-semibold text-slate-900">{specs.specifications.bladeSize}</p>
              </div>
            </div>
          )}

          {specs.specifications.motorPower && (
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
              <Zap className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-600">Motor Power</p>
                <p className="text-sm sm:text-base font-semibold text-slate-900">{specs.specifications.motorPower}</p>
              </div>
            </div>
          )}

          {specs.specifications.pumpPressure && (
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
              <Droplet className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-600">Pump Pressure</p>
                <p className="text-sm sm:text-base font-semibold text-slate-900">{specs.specifications.pumpPressure}</p>
              </div>
            </div>
          )}

          {specs.specifications.waterFlow && (
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
              <Droplet className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-600">Water Flow</p>
                <p className="text-sm sm:text-base font-semibold text-slate-900">{specs.specifications.waterFlow}</p>
              </div>
            </div>
          )}

          {specs.specifications.axes && (
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
              <Activity className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-600">Axes</p>
                <p className="text-sm sm:text-base font-semibold text-slate-900">{specs.specifications.axes}</p>
              </div>
            </div>
          )}

          {specs.specifications.spindleSpeed && (
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
              <Gauge className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-600">Spindle Speed</p>
                <p className="text-sm sm:text-base font-semibold text-slate-900">{specs.specifications.spindleSpeed}</p>
              </div>
            </div>
          )}

          {specs.specifications.polishingSpeed && (
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
              <Gauge className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-600">Polishing Speed</p>
                <p className="text-sm sm:text-base font-semibold text-slate-900">{specs.specifications.polishingSpeed}</p>
              </div>
            </div>
          )}

          {specs.specifications.polishingHeads && (
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
              <Activity className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-600">Polishing Heads</p>
                <p className="text-sm sm:text-base font-semibold text-slate-900">{specs.specifications.polishingHeads}</p>
              </div>
            </div>
          )}

          {specs.specifications.maxThickness && (
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
              <Ruler className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-600">Max Thickness</p>
                <p className="text-sm sm:text-base font-semibold text-slate-900">{specs.specifications.maxThickness}</p>
              </div>
            </div>
          )}

          {specs.specifications.weight && (
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
              <Weight className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-600">Weight</p>
                <p className="text-sm sm:text-base font-semibold text-slate-900">{specs.specifications.weight}</p>
              </div>
            </div>
          )}

          {specs.specifications.powerRequirement && (
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
              <Zap className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-600">Power Requirement</p>
                <p className="text-sm sm:text-base font-semibold text-slate-900">{specs.specifications.powerRequirement}</p>
              </div>
            </div>
          )}

          {specs.specifications.coolantSystem && (
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg sm:col-span-2">
              <Wind className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-600">Coolant System</p>
                <p className="text-sm sm:text-base font-semibold text-slate-900">{specs.specifications.coolantSystem}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Capabilities & Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Capabilities */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-5 md:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Key Capabilities</h3>
          <ul className="space-y-2">
            {specs.capabilities.map((capability, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5 flex-shrink-0">✓</span>
                <span className="text-xs sm:text-sm text-slate-700">{capability}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Applications */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-5 md:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Common Applications</h3>
          <ul className="space-y-2">
            {specs.applications.map((application, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5 flex-shrink-0">•</span>
                <span className="text-xs sm:text-sm text-slate-700">{application}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
