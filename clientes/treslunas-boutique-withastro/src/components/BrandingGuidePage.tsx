import React, { useState } from 'react';
import { TripleMoonLogo } from './TripleMoonLogo';
import { Copy, Download, Check, Sparkles, Code2, Layers, FileCode } from 'lucide-react';

interface BrandingGuideProps {
  isDarkMode: boolean;
}

export const BrandingGuidePage: React.FC<BrandingGuideProps> = ({ isDarkMode }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [exportFormat, setExportFormat] = useState<'svg' | 'png' | 'webp'>('svg');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const svgCodeSnippet = `<svg width="120" height="66" viewBox="0 0 120 66" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="3lunas-copper" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8C4A21"/>
      <stop offset="50%" stop-color="#F5D3B3"/>
      <stop offset="100%" stop-color="#5E2B0C"/>
    </linearGradient>
  </defs>
  <path d="M 38 4 C 15 16 15 50 38 62 C 24 50 24 16 38 4 Z" fill="url(#3lunas-copper)"/>
  <circle cx="60" cy="33" r="24" fill="url(#3lunas-copper)"/>
  <path d="M 82 4 C 105 16 105 50 82 62 C 96 50 96 16 82 4 Z" fill="url(#3lunas-copper)"/>
</svg>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(svgCodeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleDownloadAssets = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className={`min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0c0c0e] text-white' : 'bg-[#fcf9f8] text-[#1c1b1b]'
    }`}>
      {/* Page Title */}
      <div className="text-center mb-12 space-y-2">
        <span className="text-xs font-montserrat font-bold uppercase tracking-[0.3em] text-[#92003a] dark:text-pink-400">
          3 Lunas DESIGN.md
        </span>
        <h1 className="font-serif-chic font-bold text-3xl sm:text-5xl text-copper-gradient">
          Branding Guide V2 & Asset Canvases
        </h1>
        <p className="text-xs text-neutral-400 font-sans-body max-w-2xl mx-auto">
          Sistema de diseño, paleta de colores, tipografía y lienzos de exportación para desarrolladores de 3 Lunas Boutique Cambrils.
        </p>
      </div>

      <div className="space-y-12">
        {/* SECTION 1: Brand Pillars & Color Palette */}
        <section className={`p-6 sm:p-8 rounded-2xl border ${
          isDarkMode ? 'bg-[#141418] border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
        }`}>
          <h2 className="font-serif-chic font-bold text-2xl mb-6 border-b border-neutral-800 pb-3">
            Brand Pillars & Color Palette
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 text-center space-y-1">
              <span className="text-xs font-montserrat font-bold text-amber-300 uppercase">01. Minimalist</span>
              <p className="text-xs text-neutral-300">Líneas limpias, elegancia atemporal y espacio negativo balanceado.</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 text-center space-y-1">
              <span className="text-xs font-montserrat font-bold text-amber-300 uppercase">02. Local Cambrils</span>
              <p className="text-xs text-neutral-300">Carácter mediterráneo, boutiques físicas y proximidad.</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 text-center space-y-1">
              <span className="text-xs font-montserrat font-bold text-amber-300 uppercase">03. Curated</span>
              <p className="text-xs text-neutral-300">Selección personal de Erika para cada colección.</p>
            </div>
          </div>

          {/* Color Palette Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 font-sans-body">
            <div className="rounded-lg overflow-hidden border border-neutral-800 text-center">
              <div className="h-16 bg-[#92003A]" />
              <div className="p-2 bg-neutral-900 text-white text-[10px]">
                <p className="font-bold">Primary</p>
                <p className="opacity-70">#92003A</p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-neutral-800 text-center">
              <div className="h-16 bg-[#F62477]" />
              <div className="p-2 bg-neutral-900 text-white text-[10px]">
                <p className="font-bold">Secondary</p>
                <p className="opacity-70">#F62477</p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-neutral-800 text-center">
              <div className="h-16 bg-[#FFADEE]" />
              <div className="p-2 bg-neutral-900 text-white text-[10px]">
                <p className="font-bold text-black">Soft Pink</p>
                <p className="text-black opacity-70">#FFADEE</p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-neutral-800 text-center">
              <div className="h-16 bg-[#FFE185]" />
              <div className="p-2 bg-neutral-900 text-white text-[10px]">
                <p className="font-bold text-black">Yellow</p>
                <p className="text-black opacity-70">#FFE185</p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-neutral-800 text-center">
              <div className="h-16 bg-copper-gradient" />
              <div className="p-2 bg-neutral-900 text-white text-[10px]">
                <p className="font-bold">Copper</p>
                <p className="opacity-70">#B87333</p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-neutral-800 text-center">
              <div className="h-16 bg-[#0A0A0A]" />
              <div className="p-2 bg-neutral-900 text-white text-[10px]">
                <p className="font-bold">Black</p>
                <p className="opacity-70">#0A0A0A</p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-neutral-800 text-center">
              <div className="h-16 bg-[#F9F7F2]" />
              <div className="p-2 bg-neutral-900 text-white text-[10px]">
                <p className="font-bold text-black">Off-White</p>
                <p className="text-black opacity-70">#F9F7F2</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Logo Individual Asset Canvases (Matching Image 4) */}
        <section className={`p-6 sm:p-8 rounded-2xl border ${
          isDarkMode ? 'bg-[#141418] border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-6 border-b border-neutral-800 pb-3">
            <div>
              <h2 className="font-serif-chic font-bold text-2xl">
                3 Lunas Logo Individual Asset Canvases
              </h2>
              <p className="text-xs text-neutral-400">Lienzos con fondo de transparencia en cuadrícula</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Favicon Canvas 16x16 */}
            <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-900">
              <div className="p-2.5 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between text-xs font-montserrat">
                <span>Favicon Canvas (16x16)</span>
                <span className="text-[10px] text-neutral-500">ICO / PNG</span>
              </div>
              <div className="p-8 bg-checkerboard flex items-center justify-center min-h-[160px]">
                <div className="p-2 bg-black rounded shadow">
                  <TripleMoonLogo variant="metallic" size={24} />
                </div>
              </div>
            </div>

            {/* Mobile Icon Canvas 128x128 */}
            <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-900">
              <div className="p-2.5 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between text-xs font-montserrat">
                <span>Mobile Icon Canvas (128x128)</span>
                <span className="text-[10px] text-neutral-500">iOS / Android</span>
              </div>
              <div className="p-8 bg-checkerboard flex items-center justify-center min-h-[160px]">
                <div className="p-4 bg-black rounded-2xl shadow-xl border border-neutral-800">
                  <TripleMoonLogo variant="metallic" size={48} />
                </div>
              </div>
            </div>

            {/* Primary Logo Canvas 512x256 */}
            <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-900 md:col-span-2 lg:col-span-1">
              <div className="p-2.5 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between text-xs font-montserrat">
                <span>Primary Logo Canvas (512x256)</span>
                <span className="text-[10px] text-neutral-500">Web / Print</span>
              </div>
              <div className="p-8 bg-checkerboard flex items-center justify-center min-h-[160px]">
                <TripleMoonLogo variant="metallic" size={60} showText={true} textClassName="text-white" />
              </div>
            </div>
          </div>

          {/* Developer Export Bar */}
          <div className="mt-8 p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="font-montserrat font-bold text-xs uppercase text-amber-300">Export Format:</span>
              <div className="flex items-center gap-3 text-xs font-sans-body">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    checked={exportFormat === 'svg'}
                    onChange={() => setExportFormat('svg')}
                    className="accent-[#92003a]"
                  />
                  <span>SVG</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    checked={exportFormat === 'png'}
                    onChange={() => setExportFormat('png')}
                    className="accent-[#92003a]"
                  />
                  <span>PNG @2x</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    checked={exportFormat === 'webp'}
                    onChange={() => setExportFormat('webp')}
                    className="accent-[#92003a]"
                  />
                  <span>WebP</span>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleCopyCode}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-xs font-montserrat font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Code2 className="w-4 h-4" />}
                {copiedCode ? '¡Copiado!' : 'Copy SVG Code'}
              </button>

              <button
                onClick={handleDownloadAssets}
                className="flex-1 sm:flex-initial px-6 py-2.5 bg-copper-gradient hover:opacity-90 text-white rounded text-xs font-montserrat font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-copper-glow"
              >
                {downloadSuccess ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                {downloadSuccess ? 'Descargado' : 'Download All Assets'}
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 3: Logo Variations & Button Component Preview (Matching Image 3 & 5) */}
        <section className={`p-6 sm:p-8 rounded-2xl border ${
          isDarkMode ? 'bg-[#141418] border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
        }`}>
          <h2 className="font-serif-chic font-bold text-2xl mb-6 border-b border-neutral-800 pb-3">
            Logo Variations & UI Button Components
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Metallic Copper on Black */}
            <div className="p-6 rounded-xl bg-black border border-neutral-800 text-center space-y-3">
              <span className="text-[10px] font-montserrat font-bold text-neutral-400 uppercase">
                Metallic Copper on Black (Dark Mode)
              </span>
              <div className="py-4 flex justify-center">
                <TripleMoonLogo variant="metallic" size={50} />
              </div>
            </div>

            {/* Black on Off-White */}
            <div className="p-6 rounded-xl bg-[#F9F7F2] border border-neutral-300 text-center space-y-3">
              <span className="text-[10px] font-montserrat font-bold text-neutral-600 uppercase">
                Black on Off-White (Light Mode)
              </span>
              <div className="py-4 flex justify-center">
                <TripleMoonLogo variant="black" size={50} />
              </div>
            </div>

            {/* White Outline */}
            <div className="p-6 rounded-xl bg-[#262626] border border-neutral-700 text-center space-y-3">
              <span className="text-[10px] font-montserrat font-bold text-neutral-300 uppercase">
                White Outline
              </span>
              <div className="py-4 flex justify-center">
                <TripleMoonLogo variant="outline" size={50} />
              </div>
            </div>
          </div>

          {/* Button Components Guide */}
          <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800 space-y-6">
            <h3 className="font-montserrat font-bold text-xs uppercase tracking-wider text-amber-300">
              BUTTON COMPONENTS PREVIEW
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Primary Button */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-white">Primary Button</p>
                <button className="w-full py-3 bg-[#92003a] hover:bg-[#F62477] text-white font-montserrat font-bold text-xs uppercase tracking-widest rounded transition-colors">
                  SHOP NOW →
                </button>
                <code className="block p-2 bg-neutral-900 text-[10px] text-pink-300 rounded font-mono">
                  &lt;button class="btn-primary"&gt;SHOP NOW&lt;/button&gt;
                </code>
              </div>

              {/* Secondary Button */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-white">Secondary Button</p>
                <button className="w-full py-3 border-2 border-[#92003a] text-white hover:bg-[#92003a] font-montserrat font-bold text-xs uppercase tracking-widest rounded transition-colors">
                  LEARN MORE
                </button>
                <code className="block p-2 bg-neutral-900 text-[10px] text-pink-300 rounded font-mono">
                  &lt;button class="btn-secondary"&gt;LEARN MORE&lt;/button&gt;
                </code>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
