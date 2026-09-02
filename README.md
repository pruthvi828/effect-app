# 🌌 EffectApp Studio

<div align="center">

![EffectApp Studio Banner](https://raw.githubusercontent.com/pruthvi828/effect-app/main/public/examle/4c07e58f313be9023523199b76819acb.jpg)

**High-Performance Real-Time Image, Video & Live Webcam Visual Effects Workstation**

[![React](https://img.shields.io/badge/React-19.0.0-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.1.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0.7-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Canvas](https://img.shields.io/badge/HTML5-Canvas%202D%20%2F%20WebGL-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![60 FPS](https://img.shields.io/badge/Performance-60_FPS_Real--Time-emerald?style=for-the-badge&logo=speedtest&logoColor=white)](#performance-optimizations)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

</div>

---

## 📖 Overview

**EffectApp Studio** is an open-source, hardware-accelerated creative playground and visual effects generator built for the browser. It combines modern UI aesthetics with a sub-16ms GPU canvas rendering engine capable of processing static images, uploaded looped videos, and live webcam streams at smooth 60 FPS.

From vintage 1-bit newspaper halftones and CRT phosphor curvature to cyberpunk hologram meshes, thermal infrared heatmaps, LiDAR 3D wireframes, and particle sand disintegration, **EffectApp Studio** gives creators deep parametric control over complex computer vision and rendering algorithms.

---

## ✨ Key Features

- **⚡ Sub-16ms Real-Time Engine**: Built on an optimized dual-buffer Canvas 2D/WebGL pipeline executing per-frame pixel manipulation with zero perceptible lag.
- **🎨 16 Handcrafted Visual Effects**: Spanning 9 distinct stylistic and technical domains (Print, Retro Computing, Sci-Fi, Tactical HUD, VFX, Optics, and 3D).
- **📹 Multi-Source Media Ingestion**:
  - **Static Images**: JPEG, PNG, WebP, SVG, AVIF.
  - **Video Files**: MP4, WebM, MOV with synchronized real-time playback filtering.
  - **Live Webcam Feed**: Direct low-latency camera streaming with live effect processing.
- **🎛️ Dynamic Parametric Inspector**: Fine-tune parameters on the fly using responsive sliders, dropdown palettes, color ramps, and boolean toggles with instant reset capabilities.
- **🔍 Interactive Viewport Tools**:
  - **Split Before/After Comparison**: Interactive dual-view wipe divider to compare processed output against original input.
  - **Zoom & Pan Controls**: 50% to 250% viewport scaling.
  - **Fullscreen Canvas Mode**: Immersive canvas presentation.
  - **Live Telemetry Badge**: Real-time FPS counter and active render dimensions monitor.
- **💾 Multi-Format High-Res Exporter**: One-click instant export in `.png`, `.jpeg`, and `.webp` with celebratory visual cues.
- **💎 Premium Glassmorphic UI**: Tailored dark-mode workspace styled with Tailwind CSS v4, custom scrollbars, glowing borders, and Syne/Fira Code typography.

---

## 🎭 Visual Effects Preset Directory

| Preset | Category | Description | Key Tunable Parameters |
| :--- | :--- | :--- | :--- |
| **1-Bit Halftone Dither** | `Print & Vintage` | High-contrast newspaper dot matrix dither with angle offset | Dot Size, Dither Threshold, Grid Angle, Contrast Boost, Invert |
| **Stipple Grain Pointillism** | `Print & Vintage` | High-density stochastic noise grain rendering dark portrait stippling | Grain Density, Noise Scale, Stipple Contrast, Luminance Cutoff, Invert |
| **Night Vision Scope** | `Military & Tactical` | Vignetted green phosphor tactical optic with phosphor burn & CRT grain | Scope Radius, Phosphor Brightness, Sensor Grain, CRT Scanlines, HUD Overlay |
| **Cyberpunk Hologram Mesh** | `Sci-Fi & Cyber` | Semi-transparent holographic projection with neon edge outlines | Overlay Opacity, Neon Glow, Grid Scale, Neon Palette (`cyanPink`, `matrixGreen`, `amberSynth`), Scanlines |
| **Synthwave Duotone Glow** | `VFX & Dissolve` | 80s retro duotone blend with glowing bloom and perspective ground grid | Blend Ratio, Duotone Gradient (`magentaCyan`, `sunsetGold`, `purpleNeon`), Floor Grid, Bloom |
| **Semi RGB Split Glitch** | `Glitch & Digital` | Chromatic aberration displacement with VHS tracking noise | Effect Opacity, RGB Channel Offset, VHS Grain, Glitch Line Shift, Vignette |
| **Tactical Surveillance HUD** | `Sci-Fi & Cyber` | Real-time AI object detection bounding boxes & telemetry vectors | Sensitivity, Max Target Boxes, Vectors, Accent Color, Desaturate Background, Matrix Grid |
| **Sand Disintegration** | `VFX & Dissolve` | Subject dissolves into thousands of dispersing micro-particles | Dissolve Progress, Particle Scale, Particle Drift, Noise Turbulence, Animation Toggle |
| **Particle Dust Shadow** | `VFX & Dissolve` | Floor particle spray and speckle shadow projection | Dust Density, Floor Shadow Radius, Dust Size, Shadow Opacity, Particle Glow |
| **Thermal Heatmap Spectrum** | `Infrared & Optics` | False-color thermal luminance gradient mapping | Color Palette (`ironbow`, `rainbow`, `ultraviolet`, `fire`), Thermal Gain, Gradient Shift, Noise |
| **Pixel Sorting & Bit Glitch** | `Glitch & Digital` | Horizontal/vertical sorting cuts with digital bit corruption | Block Size, Sort Threshold, Glitch Intensity, Sort Direction (`vertical`, `horizontal`, `diagonal`) |
| **LiDAR 3D Wireframe** | `Spatial & 3D` | 3D spatial scanner wireframe mesh with glowing vertices | Mesh Resolution, Depth Extrusion, Wire Brightness, Laser Color (`white`, `cyan`, `green`, `red`), Point Cloud |
| **X-Ray Solarized Glow** | `Medical & Optical` | Inverted solarized negative luminance with glowing edge aura | Rim Edge Glow, Solarization Shift, Gamma Contrast, Blue-Slate Cool Tint |
| **Celestial Radiance Glow** | `Sci-Fi & Cyber` | Subject silhouette extraction with glowing radiance aura | Glow Radiance, Bloom Feathering, Subject Threshold, Core Light Density, Background Saturation |
| **ASCII Dot Teletype** | `Retro Computing` | Dense typography character matrix rendering luminance | Font Scale, Charset (`standard`, `dots`, `binary`, `blocks`), Char Contrast, Paper Grain |
| **ASCII Subject Cutout** | `Retro Computing` | Subject-masked ASCII character grid layered over background | Mask Threshold, ASCII Resolution, Background Blur, Glow Tint (`white`, `amber`, `green`, `cyan`) |
| **Matrix Cyber Rain Stream** | `Sci-Fi & Cyber` | Flowing green digital code rain stream silhouetting the subject | Stream Density, Code Rain Speed, Cyber Glow, Color Palette, Animation Toggle |
| **CRT Phosphor Scanlines** | `Retro Computing` | Vertical/horizontal scanline dither, CRT screen curvature & refresh flicker | Scanline Frequency, Phosphor Brightness, Screen Curvature, Phosphor Color (`monochromeGreen`, `amberP3`, `cyanP1`, `b&w`), Flicker |

---

## 🏗️ Architecture & Rendering Pipeline

```
                     ┌────────────────────────┐
                     │     Source Media       │
                     │ (Image / Video/ Webcam)│
                     └───────────┬────────────┘
                                 │
                                 ▼
                     ┌────────────────────────┐
                     │ Offscreen Canvas Buffer│
                     │  (Dimension Normalizer)│
                     └───────────┬────────────┘
                                 │
                                 ▼
            ┌──────────────────────────────────────────┐
            │       EffectRenderer Core Engine         │
            │                                          │
            │  • Pixel Luminance & Sobel Convolution   │
            │  • Dithering & False-Color Spectrum Ramps│
            │  • Particle Vector Displacement Physics  │
            │  • Typography Character Matrix Grid      │
            │  • CRT Curvature & Optical Vignetting    │
            └────────────────────┬─────────────────────┘
                                 │
                                 ▼
            ┌──────────────────────────────────────────┐
            │        Interactive Viewport Canvas       │
            │  • Split-Screen Before/After Masking     │
            │  • Zoom & Fullscreen Transforms          │
            │  • 60 FPS RequestAnimationFrame Loop     │
            └────────────────────┬─────────────────────┘
                                 │
                                 ▼
            ┌──────────────────────────────────────────┐
            │           High-Resolution Export         │
            │          (.png / .jpeg / .webp)          │
            └──────────────────────────────────────────┘
```

### Core Engine Details ([`src/engine/EffectRenderer.js`](src/engine/EffectRenderer.js))
- **Offscreen Double Buffering**: Pre-renders source media into a detached canvas (`offCtx`) with `willReadFrequently: true` to prevent UI thread blocking during pixel reads.
- **Dynamic Dimension Clamping**: Automatically rescales input media exceeding 1200px while maintaining exact aspect ratios, ensuring lightning-fast memory operations.
- **Parametric State Binding**: Every frame reads atomic configuration states from the UI without memory leaks or garbage collection spikes.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version **18.0.0** or higher)
- [npm](https://www.npmjs.com/) (version **9.0.0** or higher)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/pruthvi828/effect-app.git
   cd effect-app
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production bundle**:
   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```
effectapp/
├── index.html                 # Main HTML entry with Google Fonts & metadata
├── package.json               # Project manifest and scripts
├── vite.config.js             # Vite configuration with React & Tailwind plugins
├── public/
│   └── examle/                # 15+ curated reference sample images for presets
├── src/
│   ├── main.jsx               # React DOM root bootstrapping
│   ├── App.jsx                # Global state orchestrator (preset, params, media)
│   ├── presets.js             # Effect presets catalog & default parameters
│   ├── index.css              # Custom styling, dark mode tokens, scrollbar styling
│   ├── components/
│   │   ├── Header.jsx         # Navigation, file upload, webcam trigger & export
│   │   ├── PresetSidebar.jsx  # Categorized preset list with search and badges
│   │   ├── InspectorPanel.jsx # Sliders, color selectors & fine-tuning controls
│   │   ├── ViewportCanvas.jsx # Main canvas viewport, before/after split & zoom
│   │   └── ExportModal.jsx    # Export dialog with format picker and confetti
│   └── engine/
│       └── EffectRenderer.js  # High-performance Canvas 2D/WebGL filter engine
├── CONTRIBUTING.md            # Guidelines for adding new effects and contributing
├── LICENSE                    # MIT License
└── README.md                  # Comprehensive documentation
```

---

## 💻 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Declarative state management and component architecture |
| **Vite 6** | Ultra-fast build tool and lightning-quick HMR |
| **Tailwind CSS v4** | Next-generation utility-first styling with glassmorphism |
| **HTML5 Canvas 2D & WebGL** | Real-time pixel manipulation and GPU rendering pipeline |
| **Lucide React** | Modern, clean vector iconography |
| **Canvas Confetti** | Celebratory particle effects on export |

---

## 🛠️ Performance Optimizations

1. **Direct Buffer Manipulation**: Direct `ImageData.data` Uint8ClampedArray operations for sub-millisecond per-pixel transformations.
2. **Precomputed Look-Up Tables (LUTs)**: Fast color gradient evaluation for Thermal, Duotone, and Matrix palettes.
3. **Smart Aspect Ratio Fitting**: Media is intelligently fitted into high-density viewports without CPU pixel stretching.
4. **Adaptive Frame Loop**: Automatically switches rendering schedules based on whether active media is static, animating, or streaming from a live camera.

---

## 🤝 Contributing

Contributions are welcome! Please check out [`CONTRIBUTING.md`](CONTRIBUTING.md) for step-by-step instructions on adding new visual effects, optimizing shaders, or submitting bug fixes.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingEffect`)
3. Commit your Changes (`git commit -m 'feat: add AmazingEffect preset'`)
4. Push to the Branch (`git push origin feature/AmazingEffect`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">

Crafted with ⚡ and 💜 for creators and digital artists worldwide.

</div>
