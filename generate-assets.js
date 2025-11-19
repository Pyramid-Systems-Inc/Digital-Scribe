const fs = require('fs');
const path = require('path');

const glyphs = [
  "G1", "D58", "D46", "I9", "W11", "V28", "M17", "I10", "V31", 
  "E23", "G17", "N35", "Q3", "N29", "R8", "S29", "X1", "V4", 
  "K1", "O34", "M8", "V13", "F32"
];

const targetDir = path.join(__dirname, 'client', 'public', 'glyphs');

// Ensure directory exists
if (!fs.existsSync(targetDir)){
    fs.mkdirSync(targetDir, { recursive: true });
}

glyphs.forEach(id => {
    const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" fill="#f4e4bc" stroke="#8b4513" stroke-width="4"/>
  <text x="50" y="60" font-family="serif" font-size="40" text-anchor="middle" fill="#8b4513">${id}</text>
</svg>`;
    
    fs.writeFileSync(path.join(targetDir, `${id}.svg`), svgContent.trim());
    console.log(`Generated ${id}.svg`);
});

console.log("✅ Assets generated successfully in client/public/glyphs");