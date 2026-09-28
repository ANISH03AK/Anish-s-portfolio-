const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

esbuild.build({
  entryPoints: ['src/main.tsx'],
  bundle: true,
  outfile: 'dist/app.js',
  minify: false,
  sourcemap: true,
  target: ['es2020'],
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  loader: {
    '.svg': 'file',
    '.jpg': 'file',
    '.png': 'file'
  }
}).then(() => {
  console.log('Build succeeded: dist/app.js generated.');

  // Create dist/dist directory and copy app.js & map for backwards compatibility
  const distSubDir = path.join(distDir, 'dist');
  if (!fs.existsSync(distSubDir)) {
    fs.mkdirSync(distSubDir, { recursive: true });
  }

  if (fs.existsSync(path.join(distDir, 'app.js'))) {
    fs.copyFileSync(path.join(distDir, 'app.js'), path.join(distSubDir, 'app.js'));
  }
  if (fs.existsSync(path.join(distDir, 'app.js.map'))) {
    fs.copyFileSync(path.join(distDir, 'app.js.map'), path.join(distSubDir, 'app.js.map'));
  }

  // Copy static public assets to dist publish directory
  const staticFiles = [
    'Anish_Kumar_Resume.pdf',
    'index.html',
    'd3.min.js',
    'profile.jpg',
    'profile.png',
    'profile.svg',
    'network-mesh-bg.svg',
    'IMG_20260904_140606_442.jpg',
    'standalone.html'
  ];

  for (const file of staticFiles) {
    const srcPath = path.join(__dirname, file);
    const destPath = path.join(distDir, file);
    if (fs.existsSync(srcPath)) {
      if (file === 'index.html') {
        let content = fs.readFileSync(srcPath, 'utf8');
        // Ensure /dist/app.js reference is replaced with /app.js
        content = content.replace('/dist/app.js', '/app.js');
        fs.writeFileSync(destPath, content, 'utf8');
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
      console.log(`Copied ${file} to dist/${file}`);
    }
  }

  // Create _redirects file for Netlify SPA routing and /dist/* alias
  const redirects = `/dist/*  /:splat  200\n/*       /index.html  200\n`;
  fs.writeFileSync(path.join(distDir, '_redirects'), redirects, 'utf8');
  console.log('Created dist/_redirects for Netlify SPA routing.');
}).catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
