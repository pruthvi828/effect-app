import React from 'react';
import { Sparkles, Upload, Camera, Download, RefreshCw, Layers, ShieldCheck } from 'lucide-react';

export function Header({ onUpload, onWebcamToggle, isWebcamActive, onExport, onReset }) {
  return (
    <header className="h-16 border-b border-slate-800/80 glass-panel px-6 flex items-center justify-between z-30 relative select-none">
      {/* Brand logo & Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-lg font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
              EFFECT<span className="text-cyan-400 font-normal">.APP</span>
            </h1>
            <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold font-mono">
              STUDIO
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono">Real-Time Image & Video Visual Effects</p>
        </div>
      </div>

      {/* Center Actions: Upload & Webcam */}
      <div className="flex items-center gap-3">
        <label className="cursor-pointer glass-panel-interactive px-4 py-2 rounded-lg text-xs font-medium text-slate-200 flex items-center gap-2 shadow-sm hover:text-white">
          <Upload className="w-4 h-4 text-cyan-400" />
          <span>Upload Image / Video</span>
          <input
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={onUpload}
          />
        </label>

        <button
          onClick={onWebcamToggle}
          className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ${
            isWebcamActive
              ? 'bg-red-500/20 text-red-300 border border-red-500/40 shadow-lg shadow-red-500/10'
              : 'glass-panel-interactive text-slate-200 hover:text-white'
          }`}
        >
          <Camera className={`w-4 h-4 ${isWebcamActive ? 'text-red-400 animate-pulse' : 'text-indigo-400'}`} />
          <span>{isWebcamActive ? 'Stop Webcam' : 'Live Webcam'}</span>
        </button>

        <button
          onClick={onReset}
          className="glass-panel-interactive p-2 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
          title="Reset Parameters to Default"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Right Export Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={onExport}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-medium text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Download className="w-4 h-4" />
          <span>Export Image</span>
        </button>
      </div>
    </header>
  );
}
