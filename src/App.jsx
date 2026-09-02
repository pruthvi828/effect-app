import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { PresetSidebar } from './components/PresetSidebar';
import { InspectorPanel } from './components/InspectorPanel';
import { ViewportCanvas } from './components/ViewportCanvas';
import { ExportModal } from './components/ExportModal';
import { PRESETS } from './presets';

export function App() {
  const [activePresetId, setActivePresetId] = useState('halftone');
  const activePreset = PRESETS.find((p) => p.id === activePresetId) || PRESETS[0];

  // Store parameter values for each preset
  const [paramValues, setParamValues] = useState(() => {
    const initial = {};
    Object.entries(activePreset.params).forEach(([k, v]) => {
      initial[k] = v.val;
    });
    return initial;
  });

  const [sourceMedia, setSourceMedia] = useState(null);
  const [presetSampleUrl, setPresetSampleUrl] = useState(activePreset.sampleImage);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [webcamStream, setWebcamStream] = useState(null);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const rendererRef = useRef(null);

  // When preset changes, reset sample image & parameter values to defaults
  const handleSelectPreset = (id) => {
    setActivePresetId(id);
    const target = PRESETS.find((p) => p.id === id) || PRESETS[0];

    const defaults = {};
    Object.entries(target.params).forEach(([k, v]) => {
      defaults[k] = v.val;
    });
    setParamValues(defaults);

    if (!sourceMedia && !isWebcamActive) {
      setPresetSampleUrl(target.sampleImage);
    }
  };

  // Change single parameter
  const handleChangeParam = (key, val) => {
    setParamValues((prev) => ({ ...prev, [key]: val }));
  };

  // Reset current params to defaults
  const handleResetParams = () => {
    const defaults = {};
    Object.entries(activePreset.params).forEach(([k, v]) => {
      defaults[k] = v.val;
    });
    setParamValues(defaults);
  };

  // Handle custom image or video file upload
  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (isWebcamActive && webcamStream) {
      webcamStream.getTracks().forEach((track) => track.stop());
      setIsWebcamActive(false);
      setWebcamStream(null);
    }

    if (file.type.startsWith('video/')) {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.onloadedmetadata = () => {
        video.play();
        setSourceMedia(video);
      };
    } else {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setSourceMedia(img);
      };
    }
  };

  // Toggle live webcam feed
  const handleWebcamToggle = async () => {
    if (isWebcamActive) {
      if (webcamStream) {
        webcamStream.getTracks().forEach((track) => track.stop());
      }
      setIsWebcamActive(false);
      setWebcamStream(null);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        setWebcamStream(stream);
        setIsWebcamActive(true);
        setSourceMedia(null);
      } catch (err) {
        alert('Could not access webcam: ' + err.message);
      }
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* Top Header Toolbar */}
      <Header
        onUpload={handleUpload}
        onWebcamToggle={handleWebcamToggle}
        isWebcamActive={isWebcamActive}
        onExport={() => setIsExportOpen(true)}
        onReset={handleResetParams}
      />

      {/* Main Studio Workbench Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Preset Gallery Sidebar */}
        <PresetSidebar
          activePresetId={activePresetId}
          onSelectPreset={handleSelectPreset}
        />

        {/* Center Viewport Canvas Workspace */}
        <ViewportCanvas
          activePresetId={activePresetId}
          paramValues={paramValues}
          sourceMedia={sourceMedia}
          presetSampleUrl={presetSampleUrl}
          isWebcamActive={isWebcamActive}
          webcamStream={webcamStream}
          onCanvasReady={(renderer) => {
            rendererRef.current = renderer;
          }}
        />

        {/* Right Inspector Controls Panel */}
        <InspectorPanel
          activePresetId={activePresetId}
          paramValues={paramValues}
          onChangeParam={handleChangeParam}
          onResetParams={handleResetParams}
        />
      </div>

      {/* Export Popup Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        canvasRef={{ current: rendererRef.current?.canvas }}
        presetName={activePreset.name}
      />
    </div>
  );
}
