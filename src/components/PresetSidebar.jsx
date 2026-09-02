import React, { useState } from 'react';
import { PRESETS } from '../presets';
import { Search, SlidersHorizontal, Check, Sparkles } from 'lucide-react';

export function PresetSidebar({ activePresetId, onSelectPreset }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Print & Vintage', 'Military & Tactical', 'Sci-Fi & Cyber', 'VFX & Dissolve', 'Infrared & Optics', 'Glitch & Digital', 'Spatial & 3D', 'Medical & Optical', 'Retro Computing'];

  const filteredPresets = PRESETS.filter((preset) => {
    const matchesSearch = preset.name.toLowerCase().includes(search.toLowerCase()) ||
                          preset.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || preset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <aside className="w-80 border-r border-slate-800/80 glass-panel flex flex-col h-[calc(100vh-4rem)] z-20 select-none">
      {/* Sidebar Header & Search */}
      <div className="p-4 border-b border-slate-800/60 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              Presets Gallery ({PRESETS.length})
            </h2>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">examle/</span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search effects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.slice(0, 5).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-[10px] whitespace-nowrap font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Presets List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {filteredPresets.map((preset) => {
          const isActive = preset.id === activePresetId;
          return (
            <div
              key={preset.id}
              onClick={() => onSelectPreset(preset.id)}
              className={`group relative rounded-xl p-3 border transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900/90 border-cyan-500/60 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                  : 'glass-panel-interactive border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex gap-3">
                {/* Thumbnail Image */}
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-700/60 bg-slate-950 shrink-0 relative">
                  <img
                    src={preset.sampleImage}
                    alt={preset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-cyan-500/20 backdrop-blur-[1px] flex items-center justify-center">
                      <Check className="w-5 h-5 text-white drop-shadow-md" />
                    </div>
                  )}
                </div>

                {/* Preset Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <h3 className={`text-xs font-semibold truncate ${isActive ? 'text-cyan-300' : 'text-slate-200 group-hover:text-white'}`}>
                        {preset.name}
                      </h3>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                      {preset.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-800/40">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">
                      {preset.category}
                    </span>
                    <span className="text-[9px] text-cyan-400/80 font-mono">
                      {Object.keys(preset.params).length} Controls
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
