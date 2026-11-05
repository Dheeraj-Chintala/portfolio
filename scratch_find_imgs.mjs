import fs from 'fs';
import path from 'path';

function findImgRefs(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) {
            if (e.name !== 'node_modules' && e.name !== '.git' && e.name !== 'dist' && e.name !== '.trash') {
                findImgRefs(full);
            }
        } else if (/\.(jsx?|tsx?)$/.test(e.name)) {
            const content = fs.readFileSync(full, 'utf8');
            const regex = /["']([^"']+\.(png|jpe?g|svg|gif|webp))["']/gi;
            const matches = [];
            let match;
            while ((match = regex.exec(content)) !== null) {
                matches.push(match[1]);
            }
            if (matches.length) {
                console.log(full.replace(/\\/g, '/'), [...new Set(matches)]);
            }
        }
    }
}
findImgRefs('src');
