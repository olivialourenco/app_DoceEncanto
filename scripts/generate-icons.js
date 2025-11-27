/**
 * Script para gerar ícones do app Doce Encanto
 * Execute com: node scripts/generate-icons.js
 */

const fs = require('fs');
const path = require('path');

// SVG do ícone com emoji de chocolate e fundo rosa
const iconSvg = `
<svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FFD6E0"/>
      <stop offset="100%" style="stop-color:#F8B4C4"/>
    </linearGradient>
  </defs>
  <rect width="1024" height="1024" fill="url(#bg)"/>
  <circle cx="512" cy="400" r="280" fill="#FFF8E7" stroke="#5D3A1A" stroke-width="8"/>
  <text x="512" y="480" font-size="300" text-anchor="middle" dominant-baseline="middle">🍫</text>
  <text x="512" y="750" font-family="Arial, sans-serif" font-size="100" font-weight="bold" fill="#5D3A1A" text-anchor="middle">Doce Encanto</text>
  <text x="512" y="850" font-family="Arial, sans-serif" font-size="50" fill="#8B5A2B" text-anchor="middle">Brigaderia</text>
</svg>
`;

// SVG da splash screen
const splashSvg = `
<svg width="1284" height="2778" xmlns="http://www.w3.org/2000/svg">
  <rect width="1284" height="2778" fill="#FFF8E7"/>
  <circle cx="642" cy="1100" r="200" fill="#FFD6E0" stroke="#F8B4C4" stroke-width="10"/>
  <text x="642" y="1150" font-size="200" text-anchor="middle" dominant-baseline="middle">🍫</text>
  <text x="642" y="1450" font-family="Arial, sans-serif" font-size="80" font-weight="bold" fill="#5D3A1A" text-anchor="middle">Doce Encanto</text>
  <text x="642" y="1550" font-family="Arial, sans-serif" font-size="40" fill="#E8A4B4" text-anchor="middle">Brigaderia Artesanal</text>
</svg>
`;

// Adaptive icon (apenas o foreground)
const adaptiveIconSvg = `
<svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="#FFD6E0"/>
  <circle cx="512" cy="450" r="250" fill="#FFF8E7" stroke="#5D3A1A" stroke-width="6"/>
  <text x="512" y="520" font-size="280" text-anchor="middle" dominant-baseline="middle">🍫</text>
  <text x="512" y="800" font-family="Arial, sans-serif" font-size="80" font-weight="bold" fill="#5D3A1A" text-anchor="middle">Doce Encanto</text>
</svg>
`;

const assetsDir = path.join(__dirname, '..', 'assets');

// Salvar SVGs
fs.writeFileSync(path.join(assetsDir, 'icon.svg'), iconSvg.trim());
fs.writeFileSync(path.join(assetsDir, 'splash-icon.svg'), splashSvg.trim());
fs.writeFileSync(path.join(assetsDir, 'adaptive-icon.svg'), adaptiveIconSvg.trim());

console.log('✅ SVG files created in assets folder!');
console.log('');
console.log('To convert to PNG, you can use online tools like:');
console.log('- https://svgtopng.com/');
console.log('- https://cloudconvert.com/svg-to-png');
console.log('');
console.log('Or install sharp: npm install sharp');



