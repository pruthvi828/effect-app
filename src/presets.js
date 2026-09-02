export const PRESETS = [
  {
    id: 'halftone',
    name: '1-Bit Halftone Dither',
    category: 'Print & Vintage',
    sampleImage: '/examle/02128109c1570611a2bb68a3f59478ec.jpg',
    description: 'High-contrast newspaper dot matrix dither',
    params: {
      dotSize: { name: 'Dot Size', val: 6, min: 2, max: 24, step: 1 },
      threshold: { name: 'Dither Threshold', val: 0.5, min: 0.1, max: 0.9, step: 0.05 },
      angle: { name: 'Grid Angle', val: 45, min: 0, max: 90, step: 5 },
      contrast: { name: 'Contrast Boost', val: 1.4, min: 0.5, max: 3.0, step: 0.1 },
      invert: { name: 'Invert Colors', type: 'checkbox', val: false }
    }
  },
  {
    id: 'stipplegrain',
    name: 'Stipple Grain Pointillism',
    category: 'Print & Vintage',
    sampleImage: '/examle/0e0f62c0cecbc8eb7f6e5336c4800fc2.jpg',
    description: 'High-density noise grain pointillism rendering dark high-contrast portrait stippling',
    params: {
      grainDensity: { name: 'Grain Density', val: 75, min: 20, max: 100, step: 5 },
      grainSize: { name: 'Noise Scale', val: 1.5, min: 1.0, max: 4.0, step: 0.5 },
      contrast: { name: 'Stipple Contrast', val: 1.8, min: 0.5, max: 3.0, step: 0.1 },
      threshold: { name: 'Luminance Cutoff', val: 40, min: 10, max: 90, step: 5 },
      invert: { name: 'Invert Background', type: 'checkbox', val: false }
    }
  },
  {
    id: 'nightvision',
    name: 'Night Vision Scope',
    category: 'Military & Tactical',
    sampleImage: '/examle/0a2cd24f84eb9fef6afedf6a5bfe5726.jpg',
    description: 'Clean vignetted green phosphor thermal scope with noise grain & phosphor burn',
    params: {
      scopeRadius: { name: 'Scope Radius', val: 78, min: 40, max: 100, step: 1 },
      phosphorGreen: { name: 'Phosphor Brightness', val: 1.3, min: 0.5, max: 2.5, step: 0.1 },
      noiseIntensity: { name: 'Sensor Grain', val: 35, min: 0, max: 100, step: 5 },
      scanlines: { name: 'CRT Scanlines', val: 50, min: 0, max: 100, step: 5 },
      showHud: { name: 'Show Scope HUD Overlay', type: 'checkbox', val: false }
    }
  },
  {
    id: 'hologram',
    name: 'Cyberpunk Hologram Mesh',
    category: 'Sci-Fi & Cyber',
    sampleImage: '/examle/4c07e58f313be9023523199b76819acb.jpg',
    description: 'Semi-transparent hologram grid, neon edge outlines & digital scanlines over original image',
    params: {
      effectOpacity: { name: 'Overlay Opacity', val: 65, min: 10, max: 100, step: 5 },
      neonGlow: { name: 'Neon Edge Glow', val: 80, min: 20, max: 100, step: 5 },
      gridDensity: { name: 'Hologram Grid Scale', val: 24, min: 8, max: 64, step: 4 },
      colorPalette: { name: 'Neon Palette', type: 'select', val: 'cyanPink', options: ['cyanPink', 'matrixGreen', 'amberSynth'] },
      scanlines: { name: 'Hologram Scanlines', val: 40, min: 0, max: 100, step: 5 }
    }
  },
  {
    id: 'synthwave',
    name: 'Synthwave Duotone Glow',
    category: 'VFX & Dissolve',
    sampleImage: '/examle/d4beb70d611854c6ecee744fc6556c98.jpg',
    description: 'Retro 80s duotone blend preserving original details with neon gradient & perspective grid',
    params: {
      blendRatio: { name: 'Original Blend Ratio', val: 50, min: 10, max: 90, step: 5 },
      duotonePreset: { name: 'Color Gradient', type: 'select', val: 'magentaCyan', options: ['magentaCyan', 'sunsetGold', 'purpleNeon'] },
      gridOverlay: { name: 'Perspective Floor Grid', val: 60, min: 0, max: 100, step: 5 },
      bloom: { name: 'Neon Bloom Glow', val: 75, min: 20, max: 100, step: 5 }
    }
  },
  {
    id: 'rgbsplit',
    name: 'Semi RGB Split Glitch',
    category: 'Glitch & Digital',
    sampleImage: '/examle/8ba35894a1b3b47cf2597a3b53869c75.jpg',
    description: 'Preserves sharp original image with semi-transparent RGB displacement & VHS tracking noise',
    params: {
      effectOpacity: { name: 'Effect Opacity', val: 75, min: 10, max: 100, step: 5 },
      rgbDisplacement: { name: 'RGB Channel Offset', val: 12, min: 2, max: 40, step: 2 },
      vhsNoise: { name: 'VHS Tracking Grain', val: 35, min: 0, max: 100, step: 5 },
      glitchFrequency: { name: 'Glitch Line Shift', val: 30, min: 0, max: 100, step: 5 },
      vignetteBlur: { name: 'Edge Lens Vignette', val: 45, min: 0, max: 100, step: 5 }
    }
  },
  {
    id: 'surveillance',
    name: 'Tactical Surveillance HUD',
    category: 'Sci-Fi & Cyber',
    sampleImage: '/examle/4c07e58f313be9023523199b76819acb.jpg',
    description: 'Real-time AI object detection bounding boxes, tracking vectors & telemetry data',
    params: {
      sensitivity: { name: 'Detection Sensitivity', val: 65, min: 10, max: 100, step: 5 },
      boxCount: { name: 'Max Target Boxes', val: 8, min: 2, max: 20, step: 1 },
      vectorLines: { name: 'Telemetry Vectors', val: 75, min: 0, max: 100, step: 10 },
      colorMode: { name: 'HUD Accent Color', type: 'select', val: 'cyan', options: ['cyan', 'orange', 'green', 'magenta'] },
      desaturateBg: { name: 'Desaturate Background', val: 60, min: 0, max: 100, step: 5 },
      showDotGrid: { name: 'Show Dot Matrix Grid', type: 'checkbox', val: true },
      showText: { name: 'Target Confidence Tags', type: 'checkbox', val: true }
    }
  },
  {
    id: 'sand',
    name: 'Sand Disintegration',
    category: 'VFX & Dissolve',
    sampleImage: '/examle/5f1870d230217e3857d37eb9283a11bd.jpg',
    description: 'Subject dissolves into thousands of micro-particles dispersing into darkness',
    params: {
      dissolveAmount: { name: 'Dissolve Progress', val: 55, min: 10, max: 100, step: 5 },
      particleSize: { name: 'Particle Scale', val: 2.5, min: 1.0, max: 8.0, step: 0.5 },
      dispersionSpeed: { name: 'Particle Drift', val: 40, min: 0, max: 100, step: 5 },
      turbulence: { name: 'Noise Turbulence', val: 65, min: 0, max: 100, step: 5 },
      animate: { name: 'Animate Dispersion', type: 'checkbox', val: true }
    }
  },
  {
    id: 'dustshadow',
    name: 'Particle Dust Shadow',
    category: 'VFX & Dissolve',
    sampleImage: '/examle/d0133f6e7c10bbea499ffc56dc6d3c9d.jpg',
    description: 'Subject emits ground particle spray and speckled sand shadow on the floor',
    params: {
      dustDensity: { name: 'Dust Density', val: 70, min: 20, max: 100, step: 5 },
      floorSpread: { name: 'Floor Shadow Radius', val: 60, min: 10, max: 100, step: 5 },
      particleSize: { name: 'Dust Size', val: 2.0, min: 1.0, max: 5.0, step: 0.5 },
      shadowDarkness: { name: 'Shadow Opacity', val: 80, min: 20, max: 100, step: 5 },
      glow: { name: 'Particle Brightness', val: 90, min: 20, max: 100, step: 5 }
    }
  },
  {
    id: 'thermal',
    name: 'Thermal Heatmap Spectrum',
    category: 'Infrared & Optics',
    sampleImage: '/examle/888425d0a5ae1d74ca2574875691c513.jpg',
    description: 'False-color infrared spectrum mapping luminance to thermal heat gradients',
    params: {
      colorRamp: { name: 'Thermal Palette', type: 'select', val: 'ironbow', options: ['ironbow', 'rainbow', 'ultraviolet', 'fire'] },
      gain: { name: 'Thermal Sensitivity', val: 1.2, min: 0.5, max: 2.5, step: 0.1 },
      contrast: { name: 'Heat Gradient Shift', val: 1.0, min: 0.2, max: 2.0, step: 0.1 },
      noise: { name: 'Infrared Grain', val: 15, min: 0, max: 50, step: 5 }
    }
  },
  {
    id: 'pixelsort',
    name: 'Pixel Sorting & Bit Glitch',
    category: 'Glitch & Digital',
    sampleImage: '/examle/8ba35894a1b3b47cf2597a3b53869c75.jpg',
    description: 'Blocky pixel sorting, horizontal dither cuts, and digital noise glitching',
    params: {
      blockSize: { name: 'Pixel Block Size', val: 8, min: 2, max: 32, step: 2 },
      sortThreshold: { name: 'Sort Threshold', val: 45, min: 5, max: 95, step: 5 },
      glitchFrequency: { name: 'Glitch Intensity', val: 60, min: 0, max: 100, step: 5 },
      direction: { name: 'Sort Direction', type: 'select', val: 'vertical', options: ['vertical', 'horizontal', 'diagonal'] }
    }
  },
  {
    id: 'lidar',
    name: 'LiDAR 3D Wireframe',
    category: 'Spatial & 3D',
    sampleImage: '/examle/8bf9b91d3383d0b5852848e385063460.jpg',
    description: '3D spatial scanner wireframe mesh, elevation contours, and glowing vertices',
    params: {
      gridDensity: { name: 'Mesh Resolution', val: 24, min: 8, max: 64, step: 4 },
      depthExtrusion: { name: 'Depth Height', val: 35, min: 0, max: 100, step: 5 },
      wireGlow: { name: 'Wireframe Brightness', val: 80, min: 20, max: 100, step: 5 },
      wireColor: { name: 'Laser Line Color', type: 'select', val: 'white', options: ['white', 'cyan', 'green', 'red'] },
      showPointCloud: { name: 'Point Cloud Nodes', type: 'checkbox', val: true }
    }
  },
  {
    id: 'xray',
    name: 'X-Ray Solarized Glow',
    category: 'Medical & Optical',
    sampleImage: '/examle/8e285f5aabd0975a0142efb7cd31fce0.jpg',
    description: 'Inverted negative luminance with edge rim lighting and glowing aura',
    params: {
      rimLight: { name: 'Rim Edge Glow', val: 85, min: 0, max: 100, step: 5 },
      solarizeThreshold: { name: 'Solarization Shift', val: 50, min: 0, max: 100, step: 5 },
      contrast: { name: 'Gamma Contrast', val: 1.5, min: 0.5, max: 3.0, step: 0.1 },
      coolTint: { name: 'Blue-Slate Tint', val: 70, min: 0, max: 100, step: 5 }
    }
  },
  {
    id: 'celestialglow',
    name: 'Celestial Radiance Glow',
    category: 'Sci-Fi & Cyber',
    sampleImage: '/examle/d4beb70d611854c6ecee744fc6556c98.jpg',
    description: 'Subject silhouette extracted and filled with intense pure white glowing light over background',
    params: {
      glowIntensity: { name: 'Glow Radiance', val: 90, min: 30, max: 100, step: 5 },
      bloomRadius: { name: 'Bloom Feathering', val: 25, min: 5, max: 60, step: 5 },
      subjectSensitivity: { name: 'Subject Threshold', val: 45, min: 10, max: 90, step: 5 },
      coreBrightness: { name: 'Core Light Density', val: 1.0, min: 0.5, max: 2.0, step: 0.1 },
      bgSaturation: { name: 'Background Saturation', val: 1.2, min: 0.2, max: 2.0, step: 0.1 }
    }
  },
  {
    id: 'asciiteletype',
    name: 'ASCII Dot Teletype',
    category: 'Retro Computing',
    sampleImage: '/examle/a2b9194fa280408b494f2d435b8b3453.jpg',
    description: 'Dense dot character matrix typography rendering luminance as symbols',
    params: {
      fontSize: { name: 'Font Scale (px)', val: 10, min: 4, max: 24, step: 1 },
      charset: { name: 'Character Set', type: 'select', val: 'standard', options: ['standard', 'dots', 'binary', 'blocks'] },
      contrast: { name: 'Char Contrast', val: 1.3, min: 0.5, max: 2.5, step: 0.1 },
      paperTexture: { name: 'Paper Grain', val: 40, min: 0, max: 100, step: 5 }
    }
  },
  {
    id: 'asciicutout',
    name: 'ASCII Subject Cutout',
    category: 'Retro Computing',
    sampleImage: '/examle/d575c5294d95398ac45a4e70df9c7127.jpg',
    description: 'Subject-masked ASCII character grid layered over vintage background image',
    params: {
      maskThreshold: { name: 'Subject Sensitivity', val: 50, min: 10, max: 90, step: 5 },
      charDensity: { name: 'ASCII Resolution', val: 12, min: 6, max: 28, step: 2 },
      bgBlur: { name: 'Background Blur', val: 6, min: 0, max: 20, step: 1 },
      glowTint: { name: 'Text Glow Tint', type: 'select', val: 'white', options: ['white', 'amber', 'green', 'cyan'] }
    }
  },
  {
    id: 'matrix',
    name: 'Matrix Cyber Rain Stream',
    category: 'Sci-Fi & Cyber',
    sampleImage: '/examle/e3053f3e564ad8fb6b8ce9690716f02e.jpg',
    description: 'Digital stream of animated green binary code silhouetting the image subject',
    params: {
      codeDensity: { name: 'Code Stream Density', val: 14, min: 6, max: 32, step: 2 },
      rainSpeed: { name: 'Code Rain Speed', val: 60, min: 0, max: 100, step: 5 },
      glowIntensity: { name: 'Cyber Glow', val: 90, min: 20, max: 100, step: 5 },
      codeColor: { name: 'Matrix Palette', type: 'select', val: 'matrixGreen', options: ['matrixGreen', 'cyberBlue', 'amberGold', 'neonRed'] },
      animate: { name: 'Animate Matrix Streams', type: 'checkbox', val: true }
    }
  },
  {
    id: 'crt',
    name: 'CRT Phosphor Scanlines',
    category: 'Retro Computing',
    sampleImage: '/examle/f75d7201c4a000420d31ac54739f32f1.jpg',
    description: 'Vertical line scan dither, CRT screen curvature, phosphor green glow',
    params: {
      lineDensity: { name: 'Scanline Frequency', val: 3, min: 1, max: 10, step: 1 },
      phosphorGlow: { name: 'Phosphor Brightness', val: 85, min: 20, max: 100, step: 5 },
      curvature: { name: 'Screen Curvature', val: 20, min: 0, max: 60, step: 5 },
      palette: { name: 'Phosphor Color', type: 'select', val: 'monochromeGreen', options: ['monochromeGreen', 'amberP3', 'cyanP1', 'b&w'] },
      flicker: { name: 'CRT Refresh Flicker', val: 25, min: 0, max: 100, step: 5 }
    }
  }
];
