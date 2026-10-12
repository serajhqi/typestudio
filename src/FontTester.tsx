import React, { useState, useEffect, useRef } from 'react';
import './FontTester.css';

// Dynamically import all font files from the fonts directory
const fontModules = import.meta.glob('./fonts/*.{ttf,otf,woff,woff2}', { eager: true, as: 'url' });

interface FontInfo {
  name: string;
  url: string;
  format?: string;
}

const PRESET_TEXTS = [
  'The quick brown fox jumps over the lazy dog',
  '۱۲۳۴۵۶۷۸۹۰ این یک متن تستی برای پیش‌نمایش فونت است',
  'Pack my box with five dozen liquor jugs. 0123456789',
  'Typography is the craft of endowing human language with a durable visual form',
];

const FontTester: React.FC = () => {
  const [sampleText, setSampleText] = useState('The quick brown fox jumps over the lazy dog');
  const [fontSize, setFontSize] = useState<number>(32);
  const [fonts, setFonts] = useState<FontInfo[]>([]);
  const [isCopied, setIsCopied] = useState<string | null>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    // Create or locate style tag for fonts
    let styleEl = document.getElementById('custom-font-faces') as HTMLStyleElement;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'custom-font-faces';
      document.head.appendChild(styleEl);
    }
    styleRef.current = styleEl;

    const loadedFonts: FontInfo[] = [];

    for (const path in fontModules) {
      const url = fontModules[path] as string;
      const nameMatch = path.match(/\/([^\/]+)\.(ttf|otf|woff2?|svg)$/i);
      const ext = nameMatch ? nameMatch[2].toLowerCase() : 'truetype';
      const format = ext === 'ttf' ? 'truetype' : ext === 'otf' ? 'opentype' : ext;
      const cleanName = nameMatch
        ? nameMatch[1].replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
        : path;

      loadedFonts.push({ name: cleanName, url, format });
    }

    // Default fallback font preview if none uploaded yet
    if (loadedFonts.length === 0) {
      loadedFonts.push({
        name: 'Inter (Default Preview)',
        url: '',
      });
    }

    const cssRules = loadedFonts
      .filter((f) => f.url)
      .map(
        (f) =>
          `@font-face {
            font-family: '${f.name}';
            src: url('${f.url}') format('${f.format || 'truetype'}');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }`
      )
      .join('\n');

    styleEl.textContent = cssRules;
    setFonts(loadedFonts);
  }, []);

  const handleCopyName = (fontName: string) => {
    navigator.clipboard.writeText(fontName);
    setIsCopied(fontName);
    setTimeout(() => setIsCopied(null), 1800);
  };

  return (
    <div className="font-tester-wrapper">
      {/* Header bar */}
      <header className="hero-header">
        <div className="badge">
          <span className="badge-dot"></span>
          Live Font Playground
        </div>
        <h1 className="hero-title">
          Experience your <span className="text-gradient">Typography</span>
        </h1>
        <p className="hero-subtitle">
          Place your font files (<code>.ttf</code>, <code>.otf</code>, <code>.woff</code>, <code>.woff2</code>) inside <code>src/fonts</code> to compare them instantly in rows.
        </p>
      </header>

      {/* Control Studio Sticky Bar */}
      <section className="studio-controls-panel">
        <div className="input-group">
          <div className="input-icon-wrapper">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>
          <input
            type="text"
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            placeholder="Type sample text to preview fonts..."
            className="font-main-input"
          />
          {sampleText && (
            <button className="clear-btn" onClick={() => setSampleText('')} title="Clear text">
              ✕
            </button>
          )}
        </div>

        <div className="settings-row">
          <div className="presets-group">
            <span className="presets-label">Presets:</span>
            <div className="preset-chips">
              {PRESET_TEXTS.map((preset, idx) => (
                <button
                  key={idx}
                  className={`preset-chip ${sampleText === preset ? 'active' : ''}`}
                  onClick={() => setSampleText(preset)}
                >
                  {preset.slice(0, 16)}…
                </button>
              ))}
            </div>
          </div>

          <div className="slider-control">
            <span className="slider-label">Size</span>
            <input
              type="range"
              min="16"
              max="72"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="size-slider"
            />
            <span className="slider-value">{fontSize}px</span>
          </div>
        </div>
      </section>

      {/* Font Samples Section - Horizontal Row Cards */}
      <section className="samples-container">
        <div className="samples-header">
          <span className="font-count-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <line x1="9" y1="9" x2="15" y2="9"/>
              <line x1="12" y1="9" x2="12" y2="15"/>
            </svg>
            {fonts.length} {fonts.length === 1 ? 'Font' : 'Fonts'} Loaded
          </span>
          <span className="hint-text">Each font listed in its own full-width row</span>
        </div>

        <div className="font-rows-list">
          {fonts.map((font) => (
            <div key={font.name} className="font-row-card">
              <div className="font-card-header">
                <div className="font-meta">
                  <h3 className="font-title">{font.name}</h3>
                  <span className="font-pill">{font.format || 'System'}</span>
                </div>
                <button
                  className="copy-font-btn"
                  onClick={() => handleCopyName(font.name)}
                  title="Copy font family name"
                >
                  {isCopied === font.name ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                      </svg>
                      Copy Name
                    </>
                  )}
                </button>
              </div>

              <div
                className="font-preview-viewport"
                style={{
                  fontFamily: `'${font.name}', sans-serif`,
                  fontSize: `${fontSize}px`,
                }}
              >
                {sampleText.trim() ? (
                  sampleText
                ) : (
                  <span className="empty-placeholder">Type something above to see this font in action</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modern footer */}
      <footer className="footer-bar">
        <span>TypeStudio • Drop font files in <code>src/fonts/</code> anytime for automatic HMR detection</span>
      </footer>
    </div>
  );
};

export default FontTester;
