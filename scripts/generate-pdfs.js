const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const CONTENT_DIR = path.join(__dirname, "..", "content");
const OUTPUT_DIR = path.join(__dirname, "..", "pdfs");
const BASE_URL = "http://127.0.0.1:8080";

// -----------------------------
function walk(dir) {
    let results = [];

    for (const file of fs.readdirSync(dir)) {
        const full = path.join(dir, file);

        if (fs.statSync(full).isDirectory()) {
            results = results.concat(walk(full));
        } else if (file.endsWith(".md")) {
            results.push(full);
        }
    }

    return results;
}

// -----------------------------
function mdToUrl(mdFile) {
    let relative = path.relative(CONTENT_DIR, mdFile).replace(/\\/g, "/");

    if (relative.endsWith("/_index.md")) {
        return "/" + relative.replace("/_index.md", "/");
    }

    return "/" + relative.replace(".md", "/");
}

// -----------------------------
function mdToPdf(mdFile) {
    const relative = path.relative(CONTENT_DIR, mdFile);
    return path.join(OUTPUT_DIR, relative.replace(/\.md$/, ".pdf"));
}

// -----------------------------
(async () => {

    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

    const files = walk(CONTENT_DIR);

    for (const file of files) {

        const url = BASE_URL + mdToUrl(file);
        const pdfPath = mdToPdf(file);

        fs.mkdirSync(path.dirname(pdfPath), { recursive: true });

        console.log(`📄 ${url}`);

        // -----------------------------
        // Stable desktop viewport
        // -----------------------------
        await page.setViewport({
            width: 1366,
            height: 900,
            deviceScaleFactor: 1
        });

        await page.goto(url, {
            waitUntil: "networkidle2"
        });

        // Let Hextra fully hydrate (VERY important)
        await page.waitForFunction(() => document.fonts && document.fonts.ready);

        await new Promise(r => setTimeout(r, 2000));

        // -----------------------------
        // DO NOT force print mode
        // -----------------------------
        // This is what was breaking styling before

        await page.pdf({
            path: pdfPath,
            format: "A4",
            printBackground: true,
            preferCSSPageSize: true,
            margin: {
                top: "12mm",
                bottom: "12mm",
                left: "12mm",
                right: "12mm"
            }
        });
    }

    await browser.close();

    console.log("✅ Per-page PDFs generated successfully.");
})();