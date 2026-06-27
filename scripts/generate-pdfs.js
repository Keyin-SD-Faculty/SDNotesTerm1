const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const CONTENT_DIR = path.join(__dirname, "..", "content");
const OUTPUT_DIR = path.join(__dirname, "..", "pdfs");
const BASE_URL = "http://127.0.0.1:8080";

// -----------------------------
// Walk markdown files
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
// Convert MD → Hugo URL
// -----------------------------
function mdToUrl(mdFile) {
    let relative = path.relative(CONTENT_DIR, mdFile).replace(/\\/g, "/");

    // _index.md maps to section root
    if (relative.endsWith("/_index.md")) {
        return "/" + relative.replace("/_index.md", "/");
    }

    return "/" + relative.replace(".md", "/");
}

// -----------------------------
// Convert MD → PDF output path
// -----------------------------
function mdToPdf(mdFile) {
    const relative = path.relative(CONTENT_DIR, mdFile);
    return path.join(OUTPUT_DIR, relative.replace(/\.md$/, ".pdf"));
}

// -----------------------------
// MAIN
// -----------------------------
(async () => {

    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    const browser = await puppeteer.launch({
        headless: "new",
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox"
        ]
    });

    const page = await browser.newPage();

    const files = walk(CONTENT_DIR);

    for (const file of files) {

        const url = BASE_URL + mdToUrl(file);
        const pdfPath = mdToPdf(file);

        fs.mkdirSync(path.dirname(pdfPath), { recursive: true });

        console.log(`📄 Generating: ${url}`);

        // -----------------------------
        // Load page fully (important for Hextra)
        // -----------------------------
        await page.setViewport({
            width: 1400,
            height: 900,
            deviceScaleFactor: 1
        });

        await page.goto(url, {
            waitUntil: "networkidle2"
        });

        // Wait for fonts + JS hydration
        await page.evaluate(() => document.fonts.ready);
        await new Promise(r => setTimeout(r, 2500));

        // -----------------------------
        // Force clean print mode
        // -----------------------------
        await page.emulateMediaType("print");

        // Inject print-friendly CSS overrides
        await page.addStyleTag({
            content: `
                /* =========================
                   CLEAN STUDENT PDF MODE
                   ========================= */

                /* Remove UI clutter */
                nav, aside, header, footer {
                    display: none !important;
                }

                /* Ensure full width content */
                main, article, .content {
                    max-width: 100% !important;
                    width: 100% !important;
                    padding: 0 !important;
                    margin: 0 auto !important;
                }

                /* Improve readability */
                body {
                    font-size: 12pt !important;
                    line-height: 1.6 !important;
                    color: #111 !important;
                    background: white !important;
                }

                /* Headings spacing */
                h1, h2, h3, h4 {
                    margin-top: 16px !important;
                    margin-bottom: 8px !important;
                }

                /* Code blocks */
                pre, code {
                    font-size: 10pt !important;
                    white-space: pre-wrap !important;
                    word-break: break-word !important;
                }

                pre {
                    padding: 10px !important;
                }

                /* Prevent card / grid compression (Hextra fix) */
                .hx-mt-6, .hx-mb-6, .hx-p-6 {
                    margin: 10px 0 !important;
                    padding: 0 !important;
                }

                /* Remove shadows/background noise */
                * {
                    box-shadow: none !important;
                }
            `
        });

        // -----------------------------
        // Generate PDF
        // -----------------------------
        await page.pdf({
            path: pdfPath,
            format: "A4",
            printBackground: true,
            preferCSSPageSize: true,
            margin: {
                top: "15mm",
                bottom: "15mm",
                left: "15mm",
                right: "15mm"
            }
        });
    }

    await browser.close();

    console.log("✅ All student PDFs generated successfully.");
})();