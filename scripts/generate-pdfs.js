const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const CONTENT_DIR = path.join(__dirname, "..", "content");
const OUTPUT_DIR = path.join(__dirname, "..", "pdfs");
const BASE_URL = "http://127.0.0.1:8080";

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

function mdToUrl(mdFile) {
    let relative = path.relative(CONTENT_DIR, mdFile);

    relative = relative.replace(/\\/g, "/");

    if (relative.endsWith("/_index.md")) {
        return "/" + relative.replace("/_index.md", "/");
    }

    return "/" + relative.replace(".md", "/");
}

function mdToPdf(mdFile) {
    const relative = path.relative(CONTENT_DIR, mdFile);

    return path.join(
        OUTPUT_DIR,
        relative.replace(/\.md$/, ".pdf")
    );
}

(async () => {

    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox"
        ]
    });

    const page = await browser.newPage();

    const files = walk(CONTENT_DIR);

    for (const mdFile of files) {

        const url = BASE_URL + mdToUrl(mdFile);
        const pdf = mdToPdf(mdFile);

        fs.mkdirSync(path.dirname(pdf), { recursive: true });

        console.log(`Generating ${url}`);

        await page.goto(url, {
            waitUntil: "networkidle0"
        });

        // Allow Hextra JS, Mermaid, KaTeX, etc. to finish rendering
        await new Promise(resolve => setTimeout(resolve, 2000));

        await page.pdf({
            path: pdf,
            format: "A4",
            printBackground: true,
            margin: {
                top: "0.5in",
                bottom: "0.5in",
                left: "0.5in",
                right: "0.5in"
            }
        });
    }

    await browser.close();

    console.log("Finished generating PDFs.");
})();