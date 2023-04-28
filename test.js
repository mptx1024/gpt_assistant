// import { colors, shades } from './features/AiRole/utils/colors';
// import fs from 'fs';

// const fullColors = [];

// for (let i = 0; i < colors.length; i++) {
//     for (let j = 0; j < shades.length; j++) {
//         fullColors.push(`bg-${colors[i]}-${shades[j]}`);
//     }
// }

// fs.writeFile('colors.ts', fullColors, (err) => {
//     if (err) throw err;
// })
const fs = require('fs');
 const colors = [
    'red',
    'pink',
    'purple',
    'indigo',
    'blue',
    'cyan',
    'teal',
    'green',
    'yellow',
    'amber',
    'orange',
    'gray',
];

const shades = ['400', '500', '600', '700', '800', '900'];

const fullColors = [];

for (let i = 0; i < colors.length; i++) {
    for (let j = 0; j < shades.length; j++) {
        fullColors.push(`bg-${colors[i]}-${shades[j]}`);
    }
}

const fullColorsAsTSCode = `export const fullColors: string[] = ['${fullColors.join("', '")}'];\n`;

fs.writeFile('colors.ts', fullColorsAsTSCode, (err) => {
    if (err) throw err;
    console.log('Full colors array successfully written to colors.ts');
});

