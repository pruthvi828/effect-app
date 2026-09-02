// Real-time Canvas 2D / WebGL rendering engine for EffectApp Studio

export class EffectRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { willReadFrequently: true });
    this.offscreen = document.createElement('canvas');
    this.offCtx = this.offscreen.getContext('2d', { willReadFrequently: true });
    this.sourceMedia = null;
    this.animationFrameId = null;
    this.time = 0;
  }

  setSource(media) {
    this.sourceMedia = media;
    let w = media.videoWidth || media.naturalWidth || media.width || 800;
    let h = media.videoHeight || media.naturalHeight || media.height || 600;

    // Cap maximum render dimensions for ultra-smooth 60fps interaction
    const maxDim = 1200;
    if (w > maxDim || h > maxDim) {
      if (w > h) {
        h = Math.round((h * maxDim) / w);
        w = maxDim;
      } else {
        w = Math.round((w * maxDim) / h);
        h = maxDim;
      }
    }

    this.canvas.width = w;
    this.canvas.height = h;
    this.offscreen.width = w;
    this.offscreen.height = h;
  }

  render(presetId, paramValues) {
    if (!this.sourceMedia || !this.canvas.width || !this.canvas.height) return;

    const w = this.canvas.width;
    const h = this.canvas.height;

    // Draw original image/video to offscreen buffer
    this.offCtx.clearRect(0, 0, w, h);
    this.offCtx.drawImage(this.sourceMedia, 0, 0, w, h);

    const imgData = this.offCtx.getImageData(0, 0, w, h);
    const data = imgData.data;

    this.time += 0.03;

    // Clear visible canvas
    this.ctx.fillStyle = '#030712';
    this.ctx.fillRect(0, 0, w, h);

    switch (presetId) {
      case 'halftone':
        this.renderHalftone(w, h, data, paramValues);
        break;
      case 'stipplegrain':
        this.renderStippleGrain(w, h, data, paramValues);
        break;
      case 'nightvision':
        this.renderNightVision(w, h, data, paramValues);
        break;
      case 'hologram':
        this.renderHologram(w, h, data, paramValues);
        break;
      case 'synthwave':
        this.renderSynthwave(w, h, data, paramValues);
        break;
      case 'rgbsplit':
        this.renderRgbSplit(w, h, data, paramValues);
        break;
      case 'surveillance':
        this.renderSurveillance(w, h, data, paramValues);
        break;
      case 'sand':
        this.renderSand(w, h, data, paramValues);
        break;
      case 'dustshadow':
        this.renderDustShadow(w, h, data, paramValues);
        break;
      case 'thermal':
        this.renderThermal(w, h, data, paramValues);
        break;
      case 'pixelsort':
        this.renderPixelSort(w, h, data, paramValues);
        break;
      case 'lidar':
        this.renderLidar(w, h, data, paramValues);
        break;
      case 'xray':
        this.renderXray(w, h, data, paramValues);
        break;
      case 'celestialglow':
        this.renderCelestialGlow(w, h, data, paramValues);
        break;
      case 'asciiteletype':
        this.renderAsciiTeletype(w, h, data, paramValues);
        break;
      case 'asciicutout':
        this.renderAsciiCutout(w, h, data, paramValues);
        break;
      case 'matrix':
        this.renderMatrix(w, h, data, paramValues);
        break;
      case 'crt':
        this.renderCrt(w, h, data, paramValues);
        break;
      default:
        this.ctx.drawImage(this.offscreen, 0, 0);
        break;
    }
  }

  // 1. HALFTONE DITHER
  renderHalftone(w, h, data, p) {
    const dotSize = Math.max(2, p.dotSize || 6);
    const threshold = p.threshold !== undefined ? p.threshold : 0.5;
    const angleRad = ((p.angle || 45) * Math.PI) / 180;
    const contrast = p.contrast || 1.4;
    const invert = p.invert || false;

    this.ctx.fillStyle = invert ? '#ffffff' : '#0a0a0c';
    this.ctx.fillRect(0, 0, w, h);

    this.ctx.fillStyle = invert ? '#0a0a0c' : '#ffffff';

    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);

    for (let y = 0; y < h; y += dotSize) {
      for (let x = 0; x < w; x += dotSize) {
        const i = (Math.floor(y) * w + Math.floor(x)) * 4;
        let r = data[i] / 255;
        let g = data[i + 1] / 255;
        let b = data[i + 2] / 255;

        let lum = 0.299 * r + 0.587 * g + 0.114 * b;
        lum = Math.pow(lum, contrast);

        if (invert) lum = 1 - lum;

        if (lum > threshold * 0.2) {
          const radius = (dotSize / 2) * Math.sqrt(lum);
          this.ctx.beginPath();
          this.ctx.arc(x + dotSize / 2, y + dotSize / 2, Math.max(0.5, radius), 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
    }
  }

  // 2. NIGHT VISION SCOPE
  renderNightVision(w, h, data, p) {
    const scopeR = ((p.scopeRadius || 78) / 100) * (Math.min(w, h) / 2);
    const phosphor = p.phosphorGreen || 1.3;
    const noiseLevel = p.noiseIntensity || 35;
    const showHud = p.showHud === true;
    const scanlineInt = (p.scanlines || 50) / 100;

    const outImg = this.ctx.createImageData(w, h);
    const out = outImg.data;
    const cx = w / 2;
    const cy = h / 2;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > scopeR) {
          out[idx] = 0;
          out[idx + 1] = 0;
          out[idx + 2] = 0;
          out[idx + 3] = 255;
          continue;
        }

        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        let lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        // Noise
        const noise = (Math.random() - 0.5) * (noiseLevel / 100);
        lum = Math.min(1, Math.max(0, lum + noise));

        // Vignette factor near scope edge
        const edgeFade = 1 - Math.pow(dist / scopeR, 4);
        lum *= edgeFade;

        // Phosphor Green curve
        out[idx] = Math.floor(lum * 40 * phosphor);
        out[idx + 1] = Math.floor(lum * 240 * phosphor);
        out[idx + 2] = Math.floor(lum * 70 * phosphor);
        out[idx + 3] = 255;
      }
    }

    this.ctx.putImageData(outImg, 0, 0);

    // Scanlines
    if (scanlineInt > 0) {
      this.ctx.fillStyle = `rgba(0, 20, 5, ${scanlineInt * 0.4})`;
      for (let y = 0; y < h; y += 4) {
        this.ctx.fillRect(0, y, w, 2);
      }
    }

    // Scope HUD overlay
    if (showHud) {
      this.ctx.save();
      this.ctx.strokeStyle = 'rgba(100, 255, 120, 0.75)';
      this.ctx.lineWidth = 1.5;

      // Outer ring
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, scopeR - 2, 0, Math.PI * 2);
      this.ctx.stroke();

      // Crosshairs
      this.ctx.beginPath();
      this.ctx.moveTo(cx - scopeR + 20, cy);
      this.ctx.lineTo(cx - 30, cy);
      this.ctx.moveTo(cx + 30, cy);
      this.ctx.lineTo(cx + scopeR - 20, cy);

      this.ctx.moveTo(cx, cy - scopeR + 20);
      this.ctx.lineTo(cx, cy - 30);
      this.ctx.moveTo(cx, cy + 30);
      this.ctx.lineTo(cx, cy + scopeR - 20);
      this.ctx.stroke();

      // Target reticle numbers
      this.ctx.fillStyle = '#4ade80';
      this.ctx.font = '600 13px "Fira Code", monospace';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('356', cx, cy - scopeR + 45);

      this.ctx.font = '11px "Fira Code", monospace';
      this.ctx.fillText('NVG-GEN3 // RANGE: 420m', cx, cy + scopeR - 35);
      this.ctx.restore();
    }
  }

  // 3. TACTICAL SURVEILLANCE HUD WITH REAL OBJECT DETECTION & MATRIX GRID
  renderSurveillance(w, h, data, p) {
    const sensitivity = (p.sensitivity || 50) / 100;
    const boxLimit = p.boxCount || 8;
    const vectorLines = (p.vectorLines || 70) / 100;
    const colorMode = p.colorMode || 'cyan';
    const desat = (p.desaturateBg || 60) / 100;
    const showText = p.showText !== false;
    const showGrid = p.showDotGrid !== false;

    // Step 1: Desaturate background & compute edge intensity map
    const outImg = this.ctx.createImageData(w, h);
    const out = outImg.data;
    const edgeMap = new Float32Array(w * h);

    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i = (y * w + x) * 4;

        // Desaturated background
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;

        out[i] = r * (1 - desat) + gray * desat;
        out[i + 1] = g * (1 - desat) + gray * desat;
        out[i + 2] = b * (1 - desat) + gray * desat;
        out[i + 3] = 255;

        // Sobel edge gradient detection to locate real objects
        const iLeft = (y * w + (x - 1)) * 4;
        const iRight = (y * w + (x + 1)) * 4;
        const iTop = ((y - 1) * w + x) * 4;
        const iBottom = ((y + 1) * w + x) * 4;

        const gL = 0.299 * data[iLeft] + 0.587 * data[iLeft + 1] + 0.114 * data[iLeft + 2];
        const gR = 0.299 * data[iRight] + 0.587 * data[iRight + 1] + 0.114 * data[iRight + 2];
        const gT = 0.299 * data[iTop] + 0.587 * data[iTop + 1] + 0.114 * data[iTop + 2];
        const gB = 0.299 * data[iBottom] + 0.587 * data[iBottom + 1] + 0.114 * data[iBottom + 2];

        const gx = gR - gL;
        const gy = gB - gT;
        edgeMap[y * w + x] = Math.sqrt(gx * gx + gy * gy);
      }
    }
    this.ctx.putImageData(outImg, 0, 0);

    // Step 2: Object Detection - Grid Cluster Scanning
    const gridSize = 40;
    const detectedBoxes = [];
    const minEdgeThresh = 30 * (1.2 - sensitivity);

    for (let gy = 0; gy < h; gy += gridSize) {
      for (let gx = 0; gx < w; gx += gridSize) {
        let totalEdge = 0;
        let minX = gx + gridSize, maxX = gx, minY = gy + gridSize, maxY = gy;

        for (let y = gy; y < Math.min(h, gy + gridSize); y += 4) {
          for (let x = gx; x < Math.min(w, gx + gridSize); x += 4) {
            const val = edgeMap[y * w + x];
            if (val > minEdgeThresh) {
              totalEdge += val;
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }

        if (totalEdge > 300 && maxX > minX + 15 && maxY > minY + 15) {
          detectedBoxes.push({
            x: Math.max(10, minX - 10),
            y: Math.max(10, minY - 10),
            bw: Math.min(w - minX - 10, maxX - minX + 20),
            bh: Math.min(h - minY - 10, maxY - minY + 20),
            score: totalEdge,
            label: `[Obj_${detectedBoxes.length + 1}]`
          });
        }
      }
    }

    // Sort by edge density score and pick top N detected objects
    detectedBoxes.sort((a, b) => b.score - a.score);
    let activeBoxes = detectedBoxes.slice(0, boxLimit);

    // Fallback if image has smooth features
    if (activeBoxes.length === 0) {
      activeBoxes = [
        { x: w * 0.15, y: h * 0.35, bw: 140, bh: 180, label: '[Target_Alpha 98%]' },
        { x: w * 0.45, y: h * 0.45, bw: 160, bh: 200, label: '[Subject_Beta 94%]' },
        { x: w * 0.7, y: h * 0.5, bw: 130, bh: 150, label: '[Target_Gamma 91%]' }
      ];
    } else {
      // Dynamic AI object labels
      const labels = ['[Human_Subject 98.4%]', '[Target_Alpha 96.1%]', '[Vehicle_Node 93.8%]', '[F-Stage3]', '[F-Stage4]', '[F-Stage5]', '[F-Stage6]', '[P-3 v0.3]'];
      activeBoxes.forEach((b, idx) => {
        b.label = labels[idx % labels.length];
      });
    }

    // Step 3: Draw Dot Matrix Mesh Overlay (exact style of image 4c07e58f)
    if (showGrid) {
      this.ctx.save();
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      const dotSpacing = 16;
      for (let y = 20; y < h - 20; y += dotSpacing) {
        for (let x = 20; x < w - 20; x += dotSpacing) {
          this.ctx.fillRect(x, y, 1.5, 1.5);
        }
      }
      this.ctx.restore();
    }

    // Step 4: Color Palette & HUD Elements
    const colors = {
      cyan: { stroke: '#38bdf8', text: '#7dd3fc', bg: 'rgba(56, 189, 248, 0.15)' },
      orange: { stroke: '#fb923c', text: '#ffedd5', bg: 'rgba(251, 146, 60, 0.15)' },
      green: { stroke: '#4ade80', text: '#dcfce7', bg: 'rgba(74, 222, 128, 0.15)' },
      magenta: { stroke: '#f472b6', text: '#fce7f3', bg: 'rgba(244, 114, 182, 0.15)' }
    }[colorMode];

    this.ctx.save();

    // Curved Spline Trajectory Lines connecting detected objects
    if (vectorLines > 0 && activeBoxes.length > 1) {
      this.ctx.strokeStyle = 'rgba(251, 146, 60, 0.75)';
      this.ctx.lineWidth = 1.5;
      this.ctx.setLineDash([4, 4]);
      this.ctx.beginPath();

      for (let i = 0; i < activeBoxes.length - 1; i++) {
        const p1 = activeBoxes[i];
        const p2 = activeBoxes[i + 1];
        const cx1 = p1.x + p1.bw / 2;
        const cy1 = p1.y + p1.bh / 2;
        const cx2 = p2.x + p2.bw / 2;
        const cy2 = p2.y + p2.bh / 2;

        this.ctx.moveTo(cx1, cy1);
        this.ctx.quadraticCurveTo((cx1 + cx2) / 2, Math.min(cy1, cy2) - 40, cx2, cy2);
      }
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    }

    // Render Bounding Boxes & Tracking Nodes over detected objects
    activeBoxes.forEach((box) => {
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      this.ctx.lineWidth = 1.2;

      // Outer Bounding Box
      this.ctx.strokeRect(box.x, box.y, box.bw, box.bh);

      // Corner Brackets for AI Detection feel
      const cLen = 10;
      this.ctx.strokeStyle = colors.stroke;
      this.ctx.lineWidth = 2;
      // Top-Left
      this.ctx.beginPath();
      this.ctx.moveTo(box.x, box.y + cLen);
      this.ctx.lineTo(box.x, box.y);
      this.ctx.lineTo(box.x + cLen, box.y);
      // Top-Right
      this.ctx.moveTo(box.x + box.bw - cLen, box.y);
      this.ctx.lineTo(box.x + box.bw, box.y);
      this.ctx.lineTo(box.x + box.bw, box.y + cLen);
      // Bottom-Left
      this.ctx.moveTo(box.x, box.y + box.bh - cLen);
      this.ctx.lineTo(box.x, box.y + box.bh);
      this.ctx.lineTo(box.x + cLen, box.y + box.bh);
      // Bottom-Right
      this.ctx.moveTo(box.x + box.bw - cLen, box.y + box.bh);
      this.ctx.lineTo(box.x + box.bw, box.y + box.bh);
      this.ctx.lineTo(box.x + box.bw, box.y + box.bh - cLen);
      this.ctx.stroke();

      // Red Center Target Node & Crosshair
      const nodeX = box.x + 8;
      const nodeY = box.y + 8;
      this.ctx.fillStyle = '#ef4444';
      this.ctx.beginPath();
      this.ctx.arc(nodeX, nodeY, 4, 0, Math.PI * 2);
      this.ctx.fill();

      // Outer ring on node
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.arc(nodeX, nodeY, 8, 0, Math.PI * 2);
      this.ctx.stroke();

      // Black & White split indicator box label (exact match for 4c07e58f)
      if (showText) {
        this.ctx.font = '600 11px "Fira Code", monospace';
        const txtWidth = this.ctx.measureText(box.label).width + 12;

        // Label Background
        this.ctx.fillStyle = '#0a0a0c';
        this.ctx.fillRect(box.x, box.y - 20, txtWidth, 18);
        this.ctx.strokeStyle = colors.stroke;
        this.ctx.strokeRect(box.x, box.y - 20, txtWidth, 18);

        // Label Text
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText(box.label, box.x + 6, box.y - 7);
      }
    });

    // Top-Right Data Telemetry HUD Block (matching 4c07e58f)
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(w - 260, 20, 240, 75);
    this.ctx.strokeStyle = colors.stroke;
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(w - 260, 20, 240, 75);

    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '700 11px "Fira Code", monospace';
    this.ctx.fillText('[Migratory_Server]', w - 250, 38);
    this.ctx.font = '400 10px "Fira Code", monospace';
    this.ctx.fillStyle = '#94a3b8';
    this.ctx.fillText('Future Timescale : 100 yrs', w - 120, 38);
    this.ctx.fillText('Atmospheric modelling', w - 120, 52);
    this.ctx.fillText('Carbon credits', w - 120, 66);
    this.ctx.fillText('[Flocking_permutations]', w - 120, 80);

    this.ctx.restore();
  }

  // 4. SAND DISINTEGRATION
  renderSand(w, h, data, p) {
    const dissolve = (p.dissolveAmount || 55) / 100;
    const pScale = p.particleSize || 2.5;
    const drift = (p.dispersionSpeed || 40) / 100;
    const turb = (p.turbulence || 65) / 100;
    const animate = p.animate !== false;

    this.ctx.fillStyle = '#050508';
    this.ctx.fillRect(0, 0, w, h);

    const step = 4;
    const animOffset = animate ? this.time * 20 * drift : 0;

    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const i = (y * w + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        if (lum < 0.08) continue;

        // Pseudorandom noise factor
        const rand = (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
        const isDispersed = rand < dissolve;

        if (!isDispersed) {
          this.ctx.fillStyle = `rgb(${r},${g},${b})`;
          this.ctx.fillRect(x, y, pScale, pScale);
        } else {
          // Particle drift away
          const noiseX = Math.sin(y * 0.05 + animOffset) * 40 * turb;
          const noiseY = -Math.cos(x * 0.05 + animOffset) * 60 * drift;
          const px = x + noiseX + (rand - 0.5) * 30;
          const py = y + noiseY - rand * 50 * dissolve;

          const alpha = Math.max(0, 1 - (py - y) / 100);
          this.ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          this.ctx.fillRect(px, py, pScale * 0.8, pScale * 0.8);
        }
      }
    }
  }

  // 5. THERMAL HEATMAP SPECTRUM
  renderThermal(w, h, data, p) {
    const rampType = p.colorRamp || 'ironbow';
    const gain = p.gain || 1.2;
    const contrast = p.contrast || 1.0;
    const noiseAmt = (p.noise || 15) / 100;

    const outImg = this.ctx.createImageData(w, h);
    const out = outImg.data;

    // Color ramp generators
    const getRampColor = (val) => {
      val = Math.min(1, Math.max(0, Math.pow(val * gain, contrast)));
      if (rampType === 'ironbow') {
        // Black -> Purple -> Magenta -> Orange -> Yellow -> White
        if (val < 0.25) return [val * 4 * 80, 0, val * 4 * 160];
        if (val < 0.5) return [(val - 0.25) * 4 * 175 + 80, 0, 160 - (val - 0.25) * 4 * 160];
        if (val < 0.75) return [255, (val - 0.5) * 4 * 160, 0];
        return [255, 160 + (val - 0.75) * 4 * 95, (val - 0.75) * 4 * 255];
      } else if (rampType === 'fire') {
        if (val < 0.33) return [val * 3 * 255, 0, 0];
        if (val < 0.66) return [255, (val - 0.33) * 3 * 200, 0];
        return [255, 200 + (val - 0.66) * 3 * 55, (val - 0.66) * 3 * 255];
      } else {
        // Rainbow
        if (val < 0.2) return [0, 0, val * 5 * 255];
        if (val < 0.4) return [0, (val - 0.2) * 5 * 255, 255];
        if (val < 0.6) return [0, 255, 255 - (val - 0.4) * 5 * 255];
        if (val < 0.8) return [(val - 0.6) * 5 * 255, 255, 0];
        return [255, 255 - (val - 0.8) * 5 * 255, (val - 0.8) * 5 * 255];
      }
    };

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      let lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

      if (noiseAmt > 0) {
        lum += (Math.random() - 0.5) * noiseAmt;
      }

      const [cr, cg, cb] = getRampColor(lum);
      out[i] = cr;
      out[i + 1] = cg;
      out[i + 2] = cb;
      out[i + 3] = 255;
    }

    this.ctx.putImageData(outImg, 0, 0);
  }

  // 6. PIXEL SORTING & BIT GLITCH
  renderPixelSort(w, h, data, p) {
    const blockSize = Math.max(2, p.blockSize || 8);
    const sortThresh = (p.sortThreshold || 45) / 100;
    const glitchInt = (p.glitchFrequency || 60) / 100;
    const dir = p.direction || 'vertical';

    // Start with original
    this.ctx.drawImage(this.offscreen, 0, 0);

    const imgData = this.ctx.getImageData(0, 0, w, h);
    const pix = imgData.data;

    // Apply pixel block sorting
    for (let y = 0; y < h; y += blockSize) {
      for (let x = 0; x < w; x += blockSize) {
        const idx = (y * w + x) * 4;
        const lum = (0.299 * pix[idx] + 0.587 * pix[idx + 1] + 0.114 * pix[idx + 2]) / 255;

        if (lum < sortThresh) {
          // Monochromatic pixel dither block
          const bw = lum > 0.3 ? 240 : 15;
          for (let by = 0; by < blockSize && y + by < h; by++) {
            for (let bx = 0; bx < blockSize && x + bx < w; bx++) {
              const bi = ((y + by) * w + (x + bx)) * 4;
              pix[bi] = bw;
              pix[bi + 1] = bw;
              pix[bi + 2] = bw;
            }
          }
        }
      }
    }

    this.ctx.putImageData(imgData, 0, 0);

    // Glitch horizontal slices
    if (glitchInt > 0) {
      const sliceCount = Math.floor(glitchInt * 15);
      for (let i = 0; i < sliceCount; i++) {
        const sy = Math.floor(Math.random() * h);
        const sh = Math.floor(Math.random() * 20) + 4;
        const shiftX = Math.floor((Math.random() - 0.5) * 60 * glitchInt);
        this.ctx.drawImage(this.canvas, 0, sy, w, sh, shiftX, sy, w, sh);
      }
    }
  }

  // 7. LIDAR 3D WIREFRAME MESH
  renderLidar(w, h, data, p) {
    const gridRes = p.gridDensity || 24;
    const depthH = (p.depthExtrusion || 35) * 2;
    const wireGlow = (p.wireGlow || 80) / 100;
    const colorMode = p.wireColor || 'white';
    const showPoints = p.showPointCloud !== false;

    // Dark grey background
    this.ctx.fillStyle = '#090a0f';
    this.ctx.fillRect(0, 0, w, h);

    const strokeColor = {
      white: `rgba(255, 255, 255, ${wireGlow})`,
      cyan: `rgba(56, 189, 248, ${wireGlow})`,
      green: `rgba(74, 222, 128, ${wireGlow})`,
      red: `rgba(248, 113, 113, ${wireGlow})`
    }[colorMode];

    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = 1;

    const cellW = w / gridRes;
    const cellH = h / gridRes;

    // Compute grid vertices depth
    const vertices = [];
    for (let gy = 0; gy <= gridRes; gy++) {
      const row = [];
      for (let gx = 0; gx <= gridRes; gx++) {
        const px = Math.min(w - 1, Math.floor(gx * cellW));
        const py = Math.min(h - 1, Math.floor(gy * cellH));
        const i = (py * w + px) * 4;
        const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
        const zOffset = (lum - 0.5) * depthH;
        row.push({ x: px, y: py - zOffset, z: lum });
      }
      vertices.push(row);
    }

    // Draw triangulated mesh
    this.ctx.beginPath();
    for (let gy = 0; gy < gridRes; gy++) {
      for (let gx = 0; gx < gridRes; gx++) {
        const p1 = vertices[gy][gx];
        const p2 = vertices[gy][gx + 1];
        const p3 = vertices[gy + 1][gx];
        const p4 = vertices[gy + 1][gx + 1];

        // Triangle 1
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.lineTo(p3.x, p3.y);
        this.ctx.closePath();

        // Triangle 2
        this.ctx.moveTo(p2.x, p2.y);
        this.ctx.lineTo(p4.x, p4.y);
        this.ctx.lineTo(p3.x, p3.y);
        this.ctx.closePath();
      }
    }
    this.ctx.stroke();

    // Draw point cloud nodes
    if (showPoints) {
      this.ctx.fillStyle = strokeColor;
      for (let gy = 0; gy <= gridRes; gy++) {
        for (let gx = 0; gx <= gridRes; gx++) {
          const pt = vertices[gy][gx];
          this.ctx.fillRect(pt.x - 1.5, pt.y - 1.5, 3, 3);
        }
      }
    }
  }

  // 8. X-RAY SOLARIZE GLOW
  renderXray(w, h, data, p) {
    const rimGlow = (p.rimLight || 85) / 100;
    const solShift = (p.solarizeThreshold || 50) / 100;
    const contrast = p.contrast || 1.5;
    const tint = (p.coolTint || 70) / 100;

    const outImg = this.ctx.createImageData(w, h);
    const out = outImg.data;

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i] / 255;
      let g = data[i + 1] / 255;
      let b = data[i + 2] / 255;

      let lum = 0.299 * r + 0.587 * g + 0.114 * b;

      // Solarize inversion
      if (lum > solShift) {
        lum = 1.0 - lum;
      }
      lum = Math.pow(lum, 1 / contrast);

      // Cool Slate X-Ray blue tint
      let xr = lum * (1 - tint * 0.4);
      let xg = lum * (1 + tint * 0.2);
      let xb = lum * (1 + tint * 0.6);

      out[i] = Math.min(255, Math.floor(xr * 255 * (1 + rimGlow)));
      out[i + 1] = Math.min(255, Math.floor(xg * 255 * (1 + rimGlow)));
      out[i + 2] = Math.min(255, Math.floor(xb * 255 * (1 + rimGlow)));
      out[i + 3] = 255;
    }

    this.ctx.putImageData(outImg, 0, 0);
  }

  // 9. ASCII DOT TELETYPE
  renderAsciiTeletype(w, h, data, p) {
    const fontSize = p.fontSize || 10;
    const charsetType = p.charset || 'standard';
    const contrast = p.contrast || 1.3;
    const paperTexture = (p.paperTexture || 40) / 100;

    // Dark grey paper background
    this.ctx.fillStyle = '#1e2025';
    this.ctx.fillRect(0, 0, w, h);

    const charSets = {
      standard: ['#', '#', '+', '+', '-', '-', '.', '.', ' '],
      dots: ['::', ':', '..', '.', ' '],
      binary: ['1', '0', ' '],
      blocks: ['█', '▓', '▒', '░', ' ']
    };
    const chars = charSets[charsetType];

    this.ctx.fillStyle = 'rgba(240, 243, 248, 0.9)';
    this.ctx.font = `600 ${fontSize}px "Fira Code", monospace`;
    this.ctx.textAlign = 'center';

    for (let y = 0; y < h; y += fontSize) {
      for (let x = 0; x < w; x += fontSize * 0.7) {
        const xi = Math.min(w - 1, Math.floor(x));
        const yi = Math.min(h - 1, Math.floor(y));
        const i = (yi * w + xi) * 4;

        let lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
        lum = Math.pow(lum, contrast);

        const charIdx = Math.floor((1 - lum) * (chars.length - 1));
        const ch = chars[Math.min(chars.length - 1, Math.max(0, charIdx))];

        if (ch && ch !== ' ') {
          this.ctx.fillText(ch, x, y + fontSize);
        }
      }
    }
  }

  // 10. ASCII SUBJECT CUTOUT
  renderAsciiCutout(w, h, data, p) {
    const threshold = (p.maskThreshold || 50) / 100;
    const density = p.charDensity || 12;
    const glowTint = p.glowTint || 'white';

    // Draw background image desaturated
    this.ctx.drawImage(this.offscreen, 0, 0);

    const chars = ['#', '+', '-', '*', '%', '$', '@', '.'];
    const tintColor = {
      white: '#ffffff',
      amber: '#fbbf24',
      green: '#4ade80',
      cyan: '#38bdf8'
    }[glowTint];

    this.ctx.fillStyle = tintColor;
    this.ctx.font = `700 ${density}px "Fira Code", monospace`;

    for (let y = 0; y < h; y += density) {
      for (let x = 0; x < w; x += density * 0.65) {
        const i = (Math.floor(y) * w + Math.floor(x)) * 4;
        const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;

        if (lum > threshold * 0.4) {
          const c = chars[Math.floor((1 - lum) * (chars.length - 1))];
          this.ctx.fillText(c, x, y);
        }
      }
    }
  }

  // 11. MATRIX CYBER STREAM
  renderMatrix(w, h, data, p) {
    const density = p.codeDensity || 14;
    const speed = (p.rainSpeed || 60) / 100;
    const glow = (p.glowIntensity || 90) / 100;
    const colorMode = p.codeColor || 'matrixGreen';
    const animate = p.animate !== false;

    this.ctx.fillStyle = '#020617';
    this.ctx.fillRect(0, 0, w, h);

    const matrixChars = '0101010189ABCDEF';
    const palette = {
      matrixGreen: '#4ade80',
      cyberBlue: '#38bdf8',
      amberGold: '#fbbf24',
      neonRed: '#f87171'
    }[colorMode];

    this.ctx.font = `700 ${density}px "Fira Code", monospace`;
    this.ctx.fillStyle = palette;
    this.ctx.shadowColor = palette;
    this.ctx.shadowBlur = glow * 12;

    const animY = animate ? (this.time * 60 * speed) % h : 0;

    for (let x = 0; x < w; x += density * 0.7) {
      for (let y = 0; y < h; y += density) {
        const xi = Math.min(w - 1, Math.floor(x));
        const yi = Math.min(h - 1, Math.floor(y));
        const i = (yi * w + xi) * 4;

        const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;

        if (lum > 0.15) {
          const ch = matrixChars[Math.floor((x + y + animY) % matrixChars.length)];
          this.ctx.fillText(ch, x, (y + animY) % h);
        }
      }
    }
    this.ctx.shadowBlur = 0;
  }

  // 12. CRT PHOSPHOR TERMINAL
  renderCrt(w, h, data, p) {
    const lineDensity = p.lineDensity || 3;
    const phosphorGlow = (p.phosphorGlow || 85) / 100;
    const paletteMode = p.palette || 'monochromeGreen';
    const flicker = (p.flicker || 25) / 100;

    this.ctx.fillStyle = '#040d06';
    this.ctx.fillRect(0, 0, w, h);

    const outImg = this.ctx.createImageData(w, h);
    const out = outImg.data;

    const flickVal = 1 - (Math.random() - 0.5) * flicker * 0.3;

    for (let y = 0; y < h; y++) {
      const isLine = y % (lineDensity * 2) < lineDensity;
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        const lum = (0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2]) / 255;

        const factor = isLine ? lum * phosphorGlow * flickVal : lum * phosphorGlow * 0.3 * flickVal;

        if (paletteMode === 'monochromeGreen') {
          out[idx] = Math.floor(factor * 30);
          out[idx + 1] = Math.floor(factor * 255);
          out[idx + 2] = Math.floor(factor * 60);
        } else if (paletteMode === 'amberP3') {
          out[idx] = Math.floor(factor * 255);
          out[idx + 1] = Math.floor(factor * 170);
          out[idx + 2] = Math.floor(factor * 20);
        } else if (paletteMode === 'cyanP1') {
          out[idx] = Math.floor(factor * 20);
          out[idx + 1] = Math.floor(factor * 230);
          out[idx + 2] = Math.floor(factor * 255);
        } else {
          // B&W
          out[idx] = Math.floor(factor * 240);
          out[idx + 1] = Math.floor(factor * 240);
          out[idx + 2] = Math.floor(factor * 240);
        }
        out[idx + 3] = 255;
      }
    }

    this.ctx.putImageData(outImg, 0, 0);
  }

  // 13. STIPPLE GRAIN POINTILLISM (matching 0e0f62c0)
  renderStippleGrain(w, h, data, p) {
    const density = (p.grainDensity || 75) / 100;
    const gScale = p.grainSize || 1.5;
    const contrast = p.contrast || 1.8;
    const cutoff = (p.threshold || 40) / 100;
    const invert = p.invert || false;

    this.ctx.fillStyle = invert ? '#f4f4f6' : '#07070a';
    this.ctx.fillRect(0, 0, w, h);

    this.ctx.fillStyle = invert ? '#07070a' : '#ffffff';

    const step = 2;
    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const i = (y * w + x) * 4;
        let lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;

        if (invert) lum = 1 - lum;
        lum = Math.pow(lum, contrast);

        if (lum > cutoff * 0.3) {
          const rand = Math.random();
          if (rand < lum * density) {
            const size = gScale * (0.6 + Math.random() * 0.8);
            this.ctx.fillRect(x + (Math.random() - 0.5) * 2, y + (Math.random() - 0.5) * 2, size, size);
          }
        }
      }
    }
  }

  // 14. PARTICLE DUST SHADOW (matching d0133f6e)
  renderDustShadow(w, h, data, p) {
    const density = (p.dustDensity || 70) / 100;
    const spread = (p.floorSpread || 60) / 100;
    const pSize = p.particleSize || 2.0;
    const shadowOp = (p.shadowDarkness || 80) / 100;
    const pGlow = (p.glow || 90) / 100;

    // Dark grey paper background
    this.ctx.fillStyle = '#111215';
    this.ctx.fillRect(0, 0, w, h);

    // Draw main subject desaturated with stipple edges
    const step = 3;
    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const i = (y * w + x) * 4;
        const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;

        if (lum > 0.15) {
          // Render main subject body
          this.ctx.fillStyle = `rgba(240, 240, 245, ${lum * pGlow})`;
          this.ctx.fillRect(x, y, pSize, pSize);

          // Emit ground sand dust particles underneath subject
          if (y > h * 0.4 && Math.random() < density * 0.4) {
            const offsetY = (Math.random() * 0.6) * (h - y) * spread;
            const offsetX = (Math.random() - 0.5) * 120 * spread;
            const dustAlpha = Math.max(0, 1 - offsetY / (h * 0.5)) * shadowOp;

            this.ctx.fillStyle = `rgba(230, 230, 235, ${dustAlpha * 0.7})`;
            this.ctx.fillRect(x + offsetX, y + offsetY, pSize * 0.8, pSize * 0.8);
          }
        }
      }
    }
  }

  // 15. CELESTIAL RADIANCE GLOW (matching d4beb70d)
  renderCelestialGlow(w, h, data, p) {
    const glowInt = (p.glowIntensity || 90) / 100;
    const bloomRad = p.bloomRadius || 25;
    const thresh = (p.subjectSensitivity || 45) / 100;
    const coreBright = p.coreBrightness || 1.0;
    const bgSat = p.bgSaturation || 1.2;

    // Step 1: Draw vivid saturated background image
    const outImg = this.ctx.createImageData(w, h);
    const out = outImg.data;

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];

      // Boost background saturation
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      out[i] = Math.min(255, Math.max(0, gray + (r - gray) * bgSat));
      out[i + 1] = Math.min(255, Math.max(0, gray + (g - gray) * bgSat));
      out[i + 2] = Math.min(255, Math.max(0, gray + (b - gray) * bgSat));
      out[i + 3] = 255;
    }
    this.ctx.putImageData(outImg, 0, 0);

    // Step 2: Extract subject silhouette & fill with pure glowing celestial light
    this.ctx.save();
    this.ctx.shadowColor = '#ffffff';
    this.ctx.shadowBlur = bloomRad * glowInt;
    this.ctx.fillStyle = `rgba(255, 255, 255, ${coreBright})`;

    for (let y = 0; y < h; y += 3) {
      for (let x = 0; x < w; x += 3) {
        const i = (y * w + x) * 4;
        const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;

        if (lum > thresh) {
          this.ctx.fillRect(x, y, 3.5, 3.5);
        }
      }
    }
    this.ctx.restore();
  }

  // 16. CYBERPUNK HOLOGRAM MESH (Semi-Overlay)
  renderHologram(w, h, data, p) {
    const opacity = (p.effectOpacity || 65) / 100;
    const neonGlow = (p.neonGlow || 80) / 100;
    const gridRes = p.gridDensity || 24;
    const paletteMode = p.colorPalette || 'cyanPink';
    const scanlineInt = (p.scanlines || 40) / 100;

    // Step 1: Draw original image first
    this.ctx.drawImage(this.offscreen, 0, 0);

    const colors = {
      cyanPink: { stroke: '#38bdf8', glow: '#f472b6' },
      matrixGreen: { stroke: '#4ade80', glow: '#22c55e' },
      amberSynth: { stroke: '#fbbf24', stroke2: '#f97316' }
    }[paletteMode];

    // Step 2: Overlay Hologram Grid
    this.ctx.save();
    this.ctx.globalAlpha = opacity;
    this.ctx.strokeStyle = colors.stroke;
    this.ctx.lineWidth = 1;

    const cellW = w / gridRes;
    const cellH = h / gridRes;

    this.ctx.beginPath();
    for (let x = 0; x <= w; x += cellW) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, h);
    }
    for (let y = 0; y <= h; y += cellH) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(w, y);
    }
    this.ctx.stroke();

    // Step 3: Neon Edge Outline Glow
    this.ctx.shadowColor = colors.glow || colors.stroke;
    this.ctx.shadowBlur = neonGlow * 15;
    this.ctx.strokeStyle = colors.glow || '#ffffff';
    this.ctx.lineWidth = 1.5;

    for (let y = 10; y < h - 10; y += cellH) {
      for (let x = 10; x < w - 10; x += cellW) {
        const i = (Math.floor(y) * w + Math.floor(x)) * 4;
        const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
        if (lum > 0.4) {
          this.ctx.strokeRect(x, y, cellW * 0.8, cellH * 0.8);
        }
      }
    }

    // Step 4: Scanlines Overlay
    if (scanlineInt > 0) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, ' + scanlineInt * 0.4 + ')';
      for (let y = 0; y < h; y += 4) {
        this.ctx.fillRect(0, y, w, 1.5);
      }
    }
    this.ctx.restore();
  }

  // 17. SYNTHWAVE DUOTONE GLOW (Semi-Overlay)
  renderSynthwave(w, h, data, p) {
    const blendRatio = (p.blendRatio || 50) / 100;
    const duoMode = p.duotonePreset || 'magentaCyan';
    const gridOp = (p.gridOverlay || 60) / 100;
    const bloom = (p.bloom || 75) / 100;

    const outImg = this.ctx.createImageData(w, h);
    const out = outImg.data;

    const gradients = {
      magentaCyan: { c1: [244, 114, 182], c2: [56, 189, 248] },
      sunsetGold: { c1: [251, 146, 60], c2: [236, 72, 153] },
      purpleNeon: { c1: [192, 132, 252], c2: [74, 222, 128] }
    }[duoMode];

    for (let i = 0; i < data.length; i += 4) {
      const origR = data[i];
      const origG = data[i + 1];
      const origB = data[i + 2];

      const lum = (0.299 * origR + 0.587 * origG + 0.114 * origB) / 255;

      const duoR = gradients.c1[0] * (1 - lum) + gradients.c2[0] * lum;
      const duoG = gradients.c1[1] * (1 - lum) + gradients.c2[1] * lum;
      const duoB = gradients.c1[2] * (1 - lum) + gradients.c2[2] * lum;

      // Blend original image with synthwave duotone
      out[i] = origR * blendRatio + duoR * (1 - blendRatio);
      out[i + 1] = origG * blendRatio + duoG * (1 - blendRatio);
      out[i + 2] = origB * blendRatio + duoB * (1 - blendRatio);
      out[i + 3] = 255;
    }

    this.ctx.putImageData(outImg, 0, 0);

    // Perspective Floor Grid Overlay
    if (gridOp > 0) {
      this.ctx.save();
      this.ctx.globalAlpha = gridOp * 0.7;
      this.ctx.strokeStyle = '#f472b6';
      this.ctx.shadowColor = '#f472b6';
      this.ctx.shadowBlur = bloom * 10;
      this.ctx.lineWidth = 1.2;

      const horizon = h * 0.65;
      const vpX = w / 2;

      // Perspective lines radiating from horizon
      for (let x = -w; x <= w * 2; x += w / 8) {
        this.ctx.beginPath();
        this.ctx.moveTo(vpX, horizon);
        this.ctx.lineTo(x, h);
        this.ctx.stroke();
      }

      // Horizontal grid lines
      for (let y = horizon; y < h; y += (h - horizon) / 8) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(w, y);
        this.ctx.stroke();
      }
      this.ctx.restore();
    }
  }

  // 18. SEMI RGB SPLIT GLITCH (Semi-Overlay)
  renderRgbSplit(w, h, data, p) {
    const opacity = (p.effectOpacity || 75) / 100;
    const shift = p.rgbDisplacement || 12;
    const vhsNoise = (p.vhsNoise || 35) / 100;
    const glitchLines = (p.glitchFrequency || 30) / 100;
    const vigBlur = (p.vignetteBlur || 45) / 100;

    const outImg = this.ctx.createImageData(w, h);
    const out = outImg.data;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;

        // Original image channels
        const origR = data[i];
        const origG = data[i + 1];
        const origB = data[i + 2];

        // Shift Red channel right, Blue channel left
        const rx = Math.min(w - 1, Math.max(0, x + shift));
        const bx = Math.min(w - 1, Math.max(0, x - shift));

        const rIdx = (y * w + rx) * 4;
        const bIdx = (y * w + bx) * 4;

        let r = data[rIdx];
        let g = origG;
        let b = data[bIdx + 2];

        // VHS tracking noise
        if (vhsNoise > 0 && Math.random() < vhsNoise * 0.1) {
          const noise = (Math.random() - 0.5) * 80;
          r = Math.min(255, Math.max(0, r + noise));
          g = Math.min(255, Math.max(0, g + noise));
          b = Math.min(255, Math.max(0, b + noise));
        }

        // Vignette radial darkening
        if (vigBlur > 0) {
          const dx = (x - w / 2) / (w / 2);
          const dy = (y - h / 2) / (h / 2);
          const dist = Math.sqrt(dx * dx + dy * dy);
          const vig = 1 - Math.pow(dist, 3) * vigBlur * 0.7;
          r *= vig;
          g *= vig;
          b *= vig;
        }

        // Blend with original image
        out[i] = origR * (1 - opacity) + r * opacity;
        out[i + 1] = origG * (1 - opacity) + g * opacity;
        out[i + 2] = origB * (1 - opacity) + b * opacity;
        out[i + 3] = 255;
      }
    }

    this.ctx.putImageData(outImg, 0, 0);

    // Glitch Horizontal Line Slices
    if (glitchLines > 0) {
      const sliceCount = Math.floor(glitchLines * 12);
      for (let i = 0; i < sliceCount; i++) {
        const sy = Math.floor(Math.random() * h);
        const sh = Math.floor(Math.random() * 8) + 2;
        const shiftX = Math.floor((Math.random() - 0.5) * 35);
        this.ctx.drawImage(this.canvas, 0, sy, w, sh, shiftX, sy, w, sh);
      }
    }
  }
}
