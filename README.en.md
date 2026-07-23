# DriverKit · 驱动派

> An embedded hardware driver documentation library — a practical quick-reference manual for 53 common modules covering principles, selection, wiring, driver code and debugging.

Built with [VitePress](https://vitepress.dev/). After deployment, visit the sample site to browse all the content.

🌐 **Languages**: [简体中文](./README.md) · **English**

---

## 📖 Live Site

👉 **<https://younglet.github.io/driver-kit/>**
👉 **<https://younglet.github.io/driver-kit/en/>** (English)

Every push to `main` triggers GitHub Actions to rebuild and redeploy the site automatically.

---

## 🚀 Deployment

The site is auto-deployed via GitHub Pages + Actions:

1. Push to `main` → triggers `.github/workflows/deploy.yml`
2. The job runs `npm ci` + `npm run docs:build` and uploads the artifact
3. The second job deploys the artifact to GitHub Pages
4. First-time setup: in the repo go to **Settings → Pages → Source** and pick `GitHub Actions`

Deployed URL: **<https://younglet.github.io/driver-kit/>**

## 🚀 Local Preview

Requires Node.js 18+.

```bash
npm install          # Install dependencies (VitePress)
npm run docs:dev     # Start dev server (default http://localhost:5173)
npm run docs:build   # Build static site to docs/.vitepress/dist
npm run docs:preview # Preview the built site locally
```

---

## 📁 Repository Structure

```text
.
├── README.md                           # This file (project README)
├── README.en.md                        # English README
├── package.json                        # Project metadata + npm scripts
├── 总表-硬件驱动文档分类.md              # ★ Document authoring guide (project-level)
└── docs/
    ├── index.md                        # VitePress home page (Chinese, default)
    ├── en/
    │   ├── index.md                    # English home page (served at /en/)
    │   ├── 分类总览.md                   # English "Category Overview" (same filename as Chinese)
    │   └── ...                          # 63 English module/category pages (mirrors the Chinese tree)
    ├── .vitepress/
    │   └── config.mts                  # VitePress config (locales, nav, sidebar, SEO, i18n map)
    ├── 分类总览.md                       # Full index page (Chinese)
    ├── 编写规范.md                       # Authoring guide (Chinese)
    ├── 传感器.md / 执行器.md / ...        # 8 category overview pages (Chinese)
    ├── 传感器-位姿-三轴陀螺仪.md        # Module documentation (53 files, Chinese)
    ├── ...
    └── public/
        ├── favicon.svg                 # Site icon
        ├── robots.txt                  # SEO crawler directives
        ├── sitemap.xml                 # Auto-generated sitemap (128 URLs)
        └── og-image.svg                # Open Graph share image
```

---

## ✍️ Adding / Editing Module Documentation

> For **project contributors**. Readers can ignore this section.

### File Naming

```text
category-field-module.md
```

Examples:

- `传感器-位姿-三轴陀螺仪.md` (Chinese)
- `传感器-位姿-三轴加速度计.md`
- `通信-总线-I2C.md`
- `执行器-运动-直流电机.md`

The English version uses the **same filename** in `docs/en/`:
- `docs/en/传感器-位姿-三轴陀螺仪.md`
- `docs/en/通信-总线-I2C.md`
- `docs/en/执行器-运动-直流电机.md`

### Standard 17-Section Structure

Every module document should follow the 17-section structure defined in [总表-硬件驱动文档分类.md](./总表-硬件驱动文档分类.md) (irrelevant sections may be omitted), including but not limited to:

1. Module Overview
2. Working Principle and Use Cases
3. Common Part Numbers and Reference Prices
4. Key Parameters and Selection Guide
5. Hardware Connection and Electrical Notes
6. Communication Method or Control Signal
7. Initialization Flow
8. Common Driver Interfaces
9. Data Format, Units, and Timing
10. Configuration Parameters
11. Calibration, Compensation, and Filtering
12. Interrupts, DMA, FIFO, and Buffers
13. Error Handling and Exception Recovery
14. Low Power
15. Example Code
16. Debugging Methods
17. Frequently Asked Questions
18. Development Notes
19. References

See [`总表-硬件驱动文档分类.md`](./总表-硬件驱动文档分类.md) for the full Chinese spec.

### Adding a New Module

1. **Copy a template**: pick the closest existing module page as a template
2. **Rename**: use the format `category-field-module.md`
3. **Write the content**: follow the spec; include ≥ 5 part numbers, a price range, and reasonable code examples
4. **Translate**: copy to `docs/en/<same-name>.md` and translate following the glossary inside `MODULE_EN_MAP` in `docs/.vitepress/config.mts` (chip part numbers like MPU6050, I2C, SPI etc. must stay verbatim)
5. **Update the index**:
   - Add a link in [`docs/分类总览.md`](./docs/分类总览.md) and the English version
   - Add the entry to `sidebar` in [`docs/.vitepress/config.mts`](./docs/.vitepress/config.mts)
   - Add the translation to `MODULE_EN_MAP` in the same config
   - For new categories, add the corresponding top-level nav entry
6. **Run the SEO injector** (optional, only adds frontmatter to modules missing it): `npm run seo:inject`

### Price and Parameter Spec

- **Prices**: must be expressed as RMB estimate ranges (e.g. `¥10~30`), with "for budgeting only" disclaimer
- **Parameters**: key specs (range, accuracy, communication rate) must follow the original datasheet
- **Code examples**: runnable pseudo-code or Python-style, with units annotated
- **Error handling**: each chapter should have a "FAQ" or "Error Handling" section

### Pull Request Checklist

- [ ] File naming follows `category-field-module.md`
- [ ] Section structure matches existing modules
- [ ] At least 5 part numbers + reference prices
- [ ] Code examples are readable (platform/library annotated)
- [ ] English version created in `docs/en/` with consistent terminology
- [ ] `分类总览.md` updated
- [ ] `config.mts` sidebar updated and `MODULE_EN_MAP` populated
- [ ] Local `npm run docs:build` passes without errors

---

## 📊 Content Statistics

| Category | Count |
|---|---:|
| Sensors | 17 |
| Actuators | 11 |
| Communication | 12 |
| Display | 3 |
| Input | 3 |
| Storage | 3 |
| Power | 3 |
| Clock | 1 |
| **Total** | **53** |

---

## 🌐 Internationalization

This site supports bilingual content:

- **Default locale (`zh-CN`)**: served at `/`, with simplified Chinese UI and content
- **English locale (`en`)**: served at `/en/`, with English UI and translated content

The locale switcher is in the top navigation bar. Each page declares its language with `<html lang>` and provides `<link rel="alternate" hreflang="...">` to the corresponding translated page, so search engines can serve the right language to the right user.

### Adding a New Translation

1. Mirror the source file from `docs/<name>.md` to `docs/en/<name>.md`
2. Translate the body and frontmatter (`title`, `description`, `keywords`) using the glossary as a reference
3. If you introduce new module names or categories, extend `MODULE_EN_MAP` / `CAT_EN_MAP` in `docs/.vitepress/config.mts`

### SEO / i18n

- Sitemap includes all 128 URLs (64 zh + 64 en); updated automatically by `scripts/generate-sitemap.mjs`
- Each page has its own `description`, OG tags, Twitter Card, and JSON-LD structured data (TechArticle + BreadcrumbList for modules)
- `hreflang` alternates connect the two language versions

---

## 🛠 Build Scripts

```bash
npm run docs:dev      # VitePress dev server
npm run docs:build    # Regenerate sitemap + build static site
npm run docs:preview  # Preview the built site
npm run sitemap       # Regenerate sitemap.xml only
npm run seo:inject    # Inject SEO frontmatter into module pages (only files without frontmatter)
npm run seo:ping      # Ping search engines (Bing IndexNow / Baidu) — optional
```

---

## 📄 License

MIT License

---

## 🙏 Acknowledgments

Content is compiled from public chip datasheets, application notes, and community practice — it does **not** constitute professional commercial advice. If you spot any errors or omissions, please file an Issue or open a PR.