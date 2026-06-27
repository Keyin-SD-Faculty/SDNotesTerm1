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

        console.log(`📄 Printing: ${url}`);

        // -----------------------------
        // stable desktop viewport
        // -----------------------------
        await page.setViewport({
            width: 1366,
            height: 900,
            deviceScaleFactor: 1
        });

        // -----------------------------
        // load full page
        // -----------------------------
        await page.goto(url, {
            waitUntil: "networkidle2"
        });

        // wait for fonts + JS hydration (VERY important for Hextra)
        await page.waitForFunction(() => document.fonts && document.fonts.ready);
        await new Promise(r => setTimeout(r, 2000));

        // -----------------------------
        // THIS IS THE KEY: emulate PRINT MODE
        // (this is what Chrome "Print to PDF" uses internally)
        // -----------------------------
        await page.emulateMediaType("print");

        // -----------------------------
        // generate PDF like browser print
        // -----------------------------
        await page.pdf({
            path: pdfPath,
            format: "A4",
            printBackground: true,
            preferCSSPageSize: true
        });
    }

    await browser.close();

    console.log("✅ All PDFs generated using PRINT mode.");
})();