#!/usr/bin/env node
/**
 * Fluxline document PDF builder.
 *
 * Renders Markdown documents (legal pages, policies, one-pagers) into
 * Letter-size PDFs in the Fluxline print design: navy top bar, gold
 * letter-spaced kicker, navy headings, bordered tables, gold and navy
 * footer band, and the Fluxline lockup. See README.md in this folder.
 *
 * Usage:
 *   yarn legal:pdf <file.md | folder> [more files...] [--out <dir>]
 *                  [--kicker "Fluxline Legal · Agreement"] [--status "Review copy, not yet published"]
 */
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const { chromium } = require('playwright');

marked.setOptions({ breaks: true });

// Kicker labels for known documents, matched against the file name.
const KICKERS = [
  [/terms[-_]of[-_]use/i, 'Fluxline Legal · Agreement'],
  [/preorder/i, 'Fluxline Legal · Preorder'],
  [/privacy/i, 'Fluxline Legal · Privacy'],
  [/responsible[-_]ai/i, 'Fluxline Legal · Responsible AI'],
  [/stewardship/i, 'Fluxline Legal · Stewardship'],
  [/legal[-_]index/i, 'Fluxline Legal · Legal Index'],
  [/waiver/i, 'Fluxline Legal · Personal Training and Wellness'],
];

function parseArgs(argv) {
  const opts = { inputs: [], out: 'legal-pdf-out', kicker: null, status: '' };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--out') opts.out = argv[++i];
    else if (a === '--kicker') opts.kicker = argv[++i];
    else if (a === '--status') opts.status = argv[++i];
    else opts.inputs.push(a);
  }
  return opts;
}

function collect(inputs) {
  return inputs.flatMap((p) =>
    fs.statSync(p).isDirectory()
      ? fs.readdirSync(p).filter((f) => f.endsWith('.md')).sort().map((f) => path.join(p, f))
      : [p]
  );
}

/**
 * Splits a document into its title (first `# ` line), its header fields
 * (the run of `**Field:** value` or `**Bold line**` lines right after the
 * title), and the body. A `---` right after the header is dropped.
 */
function split(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const titleIdx = lines.findIndex((l) => /^#\s+/.test(l));
  const title = titleIdx >= 0 ? lines[titleIdx].replace(/^#\s+/, '') : 'Untitled';
  const meta = [];
  let i = titleIdx + 1;
  for (; i < lines.length; i++) {
    const l = lines[i].trim();
    if (!l) continue;
    if (/^\*\*[^*]+\*\*/.test(l) && l.length < 220) meta.push(l.replace(/\s+$/, ''));
    else break;
  }
  if (lines[i] && lines[i].trim() === '---') i++;
  return { title, meta, body: lines.slice(i).join('\n') };
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const plain = (s) => s.replace(/\*/g, '').trim();

function html({ title, meta, body }, kicker, logo) {
  const css = fs.readFileSync(path.join(__dirname, 'template.css'), 'utf8');
  const metaHtml = meta.map((m) => `<div class="meta">${marked.parseInline(m)}</div>`).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(title)}</title><style>${css}</style></head><body>
  <div class="hero"><img src="data:image/png;base64,${logo}" alt="Fluxline"><div class="kicker">${esc(kicker)}</div>
  <h1 class="title">${esc(title)}</h1>${metaHtml}</div>
  ${marked.parse(body)}
  </body></html>`;
}

(async () => {
  const opts = parseArgs(process.argv.slice(2));
  const files = collect(opts.inputs);
  if (!files.length) {
    console.error('Usage: yarn legal:pdf <file.md | folder> [--out dir] [--kicker text] [--status text]');
    process.exit(1);
  }
  fs.mkdirSync(opts.out, { recursive: true });
  const logo = fs.readFileSync(path.join(__dirname, 'fluxline-logo-lockup.png')).toString('base64');
  // CHROMIUM_PATH points at a Chrome or Chromium binary when Playwright's own browser is not installed.
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  try {
    for (const file of files) {
      const doc = split(fs.readFileSync(file, 'utf8'));
      const kicker = opts.kicker || (KICKERS.find(([re]) => re.test(path.basename(file))) || [null, 'Fluxline'])[1];
      const version = plain(doc.meta.find((m) => /version/i.test(m)) || '');
      const effective = plain(doc.meta.find((m) => /effective/i.test(m)) || '');
      const footerText = [doc.title, version, effective, opts.status].filter(Boolean).map(esc).join(' &middot; ');
      const page = await browser.newPage();
      await page.setContent(html(doc, kicker, logo), { waitUntil: 'load' });
      const out = path.join(opts.out, path.basename(file).replace(/\.md$/, '.pdf'));
      await page.pdf({
        path: out,
        format: 'Letter',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: `<div style="width:100%;-webkit-print-color-adjust:exact;">
          <div style="position:absolute;top:0;left:0;width:100%;height:14px;background:#0F2142;"></div>
          <div style="position:absolute;top:14px;left:28%;width:44%;height:6px;background:#0F2142;border-bottom:2px solid #C9A04A;border-radius:0 0 8px 8px;"></div></div>`,
        footerTemplate: `<div style="width:100%;font-family:'Liberation Sans',Arial,sans-serif;font-size:7.5pt;color:#5E6E86;-webkit-print-color-adjust:exact;">
          <div style="display:flex;justify-content:space-between;padding:0 0.75in 6px;">
            <span>${footerText}</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>
          <div style="height:4px;background:#C9A04A;"></div><div style="height:10px;background:#0F2142;"></div></div>`,
        margin: { top: '0.85in', bottom: '0.9in', left: '0.75in', right: '0.75in' },
      });
      await page.close();
      console.log(`wrote ${out}`);
    }
  } finally {
    await browser.close();
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
