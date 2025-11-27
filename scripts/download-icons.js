/**
 * Script para criar ícones simples do Doce Encanto
 * usando canvas do Node.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const assetsDir = path.join(__dirname, '..', 'assets');

// Função para baixar arquivo
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('🍫 Criando ícones do Doce Encanto...\n');

  // Usar placeholder.com para criar imagens simples
  // Cor de fundo: FFD6E0 (rosa pastel)
  
  try {
    // Icon 1024x1024
    console.log('📱 Baixando icon.png...');
    await downloadFile(
      'https://via.placeholder.com/1024x1024/FFD6E0/5D3A1A?text=%F0%9F%8D%AB',
      path.join(assetsDir, 'icon.png')
    );

    // Adaptive icon 1024x1024
    console.log('🤖 Baixando adaptive-icon.png...');
    await downloadFile(
      'https://via.placeholder.com/1024x1024/FFD6E0/5D3A1A?text=%F0%9F%8D%AB',
      path.join(assetsDir, 'adaptive-icon.png')
    );

    // Splash 1284x2778 (iPhone 14 Pro Max size)
    console.log('🖼️ Baixando splash-icon.png...');
    await downloadFile(
      'https://via.placeholder.com/512x512/FFF8E7/5D3A1A?text=%F0%9F%8D%AB',
      path.join(assetsDir, 'splash-icon.png')
    );

    // Favicon 48x48
    console.log('🌐 Baixando favicon.png...');
    await downloadFile(
      'https://via.placeholder.com/48x48/FFD6E0/5D3A1A?text=%F0%9F%8D%AB',
      path.join(assetsDir, 'favicon.png')
    );

    console.log('\n✅ Todos os ícones foram criados com sucesso!');
    console.log('🔄 Reinicie o Expo para ver as mudanças.');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

main();



