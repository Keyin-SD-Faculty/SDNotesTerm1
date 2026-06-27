const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const contentDir = path.join(__dirname, "..", "content");
const outputDir = path.join(__dirname, "..", "pdfs");

// ensure output exists
fs.mkdirSync(outputDir, { recursive: true });

function getMarkdownFiles(dir) {
    let results = [];

    for (const file of fs.readdirSync(dir)) {
        const full = path.join(dir, file);

        if (fs.statSync(full).isDirectory()) {
            results = results.concat(getMarkdownFiles(full));
        } else if (file.endsWith(".md")) {
            results.push(full);
        }
    }

    return results;
}

function toHugoUrl(mdPath) {
    const relative = path.relative(contentDir, mdPath);
    const noExt = relative.replace(/\.md$/, "");
    const url = noExt.replace(/\\/g, "/"); // Windows fix
    return "/" + url + "/";
}

function toPdfPath(mdPath) {
    const relative = path.relative(contentDir, mdPath);
    const pdfName = relative.replace(/\.md$/, ".pdf");
    return path.join(outputDir, pdfName);
}

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"]
    });

    const page = await browser.newPage();

    const files = getMarkdownFiles(contentDir);

    for (const mdFile of files) {

        const url = "http://localhost:1313" + toHugoUrl(mdFile);
        const pdfPath = toPdfPath(mdFile);

        fs.mkdirSync(path.dirname(pdfPath), { recursive: true });

        console.log(`📄 ${mdFile}`);
        console.log(`➡️  ${url}`);
        console.log(`💾 ${pdfPath}`);

        await page.goto(url, {
            waitUntil: "networkidle0"
        });

        // important for Hextra (renders tabs, math, etc)
        await new Promise(r => setTimeout(r, 2000));

        await page.pdf({
            path: pdfPath,
            format: "A4",
            printBackground: true
        });
    }

    await browser.close();
})();