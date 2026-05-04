const {
    Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
    HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
    LevelFormat, Footer, TabStopType, TabStopPosition, PageBreak
} = require('docx');
const fs = require('fs');

const PLUM = "4B1248";
const PLUM_LIGHT = "6B1A67";
const ROSE = "B01F68";
const GOLD = "C9A96E";
const LIGHT_BG = "FAF4F6";
const MID_BG = "F0E6F0";
const WHITE = "FFFFFF";
const DARK_TEXT = "1A0A18";
const MUTED = "6B5568";
const BORDER_C = "D4B8D0";

const thinBorder = (color = BORDER_C) => ({ style: BorderStyle.SINGLE, size: 1, color });
const cellBorders = (color = BORDER_C) => ({
    top: thinBorder(color), bottom: thinBorder(color),
    left: thinBorder(color), right: thinBorder(color)
});

const rule = (color = BORDER_C, spaceAfter = 160) => new Paragraph({
    spacing: { before: 0, after: spaceAfter },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color, space: 1 } },
    children: []
});

const body = (text, opts = {}) => new Paragraph({
    spacing: { before: opts.before ?? 80, after: opts.after ?? 140 },
    children: [new TextRun({
        text, font: "Arial", size: 22,
        color: opts.color ?? DARK_TEXT,
        bold: opts.bold ?? false,
        italics: opts.italic ?? false,
    })]
});

const bullet = (text) => new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 40, after: 40 },
    children: [new TextRun({ text, font: "Arial", size: 22, color: DARK_TEXT })]
});

const infoRow = (label, value, shaded = false) => new TableRow({
    children: [
        new TableCell({
            borders: cellBorders(),
            width: { size: 2400, type: WidthType.DXA },
            shading: { fill: shaded ? MID_BG : LIGHT_BG, type: ShadingType.CLEAR },
            margins: { top: 90, bottom: 90, left: 140, right: 140 },
            children: [new Paragraph({ children: [new TextRun({ text: label, font: "Arial", size: 20, bold: true, color: PLUM })] })]
        }),
        new TableCell({
            borders: cellBorders(),
            width: { size: 6960, type: WidthType.DXA },
            shading: { fill: shaded ? "FAF0F8" : WHITE, type: ShadingType.CLEAR },
            margins: { top: 90, bottom: 90, left: 140, right: 140 },
            children: [new Paragraph({ children: [new TextRun({ text: value, font: "Arial", size: 20, color: DARK_TEXT })] })]
        }),
    ]
});

const serviceTable = (rows) => new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2000, 3480, 3880],
    rows: [
        new TableRow({
            tableHeader: true,
            children: ["Service / Tool", "Purpose", "Justification"].map((h, i) => new TableCell({
                borders: cellBorders(PLUM_LIGHT),
                width: { size: [2000, 3480, 3880][i], type: WidthType.DXA },
                shading: { fill: PLUM, type: ShadingType.CLEAR },
                margins: { top: 100, bottom: 100, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun({ text: h, font: "Arial", size: 20, bold: true, color: WHITE })] })]
            }))
        }),
        ...rows.map((r, idx) => new TableRow({
            children: r.map((cell, i) => new TableCell({
                borders: cellBorders(),
                width: { size: [2000, 3480, 3880][i], type: WidthType.DXA },
                shading: { fill: idx % 2 === 0 ? WHITE : LIGHT_BG, type: ShadingType.CLEAR },
                margins: { top: 90, bottom: 90, left: 120, right: 120 },
                children: [new Paragraph({
                    children: [new TextRun({ text: cell, font: "Arial", size: 19, bold: i === 0, color: i === 0 ? PLUM : DARK_TEXT })]
                })]
            }))
        }))
    ]
});

const altTable = (rows) => new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [1700, 1700, 1700, 4260],
    rows: [
        new TableRow({
            tableHeader: true,
            children: ["Category", "We Chose", "Alternative", "Why We Did Not Choose It"].map((h, i) => new TableCell({
                borders: cellBorders(ROSE),
                width: { size: [1700, 1700, 1700, 4260][i], type: WidthType.DXA },
                shading: { fill: ROSE, type: ShadingType.CLEAR },
                margins: { top: 100, bottom: 100, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun({ text: h, font: "Arial", size: 19, bold: true, color: WHITE })] })]
            }))
        }),
        ...rows.map((r, idx) => new TableRow({
            children: r.map((cell, i) => new TableCell({
                borders: cellBorders(),
                width: { size: [1700, 1700, 1700, 4260][i], type: WidthType.DXA },
                shading: { fill: idx % 2 === 0 ? WHITE : LIGHT_BG, type: ShadingType.CLEAR },
                margins: { top: 90, bottom: 90, left: 120, right: 120 },
                children: [new Paragraph({
                    children: [new TextRun({
                        text: cell, font: "Arial", size: 19,
                        bold: i <= 1,
                        color: i === 0 ? PLUM : i === 1 ? "1A6B1A" : DARK_TEXT,
                    })]
                })]
            }))
        }))
    ]
});

const costTable = (rows) => new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [3500, 1900, 2060, 1900],
    rows: [
        new TableRow({
            tableHeader: true,
            children: ["Item", "Provider", "Est. Cost (INR/mo)", "Notes"].map((h, i) => new TableCell({
                borders: cellBorders(PLUM_LIGHT),
                width: { size: [3500, 1900, 2060, 1900][i], type: WidthType.DXA },
                shading: { fill: PLUM, type: ShadingType.CLEAR },
                margins: { top: 100, bottom: 100, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun({ text: h, font: "Arial", size: 19, bold: true, color: WHITE })] })]
            }))
        }),
        ...rows.map((r, idx) => new TableRow({
            children: r.map((cell, i) => new TableCell({
                borders: cellBorders(),
                width: { size: [3500, 1900, 2060, 1900][i], type: WidthType.DXA },
                shading: { fill: r[0] === "TOTAL" ? MID_BG : idx % 2 === 0 ? WHITE : LIGHT_BG, type: ShadingType.CLEAR },
                margins: { top: 90, bottom: 90, left: 120, right: 120 },
                children: [new Paragraph({
                    children: [new TextRun({ text: cell, font: "Arial", size: 19, bold: r[0] === "TOTAL" || i === 0, color: r[0] === "TOTAL" ? PLUM : DARK_TEXT })]
                })]
            }))
        }))
    ]
});

// ═══════════════════════════════════════════════════════════

const doc = new Document({
    numbering: {
        config: [{
            reference: "bullets",
            levels: [{
                level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 560, hanging: 280 } } }
            }]
        }]
    },
    styles: {
        default: { document: { run: { font: "Arial", size: 22, color: DARK_TEXT } } },
        paragraphStyles: [
            {
                id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
                run: { size: 36, bold: true, font: "Arial", color: PLUM },
                paragraph: { spacing: { before: 360, after: 160 }, outlineLevel: 0 }
            },
            {
                id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
                run: { size: 26, bold: true, font: "Arial", color: PLUM_LIGHT },
                paragraph: { spacing: { before: 280, after: 100 }, outlineLevel: 1 }
            },
        ]
    },

    sections: [{
        properties: {
            page: {
                size: { width: 12240, height: 15840 },
                margin: { top: 1080, right: 1080, bottom: 1080, left: 1260 }
            }
        },

        footers: {
            default: new Footer({
                children: [new Paragraph({
                    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
                    border: { top: { style: BorderStyle.SINGLE, size: 4, color: BORDER_C, space: 6 } },
                    spacing: { before: 80 },
                    children: [
                        new TextRun({ text: "ShaadiMe  \u2014  Internal  \u2014  Confidential", font: "Arial", size: 16, color: MUTED }),
                        new TextRun({ text: "\t", font: "Arial", size: 16 }),
                        new TextRun({ children: ["Page ", { type: "page" }], font: "Arial", size: 16, color: MUTED }),
                    ]
                })]
            })
        },

        children: [

            // ── COVER ──────────────────────────────────────────

            new Paragraph({
                spacing: { before: 720, after: 80 },
                children: [new TextRun({ text: "ShaadiMe", font: "Arial", size: 72, bold: true, color: PLUM })]
            }),
            new Paragraph({
                spacing: { before: 0, after: 60 },
                children: [new TextRun({ text: "Technology Infrastructure & Deployment Proposal", font: "Arial", size: 30, color: ROSE })]
            }),
            rule(GOLD, 240),
            new Table({
                width: { size: 9360, type: WidthType.DXA },
                columnWidths: [2400, 6960],
                rows: [
                    infoRow("Prepared by", "Engineering Team", false),
                    infoRow("Prepared for", "Company Head / Leadership", true),
                    infoRow("Date", new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }), false),
                    infoRow("Version", "1.0 — Initial Submission", true),
                    infoRow("Classification", "Internal — Confidential", false),
                    infoRow("Subject", "Production deployment — services and tooling required", true),
                ]
            }),
            new Paragraph({ children: [new PageBreak()] }),

            // ── 1. EXECUTIVE SUMMARY ───────────────────────────

            new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("1.  Executive Summary")] }),
            rule(BORDER_C, 180),
            body("ShaadiMe is ready to move from development to a live, customer-facing production environment. This document sets out every service and tool required to do that safely — and explains precisely why each one is needed."),
            body("The platform comprises an Angular frontend, a Laravel API backend, and a MySQL database. To operate this in production at a standard appropriate for a premium wedding planning brand, we require tooling in four areas: automated deployment, automated testing, live monitoring, and an internal CRM for the planning team."),
            body("All tooling choices have been made to minimise recurring cost. The only unavoidable expense is the server itself. Every other component in this proposal is open-source and carries no licensing fee."),
            new Paragraph({ children: [new PageBreak()] }),

            // ── 2. CURRENT STATE ───────────────────────────────

            new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("2.  Current State")] }),
            rule(BORDER_C, 180),
            new Table({
                width: { size: 9360, type: WidthType.DXA },
                columnWidths: [2400, 6960],
                rows: [
                    infoRow("Frontend", "Angular 21 — built, serving locally only", false),
                    infoRow("Backend", "Laravel 12 — REST API, serving locally only", true),
                    infoRow("Database", "MySQL — schema defined, migrations written", false),
                    infoRow("Deployment", "None. No production environment exists.", true),
                    infoRow("Testing", "None. No automated test suite exists.", false),
                    infoRow("Monitoring", "None. No visibility into uptime or errors.", true),
                    infoRow("CRM", "None. Leads land in the database with no interface to view them.", false),
                ]
            }),
            new Paragraph({ spacing: { before: 180, after: 0 }, children: [] }),
            body("This document proposes the tooling to close every one of these gaps before any customer traffic is directed to the platform."),
            new Paragraph({ children: [new PageBreak()] }),

            // ── 3. CI/CD ───────────────────────────────────────

            new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("3.  Continuous Integration and Deployment (CI/CD)")] }),
            rule(BORDER_C, 180),
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.1  The Problem")] }),
            body("Currently, deploying a code change requires a developer to manually connect to the server, pull the latest code, rebuild the frontend, restart the backend, and verify nothing broke. This process is error-prone and impossible to audit. A single missed step risks taking the site offline."),
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.2  What CI/CD Does")] }),
            body("CI/CD automates the entire process. When a developer pushes code to the main branch, the pipeline triggers automatically — it builds the application, runs all tests, and if everything passes, deploys to the server. If anything fails, the deployment stops and the live site is untouched."),
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.3  Tools Required")] }),
            new Paragraph({ spacing: { before: 120, after: 0 }, children: [] }),
            serviceTable([
                ["Jenkins", "Orchestrates the full build, test, and deploy pipeline on every push to the main branch.", "Open-source, self-hosted, zero licensing cost. Industry standard for on-premise pipelines. Keeps all deployment credentials on our own infrastructure."],
                ["GitHub Webhooks", "Notifies Jenkins the moment code is pushed so the pipeline starts immediately.", "Native GitHub feature. Zero cost. No additional tooling required."],
                ["Nginx", "Serves the compiled Angular frontend and routes API requests to Laravel.", "Standard on Linux servers. Handles SSL termination and subdomain routing."],
                ["PM2 / Supervisor", "Keeps the Laravel queue worker and background processes alive on the server at all times.", "Lightweight, battle-tested, restarts crashed processes automatically."],
            ]),
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.4  Pipeline Stages")] }),
            body("Each stage runs in sequence. Any failure stops subsequent stages and leaves the live site unchanged."),
            bullet("Checkout — Jenkins pulls the latest code from GitHub"),
            bullet("Build Frontend — installs Node dependencies and compiles Angular to static files"),
            bullet("Build Backend — installs PHP dependencies and caches Laravel configuration"),
            bullet("Test — runs the Selenium automated test suite"),
            bullet("Deploy — copies the compiled code to the server and restarts the backend. Runs only when all prior stages pass and only on the main branch."),
            new Paragraph({ children: [new PageBreak()] }),

            // ── 4. AUTOMATED TESTING ───────────────────────────

            new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("4.  Automated Testing")] }),
            rule(BORDER_C, 180),
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.1  The Problem")] }),
            body("Without automated tests, every deployment requires a developer to manually click through the site and verify it still works. As the platform grows this becomes impractical. More critically, issues reach production undetected because no systematic check exists before release."),
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.2  What Testing Does")] }),
            body("Automated tests run inside the pipeline before every deployment. They open a real browser, simulate real user actions, and verify the application behaves correctly. If a code change breaks the intake form or navigation, the test catches it and the deployment does not proceed."),
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.3  Tools Required")] }),
            new Paragraph({ spacing: { before: 120, after: 0 }, children: [] }),
            serviceTable([
                ["Selenium WebDriver", "Controls a real Chrome browser instance to simulate user interactions — clicking, typing, navigating — exactly as a real user would.", "Industry standard for end-to-end UI testing. Supports headless execution in CI pipelines. Widely documented."],
                ["Python + pytest", "Language and test runner used to write and execute the Selenium test scripts.", "Minimal boilerplate, clear output. Integrates cleanly with Selenium and Jenkins."],
                ["ChromeDriver (Headless)", "Runs Chrome without a visible window so tests execute on a server with no display.", "Matches the primary browser of ShaadiMe users. Runs cleanly inside the Jenkins pipeline."],
            ]),
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.4  Initial Test Coverage")] }),
            bullet("Homepage loads with hero, cities, venues, and FAQ sections visible"),
            bullet("'Start Planning' button navigates to the /plan route"),
            bullet("Intake form accepts name and phone fields and advances to Step 2"),
            bullet("Intake form submission reaches the API and displays the success screen"),
            bullet("CRM login page is accessible at crm.shaadi.me"),
            bullet("CRM leads table loads correctly after authentication"),
            new Paragraph({ children: [new PageBreak()] }),

            // ── 5. MONITORING ──────────────────────────────────

            new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("5.  Production Monitoring and Alerting")] }),
            rule(BORDER_C, 180),
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.1  The Problem")] }),
            body("Once the platform is live, issues will occur — a server running out of memory, response times spiking, a backend process crashing. Without monitoring, the team only discovers these when a customer complains or the site goes down entirely. There is no early warning and no history to diagnose the cause."),
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.2  What Monitoring Does")] }),
            body("Monitoring gives the team real-time visibility into the health of the live system. It stores a continuous history of metrics and triggers alerts when something crosses a threshold — before users notice a problem. The team moves from reactive fire-fighting to proactive awareness."),
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.3  Tools Required")] }),
            new Paragraph({ spacing: { before: 120, after: 0 }, children: [] }),
            serviceTable([
                ["Prometheus", "Collects and stores time-series metrics — request counts, response times, error rates, CPU, and memory — every 15 seconds.", "Open-source, self-hosted, zero licensing cost. Industry standard for server and application monitoring. Integrates natively with Grafana."],
                ["Grafana", "Visualises Prometheus data as dashboards and graphs accessible to the whole team.", "Open-source. Connects to Prometheus out of the box. Large library of pre-built dashboards. Accessible to non-technical viewers."],
                ["Node Exporter", "Runs on the server and exposes system-level metrics — CPU, disk, memory, network — for Prometheus to collect.", "Standard Prometheus exporter for Linux. Minimal resource footprint. No application code changes required."],
                ["Laravel Prometheus (Spatie)", "Exposes application-level metrics from the Laravel backend — request counts per route, response times, error rates.", "Official, well-maintained package. Integrates with the existing codebase with minimal configuration."],
            ]),
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.4  Metrics Tracked from Day One")] }),
            bullet("API response time — average and 95th percentile across all routes"),
            bullet("HTTP error rate — percentage of 4xx and 5xx responses"),
            bullet("Server CPU — alert if sustained above 80%"),
            bullet("Server memory — alert if sustained above 85%"),
            bullet("Disk usage — alert at 75% capacity"),
            bullet("Lead submission count — daily intake form completions"),
            bullet("Uptime — alert within 60 seconds of the site becoming unreachable"),
            new Paragraph({ children: [new PageBreak()] }),

            // ── 6. CRM DASHBOARD ───────────────────────────────

            new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("6.  Internal CRM Dashboard")] }),
            rule(BORDER_C, 180),
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.1  The Problem")] }),
            body("Every time a couple completes the intake form on shaadi.me, their details are stored in the database. Currently there is no interface for the planning or sales team to view, filter, or act on these leads. The data exists but is inaccessible without direct database access, which is not appropriate for non-technical team members and creates a significant operational gap."),
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.2  What the CRM Does")] }),
            body("The CRM dashboard at crm.shaadi.me gives the internal team a clean, login-protected interface to see all incoming leads, update their status, and add follow-up notes — without any technical knowledge required. It connects directly to the existing database with no third-party sync needed."),
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.3  Tools Required")] }),
            new Paragraph({ spacing: { before: 120, after: 0 }, children: [] }),
            serviceTable([
                ["Filament (Laravel)", "Admin panel framework built on Laravel. Provides the full CRM interface — lead tables, filters, edit forms, and authentication — with minimal custom code.", "Built specifically for Laravel. Open-source. Ships with authentication, search, and filters out of the box. Reduces build time from weeks to days."],
                ["Nginx subdomain block", "Routes traffic from crm.shaadi.me to the CRM application on the same server.", "Reuses existing infrastructure. No additional server or hosting cost."],
                ["Let's Encrypt SSL", "Issues a free HTTPS certificate for the crm.shaadi.me subdomain.", "Free, auto-renewing, trusted by all browsers. Industry standard for securing web properties."],
            ]),
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.4  Features to Be Delivered")] }),
            bullet("Secure login — only authorised team members can access the dashboard"),
            bullet("Leads table — all submissions with name, phone, city, wedding date, budget, and submission time"),
            bullet("Search and filter — by city, wedding tradition, status, or date range"),
            bullet("Lead detail view — full submitted information for any lead"),
            bullet("Status management — New, Contacted, Meeting Scheduled, Converted, Not Interested"),
            bullet("Notes — internal notes per lead for follow-up tracking"),
            bullet("Mobile-responsive — usable by planners on the move"),
            new Paragraph({ children: [new PageBreak()] }),

            // ── 7. HOSTING ─────────────────────────────────────

            new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("7.  Hosting and Infrastructure")] }),
            rule(BORDER_C, 180),
            body("All services will run on a single VPS (Virtual Private Server) running Ubuntu 24.04. This keeps infrastructure simple, auditable, and cost-effective at the current scale. The VPS can be resized without architectural changes as traffic grows."),
            new Paragraph({ spacing: { before: 160, after: 0 }, children: [] }),
            new Table({
                width: { size: 9360, type: WidthType.DXA },
                columnWidths: [2400, 6960],
                rows: [
                    infoRow("Provider", "Hetzner or DigitalOcean", false),
                    infoRow("Specification", "4 vCPU / 8 GB RAM / 160 GB SSD", true),
                    infoRow("Operating System", "Ubuntu 24.04 LTS", false),
                    infoRow("Region", "Bangalore — closest to Hyderabad, Bengaluru, and Chennai launch cities", true),
                    infoRow("Services on server", "Nginx, PHP 8.3, MySQL, Jenkins, Prometheus, Grafana, Node Exporter", false),
                    infoRow("Estimated cost", "INR 2,800 – 4,200 per month", true),
                ]
            }),
            new Paragraph({ spacing: { before: 180, after: 100 }, children: [] }),
            body("DNS configuration requires three records:"),
            bullet("shaadi.me — A record pointing to the server IP"),
            bullet("crm.shaadi.me — A record pointing to the same server IP"),
            bullet("www.shaadi.me — CNAME pointing to shaadi.me"),
            new Paragraph({ children: [new PageBreak()] }),

            // ── 8. COST SUMMARY ────────────────────────────────

            new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("8.  Estimated Monthly Cost Summary")] }),
            rule(BORDER_C, 180),
            new Paragraph({ spacing: { before: 120, after: 0 }, children: [] }),
            costTable([
                ["VPS Server (4 vCPU / 8 GB / 160 GB SSD)", "Hetzner / DigitalOcean", "INR 2,800 – 4,200", "All services hosted here"],
                ["Domain registration (shaadi.me)", "Namecheap / GoDaddy", "INR 800 – 1,200 p.a.", "Annual renewal only"],
                ["SSL certificates", "Let's Encrypt", "Free", "Auto-renewing, both subdomains"],
                ["Jenkins", "Self-hosted on VPS", "Free (open-source)", "No licensing fee"],
                ["Prometheus + Grafana", "Self-hosted on VPS", "Free (open-source)", "Included in server cost"],
                ["Selenium + pytest", "Runs inside Jenkins pipeline", "Free (open-source)", "No additional resource cost"],
                ["Filament CRM", "Open-source Laravel package", "Free", "No licensing fee"],
                ["Email alerts", "Resend free tier", "Free initially", "Upgrade as volume grows"],
                ["TOTAL", "", "INR 2,800 – 4,200 / month", "Plus annual domain renewal"],
            ]),
            new Paragraph({ spacing: { before: 180, after: 0 }, children: [] }),
            body("The only unavoidable recurring expense is the server. Every other component in this proposal is open-source and carries no licensing cost.", { italic: true, color: MUTED }),
            new Paragraph({ children: [new PageBreak()] }),

            // ── 9. ALTERNATIVES ────────────────────────────────

            new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("9.  Alternatives Evaluated and Not Selected")] }),
            rule(BORDER_C, 180),
            body("For each tooling decision, alternatives were considered. The table below records what was evaluated, what was chosen, and the specific reason the alternative was not selected. Every recommendation in this document is deliberate."),
            new Paragraph({ spacing: { before: 180, after: 0 }, children: [] }),
            altTable([
                ["CI/CD", "Jenkins", "GitHub Actions", "Runs on GitHub's cloud infrastructure, introducing a third-party dependency for our core deployment process and per-minute billing at scale. Jenkins, self-hosted, keeps all deployment credentials on our own infrastructure at zero additional cost."],
                ["CI/CD", "Jenkins", "GitLab CI", "Requires migrating the codebase from GitHub to GitLab or maintaining two remote repositories. The migration complexity is not justified when Jenkins integrates with GitHub directly."],
                ["CI/CD", "Jenkins", "CircleCI", "A managed cloud CI product whose free tier is limited and production workloads quickly exceed. Paid plans start at approximately INR 6,500 per month. Jenkins on our own server is free."],
                ["Testing", "Selenium + pytest", "Playwright", "A strong modern framework that was evaluated seriously. Selenium was chosen for its broader documentation in the Indian developer community, cleaner Jenkins integration examples, and the existing team context around it. Playwright may be reconsidered for future expansion."],
                ["Testing", "Selenium + pytest", "Cypress", "Requires a persistent Node.js process during test execution, complicating headless CI integration. Also does not support Safari. Selenium with ChromeDriver runs cleanly headless inside Jenkins."],
                ["Monitoring", "Prometheus + Grafana", "Datadog", "The right choice at Series A scale. At the current stage, Datadog's entry plan costs INR 15,000 – 25,000 per month per host. Prometheus and Grafana provide equivalent core functionality at no cost. The move to Datadog can be made later without changing the metrics architecture."],
                ["Monitoring", "Prometheus + Grafana", "New Relic", "The free tier has a 100 GB per month data ingest limit that is easy to exceed. Beyond that, costs escalate quickly. The platform also requires instrumenting the application with a proprietary agent, creating vendor lock-in that Prometheus avoids."],
                ["Monitoring", "Prometheus + Grafana", "AWS CloudWatch", "Tightly coupled to AWS infrastructure. Our server is not on AWS, and migrating solely for monitoring is not justified. If infrastructure moves to AWS in future, CloudWatch becomes the natural fit at that point."],
                ["CRM", "Filament (Laravel)", "HubSpot CRM", "A capable sales CRM but operates as a separate SaaS product with no native database connection. Lead data from the intake form would need forwarding via API or Zapier — an additional layer to maintain and pay for. Filament reads directly from our existing database with no forwarding required."],
                ["CRM", "Filament (Laravel)", "Airtable", "A no-code database product, not a true CRM. Requires manually importing leads or building a webhook integration. Also introduces a monthly subscription of INR 1,200 – 3,500 per user. Filament is free and directly integrated with our data."],
                ["CRM", "Filament (Laravel)", "Custom React frontend", "The first approach considered. Build time estimate was three to four weeks for a comparable feature set. Filament delivers the same result in three to five days because it is purpose-built for this use case on top of our existing Laravel backend. Engineering effort is better directed at customer-facing features."],
                ["Hosting", "Hetzner / DigitalOcean", "AWS EC2", "Excellent at scale. At the current stage, an equivalent EC2 configuration costs two to three times more for the same hardware, with added billing complexity. The architecture is fully portable to AWS if that becomes the preferred provider."],
                ["Hosting", "Hetzner / DigitalOcean", "Vercel + Railway", "Vercel is designed for static frontends and serverless functions. Our Laravel backend is a traditional PHP application and does not run on Vercel. Railway supports Laravel but charges per-usage, making costs unpredictable under real traffic. A single VPS gives deterministic monthly costs and full control."],
            ]),
            new Paragraph({ children: [new PageBreak()] }),

            // ── 10. CONCLUSION ─────────────────────────────────

            new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("10.  Conclusion and Request for Approval")] }),
            rule(BORDER_C, 180),
            body("ShaadiMe is ready for production. The platform is built. What stands between the current development state and a reliable, monitored, maintainable live product is the infrastructure described in this document."),
            body("The total additional monthly cost is INR 2,800 to 4,200 — the cost of a single server. Every other tool in this proposal is open-source and free. Choices were made deliberately to minimise cost while maintaining the standard appropriate for a premium brand handling personal and financial information."),
            body("We request approval to proceed with server procurement and infrastructure setup as described."),
            new Paragraph({ spacing: { before: 320, after: 0 }, children: [] }),
            rule(GOLD, 100),
            body("Prepared by the ShaadiMe Engineering Team", { italic: true, color: MUTED }),
            body("For questions on this document, contact the lead engineer directly.", { italic: true, color: MUTED }),

        ]
    }]
});

Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync("./ShaadiMe_Infrastructure_Proposal.docx", buffer);
    console.log("Done");
});
