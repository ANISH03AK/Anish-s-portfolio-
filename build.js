const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
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
}).catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
