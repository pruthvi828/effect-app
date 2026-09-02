import React from 'react';
import { Sliders, RotateCcw, Info, Settings2 } from 'lucide-react';
import { PRESETS } from '../presets';

export function InspectorPanel({ activePresetId, paramValues, onChangeParam, onResetParams }) {
  const preset = PRESETS.find((p) => p.id === activePresetId) || PRESETS[0];

  return (
    <aside className="w-80 border-l border-slate-800/80 glass-panel flex flex-col h-[calc(100vh-4rem)] z-20 select-none">
      {/* Inspector Header */}
      <div className="p-4 border-b border-slate-800/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
            Inspector Controls
          </h2>
        </div>
        <button
          onClick={onResetParams}
          className="text-[11px] text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
          title="Reset current effect settings"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Preset Title Header */}
      <div className="px-4 py-3 bg-slate-900/60 border-b border-slate-800/40">
        <span className="text-[9px] uppercase tracking-widest text-cyan-400 font-mono font-semibold">
          Active Preset
        </span>
        <h3 className="text-sm font-bold text-slate-100 font-display mt-0.5">
          {preset.name}
        </h3>
        <p className="text-[11px] text-slate-400 mt-1 leading-snug">
          {preset.description}
        </p>
      </div>

      {/* Parameter Sliders & Dropdowns */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {Object.entries(preset.params).map(([key, config]) => {
          const val = paramValues[key] !== undefined ? paramValues[key] : config.val;

          if (config.type === 'checkbox') {
            return (
              <div key={key} className="flex items-center justify-between py-1">
                <label className="text-xs text-slate-300 font-medium cursor-pointer" htmlFor={key}>
                  {config.name}
                </label>
                <input
                  id={key}
                  type="checkbox"
                  checked={Boolean(val)}
                  onChange={(e) => onChangeParam(key, e.target.checked)}
                  className="w-4 h-4 accent-cyan-500 rounded bg-slate-900 border-slate-700 cursor-pointer"
                />
              </div>
            );
          }

          if (config.type === 'select') {
            return (
              <div key={key} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-slate-300 font-medium">{config.name}</label>
                </div>
                <select
                  value={val}
                  onChange={(e) => onChangeParam(key, e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  {config.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          // Number Range Slider
          return (
            <div key={key} className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">{config.name}</span>
                <span className="font-mono text-cyan-400 font-semibold px-2 py-0.5 bg-slate-900 rounded border border-slate-800 text-[11px]">
                  {val}
                </span>
              </div>

              <input
                type="range"
                min={config.min}
                max={config.max}
                step={config.step || 1}
                value={val}
                onChange={(e) => onChangeParam(key, parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-800/60 bg-slate-950/60 text-[10px] text-slate-500 font-mono flex items-center gap-2">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>Sub-16ms GPU Canvas Render Active</span>
      </div>
    </aside>
  );
}
