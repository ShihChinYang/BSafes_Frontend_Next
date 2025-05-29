const fs = require("fs");
const css = require("css");
const path = require("path");

const { execSync } = require("child_process");

const config = require("./font-config.json");
const rootDir = path.resolve(__dirname, "..");
const publicFontsDir = path.resolve(
  rootDir,
  "public/js/excalidraw/custom-fonts"
);
const outputJsonDir = path.resolve(rootDir);

// if (!fs.existsSync(publicFontsDir)) fs.mkdirSync(publicFontsDir, { recursive: true });
// if (!fs.existsSync(outputJsonDir)) fs.mkdirSync(outputJsonDir, { recursive: true });

function cleanUp(paths) {
  for (const p of paths) {
    if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
  }
}

function extractFontFaces(cssText) {
  const ast = css.parse(cssText);
  const fonts = [];

  for (const rule of ast.stylesheet.rules) {
    if (rule.type === "font-face") {
      const font = {};
      for (const decl of rule.declarations) {
        switch (decl.property) {
          case "font-family":
          case "font-weight":
          case "font-style":
          case "font-display":
          case "unicode-range":
            font[decl.property] = decl.value;
            break;
          case "src":
            // Find the first WOFF2 URL
            const matches = decl.value.match(/url\(([^)]+\.woff2)\)/);
            if (matches) {
              font["woff2-url"] = matches[1].replace(/^['"]|['"]$/g, ""); // strip quotes if present
            }
            break;
        }
      }
      fonts.push(font);
    }
  }

  return fonts;
}
const resolvedFonts = [];
for (const font of config) {
  const fontPackage = font.source;
  const safeFontName = font.name.toLowerCase().replace(/\s+/g, "-");

  console.log(`📦 Packing ${fontPackage}`);
  const tarballName = execSync(`npm pack ${fontPackage}`).toString().trim();
  const tarballPath = path.resolve(rootDir, tarballName);

  execSync(`tar -xzf ${tarballName}`, { stdio: "inherit" });
  const extractedDir = path.resolve(rootDir, "package");

  // Read index.css
  const indexCssPath = path.join(extractedDir, "index.css");
  if (!fs.existsSync(indexCssPath)) {
    console.warn(`⚠️  No index.css found in ${fontPackage}`);
    cleanUp([tarballPath, extractedDir]);
    continue;
  }

  const cssContent = fs.readFileSync(indexCssPath, "utf-8");
  const fontsFaces = extractFontFaces(cssContent);


  const outputEntries = [];

  for (const fontFace of fontsFaces) {
    const destDir = path.join(publicFontsDir, safeFontName);
    fs.mkdirSync(destDir, { recursive: true });

    const fontFileName = path.basename(fontFace["woff2-url"]);
    const src = path.join(extractedDir, fontFace["woff2-url"]);
    const dest = path.join(destDir, fontFileName);
    fs.copyFileSync(src, dest);

    outputEntries.push({
      uri: `/custom-fonts/${safeFontName}/${fontFileName}`,
      descriptors: {
        unicodeRange: fontFace["unicode-range"],
        display: fontFace["font-display"],
        weight: fontFace["font-weight"],
        style: fontFace["font-style"],
      },
    });

    console.log(`✓ Copied ${safeFontName}`);
  }
  resolvedFonts.push({
    name: font.name,
    descripters: outputEntries,
  });

  
  cleanUp([tarballPath, extractedDir]);
}
// Write JSON metadata
const jsonOutputPath = path.join(outputJsonDir, `resolved_fonts.json`);
fs.writeFileSync(jsonOutputPath, JSON.stringify(resolvedFonts, null, 2));
console.log(`✅ JSON metadata saved to ${jsonOutputPath}`);
