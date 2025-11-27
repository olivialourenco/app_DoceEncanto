/**
 * Script para criar ícones do Doce Encanto
 * Execute: node scripts/create-icons.js
 */

const sharp = require('sharp');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'assets');

// Cores do tema
const CREAM = '#FFF8E7';
const PINK_LIGHT = '#FFD6E0';
const PINK = '#F8B4C4';
const BROWN = '#5D3A1A';

// SVG do ícone principal (com emoji de chocolate)
function createIconSvg(size) {
  const fontSize = Math.floor(size * 0.5);
  const textY = Math.floor(size * 0.58);
  
  return Buffer.from(`
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${PINK_LIGHT}"/>
      <circle cx="${size/2}" cy="${size/2}" r="${size*0.35}" fill="${CREAM}" stroke="${PINK}" stroke-width="${size*0.02}"/>
      <text x="${size/2}" y="${textY}" font-size="${fontSize}" text-anchor="middle" dominant-baseline="middle">🍫</text>
    </svg>
  `);
}

// SVG da splash (fundo creme com círculo rosa e emoji)
function createSplashSvg(width, height) {
  const circleR = Math.min(width, height) * 0.15;
  const fontSize = circleR * 1.2;
  
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${CREAM}"/>
      <circle cx="${width/2}" cy="${height*0.4}" r="${circleR}" fill="${PINK_LIGHT}" stroke="${PINK}" stroke-width="8"/>
      <text x="${width/2}" y="${height*0.42}" font-size="${fontSize}" text-anchor="middle" dominant-baseline="middle">🍫</text>
      <text x="${width/2}" y="${height*0.55}" font-family="Arial, sans-serif" font-size="${fontSize*0.4}" font-weight="bold" fill="${BROWN}" text-anchor="middle">Doce Encanto</text>
      <text x="${width/2}" y="${height*0.60}" font-family="Arial, sans-serif" font-size="${fontSize*0.2}" fill="${PINK}" text-anchor="middle">Brigaderia Artesanal</text>
    </svg>
  `);
}

async function main() {
  console.log('🍫 Criando ícones do Doce Encanto...\n');

  try {
    // Icon principal (1024x1024)
    console.log('📱 Criando icon.png (1024x1024)...');
    await sharp(createIconSvg(1024))
      .png()
      .toFile(path.join(assetsDir, 'icon.png'));

    // Adaptive icon (1024x1024)
    console.log('🤖 Criando adaptive-icon.png (1024x1024)...');
    await sharp(createIconSvg(1024))
      .png()
      .toFile(path.join(assetsDir, 'adaptive-icon.png'));

    // Splash icon (512x512 - será redimensionado pelo Expo)
    console.log('🖼️ Criando splash-icon.png (512x512)...');
    await sharp(createSplashSvg(512, 512))
      .png()
      .toFile(path.join(assetsDir, 'splash-icon.png'));

    // Favicon (48x48)
    console.log('🌐 Criando favicon.png (48x48)...');
    await sharp(createIconSvg(48))
      .png()
      .toFile(path.join(assetsDir, 'favicon.png'));

    // Logo (256x256)
    console.log('✨ Criando logo.png (256x256)...');
    await sharp(createIconSvg(256))
      .png()
      .toFile(path.join(assetsDir, 'logo.png'));

    console.log('\n✅ Todos os ícones foram criados com sucesso!');
    console.log('\n🔄 Reinicie o Expo com: npx expo start --clear');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    console.error(error);
  }
}

main();



