# Contributing to EffectApp Studio

Thank you for your interest in contributing to **EffectApp Studio**! We welcome bug reports, feature suggestions, new effect shaders/presets, performance optimizations, and documentation improvements.

---

## 🚀 Getting Started

1. **Fork the Repository**: Click the **Fork** button on GitHub.
2. **Clone your Fork**:
   ```bash
   git clone https://github.com/pruthvi828/effect-app.git
   cd effect-app
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

---

## 🎨 Adding a New Visual Effect

To create a new effect preset:

1. **Register the Preset Configuration in [`src/presets.js`](src/presets.js)**:
   Add a new entry to the `PRESETS` array with:
   - `id`: Unique kebab-case identifier (e.g., `'custom-bloom'`)
   - `name`: Display name
   - `category`: Preset category (e.g., `'Sci-Fi & Cyber'`, `'Print & Vintage'`)
   - `sampleImage`: Default preview image path (from `/public/examle/`)
   - `description`: Short description of what the effect accomplishes
   - `params`: Object defining customizable controls (slider, checkbox, or select)

2. **Implement the Rendering Routine in [`src/engine/EffectRenderer.js`](src/engine/EffectRenderer.js)**:
   - Add a case in `render(presetId, paramValues)` matching your new `id`.
   - Implement the corresponding rendering method `renderCustomBloom(w, h, data, paramValues)`.
   - Use direct pixel manipulation on `ImageData` or high-performance canvas 2D draw routines.

3. **Verify Performance**:
   - Ensure the effect maintains smooth 60 FPS under typical resolutions (800x600 to 1200x900).
   - Test with both static images, uploaded videos, and live webcam feeds.

---

## 🛠️ Code Guidelines

- **Clean & Modular**: Keep component files focused and maintainable.
- **Performance First**: Avoid allocating large arrays or objects inside the per-frame `render()` loop.
- **Type Safety & Defaults**: Ensure all parameters provide sensible fallback values.
- **Commit Messages**: Use conventional commits format (e.g., `feat: add holographic chromatic aberration effect`, `fix: correct aspect ratio on webcam stream`).

---

## 📬 Submitting Changes

1. Create a feature branch:
   ```bash
   git checkout -b feat/my-new-effect
   ```
2. Commit your changes:
   ```bash
   git commit -m "feat: add my new effect"
   ```
3. Push to your branch:
   ```bash
   git push origin feat/my-new-effect
   ```
4. Open a **Pull Request** on GitHub with a description of the changes and before/after screenshots.
