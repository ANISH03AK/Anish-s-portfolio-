import React, { useState } from 'react';
import { BMS_METRICS } from '../../data/portfolioData';
import { Activity, ShieldCheck, AlertTriangle, RefreshCw, Database } from 'lucide-react';

export const BmsSimulator: React.FC = () => {
  const [metrics, setMetrics] = useState(BMS_METRICS);
  const [isSimulatedAnomaly, setIsSimulatedAnomaly] = useState(false);
  const [loggedSql, setLoggedSql] = useState<string>(
    'SELECT system_id, reading_val, safety_status FROM tcs_bms_telemetry WHERE status != "optimal" ORDER BY timestamp DESC LIMIT 5;'
  );

  const toggleAnomaly = () => {
    if (!isSimulatedAnomaly) {
      setMetrics((prev) =>
        prev.map((m) =>
          m.id === 'ahu-1'
            ? { ...m, status: 'warning', reading: '26.8°C / 64% RH (Thermal Drift)', description: 'AHU Secondary Chilled Loop valve fluctuation detected.' }
            : m
        )
      );
      setLoggedSql(
        'INSERT INTO bms_incident_logs (system_id, code, metric, logged_by, action_taken)\nVALUES ("AHU-01", "THERMAL_SPIKE", "26.8C", "ANISH_KUMAR", "PID_LOOP_RECALIBRATED");'
      );
      setIsSimulatedAnomaly(true);
    } else {
      setMetrics(BMS_METRICS);
      setLoggedSql(
        'SELECT system_id, reading_val, safety_status FROM tcs_bms_telemetry WHERE status != "optimal" ORDER BY timestamp DESC LIMIT 5;'
      );
      setIsSimulatedAnomaly(false);
    }
  };

  return (
    <div className="p-4 sm:p-5 bg-[#090b12] rounded-2xl border border-zinc-800 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-400" />
          <span className="font-bold text-white tracking-wide">TCS BMS TELEMETRY & SQL CONSOLE</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            24/7 ONLINE
          </span>
          <button
            onClick={toggleAnomaly}
            className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors cursor-pointer ${
              isSimulatedAnomaly
                ? 'bg-amber-950/60 text-amber-300 border-amber-500/50'
                : 'bg-zinc-850 hover:bg-zinc-800 text-zinc-300 border-zinc-700'
            }`}
          >
            {isSimulatedAnomaly ? 'Reset Telemetry' : 'Simulate AHU Drift'}
          </button>
        </div>
      </div>

      {/* Sensor Array Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {metrics.slice(0, 4).map((sensor) => {
          const isWarning = sensor.status === 'warning';

          return (
            <div
              key={sensor.id}
              className={`p-3 rounded-xl border text-xs transition-colors ${
                isWarning
                  ? 'bg-amber-950/30 border-amber-500/70'
                  : 'bg-[#0d0f1a] border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-200">{sensor.system}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    isWarning
                      ? 'bg-amber-900/60 text-amber-200 font-bold'
                      : 'bg-emerald-950/60 text-emerald-400'
                  }`}
                >
                  {isWarning ? 'AUDIT ALERT' : 'OPTIMAL'}
                </span>
              </div>

              <div className="text-base font-extrabold text-white font-mono mt-1">
                {sensor.reading}
              </div>

              <div className="text-[11px] text-zinc-400 mt-1 line-clamp-1">
                {sensor.description}
              </div>
            </div>
          );
        })}
      </div>

      {/* Operational SQL Logging Box */}
      <div className="p-3 bg-[#06070c] rounded-xl border border-zinc-800 text-xs font-mono space-y-1">
        <div className="flex items-center gap-1.5 text-zinc-400 text-[10px]">
          <Database className="w-3 h-3 text-blue-400" />
          <span>DAILY SQL OPERATIONAL LOG STREAM:</span>
        </div>
        <pre className="text-emerald-400 text-[11px] overflow-x-auto leading-relaxed whitespace-pre-wrap select-text">
          {loggedSql}
        </pre>
      </div>
    </div>
  );
};
