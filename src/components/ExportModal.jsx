import React, { useState } from 'react';
import { X, Download, Image as ImageIcon, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export function ExportModal({ isOpen, onClose, canvasRef, presetName }) {
  const [format, setFormat] = useState('png');
  const [scale, setScale] = useState(1);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!canvasRef || !canvasRef.current) return;
    setIsExporting(true);

    const canvas = canvasRef.current;
    const mimeType = format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
    const dataUrl = canvas.toDataURL(mimeType, 0.95);

    const link = document.createElement('a');
    link.download = `effect-app-${presetName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}.${format}`;
    link.href = dataUrl;
    link.click();

    // Trigger celebratory confetti animation
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#818cf8', '#c084fc', '#4ade80']
    });

    setTimeout(() => {
      setIsExporting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 font-display">Export Processed Media</h3>
            <p className="text-xs text-slate-400">Save high-resolution output with applied effects</p>
          </div>
        </div>

        {/* Format Selector */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono block mb-2">
              File Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['png', 'jpeg', 'webp'].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setFormat(fmt)}
                  className={`py-2 px-3 rounded-xl text-xs font-mono font-semibold uppercase border transition-all ${
                    format === fmt
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  .{fmt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2 border-t border-slate-800/80">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-700/80 text-xs font-medium text-slate-300 hover:bg-slate-800/60 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
          >
            {isExporting ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Download Image</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
