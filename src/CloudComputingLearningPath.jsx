import React, { useState, useEffect, useCallback, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const STAGE_COLOR = {
  start: "#7C8DA6",
  s1: "#5EEAD4",
  s2: "#FBBF24",
  s3: "#A78BFA",
  s4: "#F472B6",
  s5: "#818CF8",
  s6: "#38BDF8",
  next: "#4ADE80",
};

const NODES = [
  { key: "start", label: "START", range: [0, 0] },
  { key: "s1", label: "01", range: [1, 2] },
  { key: "s2", label: "02", range: [3, 4] },
  { key: "s3", label: "03", range: [5, 7] },
  { key: "s4", label: "04", range: [8, 8] },
  { key: "s5", label: "05", range: [9, 9] },
  { key: "s6", label: "06", range: [10, 10] },
  { key: "next", label: "END", range: [11, 11] },
];

const SLIDES = [
  {
    stage: "start",
    type: "title",
    eyebrow: "LEARNING_PATH // CLOUD_COMPUTING",
    title: "Cloud Computing\nLearning Path",
    subtitle:
      "A guided route from bare infrastructure to production-ready cloud skills — networking fundamentals, career grounding, and hands-on paths across GCP, AWS, and Docker.",
    data: [
      {
        num: "01",
        color: STAGE_COLOR.s1,
        name: "Introduction to Cloud Computing",
        desc: "Foundations: Linux, IP addressing, DNS, SSH, TLS — the plumbing every cloud service sits on top of.",
      },
      {
        num: "02",
        color: STAGE_COLOR.s2,
        name: "Entering the Cloud",
        desc: "Career paths, role clarity, certifications, and how to actually break into the industry.",
      },
      {
        num: "03",
        color: STAGE_COLOR.s3,
        name: "Courses & Resources",
        desc: "Structured, hands-on paths through GCP, AWS, and Docker.",
      },
      {
        num: "04",
        color: STAGE_COLOR.s4,
        name: "AI Learning Path",
        desc: "AWS Certified AI Practitioner (AIF-C01) — AI/ML fundamentals on AWS.",
      },
      {
        num: "05",
        color: STAGE_COLOR.s5,
        name: "Terraform",
        desc: "Infrastructure as Code — provision cloud resources declaratively.",
      },
      {
        num: "06",
        color: STAGE_COLOR.s6,
        name: "Kubernetes",
        desc: "Container orchestration — deploy, scale, and manage workloads.",
      },
    ],
  },
  {
    stage: "s1",
    type: "objectives",
    eyebrow: "STAGE 01 / INTRODUCTION TO CLOUD COMPUTING",
    title: "Learning Objectives",
    data: [
      "What is Cloud Computing?",
      "Why organizations are moving to the cloud",
      "Traditional Infrastructure vs Cloud Infrastructure",
      "Cloud Service Models (IaaS, PaaS, SaaS)",
      "Cloud Deployment Models (Public, Private, Hybrid)",
      "Benefits of Cloud Computing",
      "Basic Cloud Terminologies",
    ],
  },
  {
    stage: "s1",
    type: "links",
    eyebrow: "STAGE 01 / INTRODUCTION TO CLOUD COMPUTING",
    title: "Recommended Videos",
    subtitle: "Networking & Linux fundamentals — the plumbing every cloud service sits on top of.",
    data: [
      { title: "Linux File System Structure Explained: From / to /usr | Linux Basics", url: "https://youtu.be/ISJ44S5sZu8?si=FwWmSwg8lk4SLUqR" },
      { title: "Basic Linux Navigation", url: "https://www.youtube.com/watch?v=dzHscTzpAME" },
      { title: "Basic Linux Commands", url: "https://www.youtube.com/watch?v=asmIzGthEzk" },
      { title: "Linux File Types", url: "https://www.youtube.com/watch?v=7KTk8NVB1N8" },
      { title: "What is IP address and types of IP address – IPv4 and IPv6 | TechTerms", url: "https://www.youtube.com/watch?v=8npT9AALbrI" },
      { title: "IP address classes explained | class A, B, C, D, E | Free CCNA 200-301", url: "https://www.youtube.com/watch?v=0dFNpNgiTAA" },
      { title: "What is CIDR (Classless Inter Domain Routing)?", url: "https://www.youtube.com/watch?v=KiWXRL-2TnY" },
      { title: "SSH explained in 2 minutes!", url: "https://www.youtube.com/watch?v=P0Fk-K2eZF8" },
      { title: "How SSH Works | Keys, Encryption & Real-World Examples", url: "https://www.youtube.com/watch?v=s-vhqtyUF4I" },
      { title: "TCP vs UDP Comparison", url: "https://www.youtube.com/watch?v=uwoD5YsGACg" },
      { title: "SSL, TLS, HTTP, HTTPS Explained", url: "https://www.youtube.com/watch?v=hExRDVZHhig" },
      { title: "How a DNS Server (Domain Name System) works", url: "https://www.youtube.com/watch?v=mpQZVYPuDGU" },
      { title: "DNS Records Explained", url: "https://www.youtube.com/watch?v=HnUDtycXSNE" },
      { title: "Load Balancer Explained", url: "https://www.youtube.com/watch?v=1fN2UDbtGDQ" },
      { title: "CDN – Content Delivery Network – Explained", url: "https://www.youtube.com/watch?v=nhhfSBm6v4A" },
    ],
  },
  {
    stage: "s2",
    type: "objectives",
    eyebrow: "STAGE 02 / ENTERING THE CLOUD",
    title: "Topics Covered",
    data: [
      "Career Opportunities in Cloud",
      "Cloud Engineer vs DevOps Engineer vs Solutions Architect",
      "Skills Required for Cloud Careers",
      "Certifications and Learning Paths",
      "Industry Expectations",
      "Building Hands-on Experience",
      "Resume and Interview Preparation",
    ],
  },
  {
    stage: "s2",
    type: "links",
    eyebrow: "STAGE 02 / ENTERING THE CLOUD",
    title: "Recommended Videos",
    subtitle: "Ground the theory: what a data center actually is, and where cloud computing came from.",
    data: [
      { title: "What is a Data Center?", url: "https://www.youtube.com/watch?v=Amow8BJm5Go" },
      { title: "How Data Centers Actually Work", url: "https://www.youtube.com/watch?v=cTwvUqLNQrM" },
      { title: "Virtualization Explained", url: "https://www.youtube.com/watch?v=UBVVq-xz5i0" },
      { title: "Cloud Computing Explained", url: "https://www.youtube.com/watch?v=_a6us8kaq0g" },
      { title: "What is the cloud? An introduction to cloud computing with Microsoft Azure", url: "https://www.youtube.com/watch?v=eZLcyTxi8ZI" },
      { title: "Cloud fundamentals walkthrough", url: "https://www.youtube.com/watch?v=IodkW9XTch4", badge: "TAMIL · EN SUBTITLES" },
      { title: "Cloud fundamentals walkthrough, part 2", url: "https://www.youtube.com/watch?v=_4nTYPAuajs", badge: "TAMIL · EN SUBTITLES" },
      { title: "Roadmap Video", url: "https://www.youtube.com/shorts/jQ8e0EGElZA", badge: "SHORTS" },
    ],
  },
  {
    stage: "s3",
    type: "courses",
    eyebrow: "STAGE 03 / COURSES & RESOURCES",
    title: "Google Cloud Platform (GCP)",
    subtitle: "Beginner learning path",
    resources: [
      { title: "Google Cloud Skills Boost — Google Cloud Essentials (Beginner)", url: "https://www.skills.google/course_templates/621" },
      { title: "Products and Services | Google Cloud", url: "https://cloud.google.com/products" },
      { title: "Free Trial and Free Tier Services and Products", url: "https://cloud.google.com/free", badge: "FREE TIER" },
      { title: "Google Cloud Tutorials", url: "https://docs.cloud.google.com/docs/tutorials" },
      { title: "Google Cloud Documentation", url: "https://cloud.google.com/discover" },
      { title: "Google Cloud Community", url: "https://discuss.google.dev/c/google-cloud/14" },
      { title: "Google Cloud Blog", url: "https://cloud.google.com/blog" },
      { title: "Google Cloud Skills Boost (Intermediate)", url: "https://www.skills.google/course_templates/60" },
    ],
    topics: ["Cloud Basics", "Infrastructure", "Networking", "Security", "Storage", "Compute Services"],
    note: "Highly recommended for final-year students and fresh graduates before entering the industry.",
  },
  {
    stage: "s3",
    type: "courses",
    eyebrow: "STAGE 03 / COURSES & RESOURCES",
    title: "Amazon Web Services (AWS)",
    subtitle: "Beginner learning path",
    resources: [
      { title: "AWS Certified Cloud Practitioner — Beginner Playlist", url: "https://www.youtube.com/playlist?list=PLt1SIbA8guuvfvUDVLpJepmbnYpOfYCIB" },
      { title: "[NEW] Ultimate AWS Certified Cloud Practitioner CLF-C02 2026", url: "https://www.udemy.com/course/aws-certified-cloud-practitioner-new", badge: "PAID · ~₹500 ON SALE" },
    ],
    topics: ["AWS Global Infrastructure", "EC2", "S3", "RDS", "IAM", "VPC", "CloudWatch", "Load Balancers", "Auto Scaling", "Serverless Computing", "Security Best Practices"],
    note: "The Udemy course is paid but budget-friendly during sales, and suitable for beginners with no cloud experience.",
  },
  {
    stage: "s3",
    type: "links",
    eyebrow: "STAGE 03 / COURSES & RESOURCES",
    title: "Docker",
    subtitle: "Containerization fundamentals — package once, run anywhere.",
    data: [
      { title: "Docker 101: A Beginner's Guide to Containerization", url: "https://youtu.be/wxxigbHwDGM?si=mgAilTCFaSRjsYpk" },
      { title: "Learn Docker in 2 Hours – A Full Tutorial (2025)", url: "https://youtu.be/zJ6WbK9zFpI?si=4i7wyTLydy9lEwzF" },
      { title: "Docker Advanced Networking – The Secret to Optimizing Your Container Logging", url: "https://youtu.be/Xxhhdo2e-DA?si=a9M_ePX-lK_UJ6-7" },
    ],
  },
  {
    stage: "s4",
    type: "courses",
    eyebrow: "STAGE 04 / AI LEARNING PATH",
    title: "AWS Certified AI Practitioner (AIF-C01)",
    subtitle: "The natural next step once cloud fundamentals are solid — AWS's entry-level AI/ML certification.",
    resources: [
      {
        title: "AWS Certified AI Practitioner (AIF-C01) – Full Course to PASS the Certification Exam",
        url: "https://www.youtube.com/results?search_query=AWS+Certified+AI+Practitioner+AIF-C01+Full+Course+to+PASS+the+Certification+Exam",
        badge: "YOUTUBE SEARCH",
      },
    ],
    topics: [
      "Fundamentals of AI & Machine Learning",
      "Fundamentals of Generative AI",
      "Foundation Models & Applications",
      "AWS AI/ML Services (Bedrock, SageMaker, Comprehend, Rekognition, Textract)",
      "Guidelines for Responsible AI",
      "Security, Compliance & Governance for AI Solutions",
    ],
    note: "No direct video link was provided for this title, so the resource above links to a YouTube search for the exact course name — it should surface as the top result.",
  },
  {
    stage: "s5",
    type: "courses",
    eyebrow: "STAGE 05 / INFRASTRUCTURE AS CODE",
    title: "Terraform",
    subtitle: "Provision and version cloud infrastructure as code instead of clicking through consoles.",
    resources: [
      { title: "ctgopinaath/terraform — reference repo & hands-on examples", url: "https://github.com/ctgopinaath/terraform", badge: "GITHUB REPO" },
    ],
    topics: [
      "Infrastructure as Code — why and when",
      "HCL Syntax & Terraform Blocks",
      "Providers, Resources & Data Sources",
      "Variables, Outputs & Locals",
      "State Management & Remote Backends",
      "Modules & Reusable Configurations",
      "Workspaces & Environments",
      "plan → apply → destroy Workflow",
    ],
    note: "Clone the repo and work through the examples alongside the topic list above — Terraform is best learned by applying real configurations, not just reading syntax.",
  },
  {
    stage: "s6",
    type: "courses",
    eyebrow: "STAGE 06 / CONTAINER ORCHESTRATION",
    title: "Kubernetes",
    subtitle: "Once workloads are containerized with Docker, Kubernetes is how they're run reliably at scale.",
    resources: [
      { title: "ctgopinaath/kubernetes — reference repo & hands-on examples", url: "https://github.com/ctgopinaath/kubernetes", badge: "GITHUB REPO" },
    ],
    topics: [
      "Container Orchestration Fundamentals",
      "Pods, ReplicaSets & Deployments",
      "Services & Cluster Networking",
      "ConfigMaps & Secrets",
      "Volumes & Persistent Storage",
      "Namespaces & RBAC",
      "Helm Charts",
      "Scaling & Autoscaling",
      "kubectl Essentials",
    ],
    note: "Builds directly on the Docker stage — containerize an app first, then use this repo's examples to deploy it onto a cluster.",
  },
  {
    stage: "next",
    type: "closing",
    eyebrow: "PATH COMPLETE",
    title: "You've Covered the Full Path",
    subtitle: "Six stages, from bare infrastructure to running orchestrated workloads in the cloud. Revisit any stage using the rail on the left.",
    data: [
      { name: "01 · Introduction to Cloud Computing", desc: "Networking & Linux fundamentals" },
      { name: "02 · Entering the Cloud", desc: "Careers, roles & certifications" },
      { name: "03 · Courses & Resources", desc: "GCP, AWS & Docker" },
      { name: "04 · AI Learning Path", desc: "AWS Certified AI Practitioner" },
      { name: "05 · Terraform", desc: "Infrastructure as Code" },
      { name: "06 · Kubernetes", desc: "Container orchestration" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function activeNodeIndex(slideIndex) {
  return NODES.findIndex((n) => slideIndex >= n.range[0] && slideIndex <= n.range[1]);
}

function PlayGlyph({ color }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" style={{ flexShrink: 0 }}>
      <path d="M2 1.2 L8.5 5 L2 8.8 Z" fill={color} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function CloudComputingLearningPath() {
  const [idx, setIdx] = useState(0);
  const total = SLIDES.length;
  const slide = SLIDES[idx];
  const accent = STAGE_COLOR[slide.stage];
  const containerRef = useRef(null);

  const go = useCallback(
    (n) => setIdx((cur) => Math.min(total - 1, Math.max(0, cur + n))),
    [total]
  );
  const jump = useCallback((n) => setIdx(Math.min(total - 1, Math.max(0, n))), [total]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const activeNode = activeNodeIndex(idx);

  return (
    <div className="ccpath-root" ref={containerRef}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

        .ccpath-root {
          --bg: #0A1120;
          --bg-panel: #111A2E;
          --bg-panel-alt: #0D1526;
          --grid-line: rgba(148,163,184,0.07);
          --border: rgba(255,255,255,0.09);
          --text-primary: #E7ECF5;
          --text-muted: #8B99B5;
          --text-dim: #5A6A88;
          --mono: 'JetBrains Mono', monospace;
          --sans: 'IBM Plex Sans', sans-serif;

          position: relative;
          width: 100%;
          min-height: 640px;
          height: 100%;
          background:
            radial-gradient(ellipse 900px 500px at 15% -10%, rgba(94,234,212,0.08), transparent 60%),
            var(--bg);
          color: var(--text-primary);
          font-family: var(--sans);
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 1px 0 rgba(255,255,255,0.04) inset;
        }

        .ccpath-bggrid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
          background-size: 42px 42px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 100% 100% at 50% 0%, black 40%, transparent 90%);
        }

        .ccpath-topbar {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 28px 14px 28px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }
        .ccpath-brand {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.12em;
          color: var(--text-dim);
        }
        .ccpath-counter {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }
        .ccpath-counter b { color: var(--text-primary); }

        .ccpath-progress {
          position: relative;
          height: 2px;
          background: var(--border);
          flex-shrink: 0;
        }
        .ccpath-progress-fill {
          height: 100%;
          transition: width 0.4s cubic-bezier(.4,0,.2,1), background 0.4s;
        }

        .ccpath-body {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          min-height: 0;
        }

        /* ---- rail ---- */
        .ccpath-rail {
          width: 88px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 28px 0;
          border-right: 1px solid var(--border);
        }
        .ccpath-rail-track {
          position: relative;
          flex: 1;
          width: 2px;
          background: var(--border);
          margin: 6px 0;
        }
        .ccpath-rail-fill {
          position: absolute;
          top: 0; left: 0; width: 100%;
          background: linear-gradient(to bottom, #5EEAD4, #FBBF24, #A78BFA, #F472B6, #818CF8, #38BDF8, #4ADE80);
          transition: height 0.5s cubic-bezier(.4,0,.2,1);
        }
        .ccpath-node {
          position: relative;
          z-index: 1;
          width: 30px; height: 30px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--mono);
          font-size: 9px;
          font-weight: 600;
          background: var(--bg-panel-alt);
          border: 2px solid var(--border);
          color: var(--text-dim);
          cursor: pointer;
          transition: all 0.25s;
          flex-shrink: 0;
        }
        .ccpath-node.done {
          color: var(--bg);
          border-color: transparent;
        }
        .ccpath-node.active {
          transform: scale(1.18);
          box-shadow: 0 0 0 4px rgba(255,255,255,0.06);
        }
        .ccpath-node.active::after {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1px solid currentColor;
          animation: ccpath-pulse 1.8s ease-out infinite;
        }
        @keyframes ccpath-pulse {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        /* ---- main content ---- */
        .ccpath-main {
          flex: 1;
          min-width: 0;
          padding: 36px 44px 28px 40px;
          overflow-y: auto;
        }
        .ccpath-eyebrow {
          font-family: var(--mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          margin-bottom: 14px;
        }
        .ccpath-title {
          font-family: var(--mono);
          font-weight: 700;
          font-size: 34px;
          line-height: 1.12;
          letter-spacing: -0.01em;
          white-space: pre-line;
          margin-bottom: 12px;
        }
        .ccpath-subtitle {
          font-size: 15px;
          line-height: 1.6;
          color: var(--text-muted);
          max-width: 620px;
          margin-bottom: 28px;
        }

        .ccpath-fade {
          animation: ccpath-fadein 0.45s cubic-bezier(.4,0,.2,1);
        }
        @keyframes ccpath-fadein {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ---- title slide stage cards ---- */
        .ccpath-stagecards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 8px;
        }
        .ccpath-stagecard {
          background: var(--bg-panel);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 18px 16px;
          position: relative;
          overflow: hidden;
        }
        .ccpath-stagecard::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: var(--card-color);
        }
        .ccpath-stagecard-num {
          font-family: var(--mono);
          font-size: 22px;
          font-weight: 700;
          color: var(--card-color);
          margin-bottom: 10px;
        }
        .ccpath-stagecard-name {
          font-size: 14.5px;
          font-weight: 600;
          margin-bottom: 6px;
        }
        .ccpath-stagecard-desc {
          font-size: 12.5px;
          line-height: 1.5;
          color: var(--text-muted);
        }

        /* ---- objectives list ---- */
        .ccpath-objlist { list-style: none; padding: 0; margin: 0; max-width: 640px; }
        .ccpath-objlist li {
          display: flex;
          gap: 12px;
          align-items: baseline;
          padding: 12px 0;
          border-bottom: 1px solid var(--border);
          font-size: 15px;
        }
        .ccpath-objlist li:first-child { padding-top: 0; }
        .ccpath-objidx {
          font-family: var(--mono);
          font-size: 12px;
          color: var(--acc);
          flex-shrink: 0;
          width: 24px;
        }

        /* ---- links list ---- */
        .ccpath-linklist { display: flex; flex-direction: column; }
        .ccpath-linkrow {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 12px;
          border-radius: 8px;
          text-decoration: none;
          color: var(--text-primary);
          border-bottom: 1px solid var(--border);
          transition: background 0.15s;
        }
        .ccpath-linkrow:hover { background: var(--bg-panel); }
        .ccpath-linkrow:first-child { }
        .ccpath-linkidx {
          font-family: var(--mono);
          font-size: 11px;
          color: var(--text-dim);
          width: 20px;
          flex-shrink: 0;
        }
        .ccpath-linktitle { font-size: 13.5px; flex: 1; line-height: 1.4; }
        .ccpath-badge {
          font-family: var(--mono);
          font-size: 9.5px;
          letter-spacing: 0.05em;
          padding: 3px 7px;
          border-radius: 4px;
          background: rgba(255,255,255,0.06);
          color: var(--text-muted);
          flex-shrink: 0;
          white-space: nowrap;
        }
        .ccpath-arrow { color: var(--text-dim); font-size: 13px; flex-shrink: 0; }

        /* ---- courses ---- */
        .ccpath-topics { display: flex; flex-wrap: wrap; gap: 8px; margin: 18px 0 22px; }
        .ccpath-chip {
          font-family: var(--mono);
          font-size: 11px;
          padding: 6px 11px;
          border-radius: 999px;
          border: 1px solid var(--border);
          color: var(--text-muted);
        }
        .ccpath-note {
          margin-top: 20px;
          padding: 12px 14px;
          border-left: 2px solid var(--acc);
          background: var(--bg-panel);
          border-radius: 0 8px 8px 0;
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.5;
          max-width: 620px;
        }
        .ccpath-sectionlabel {
          font-family: var(--mono);
          font-size: 10.5px;
          letter-spacing: 0.1em;
          color: var(--text-dim);
          margin: 4px 0 8px;
        }

        /* ---- closing ---- */
        .ccpath-nextcards { display: flex; flex-direction: column; gap: 12px; max-width: 520px; }
        .ccpath-nextcard {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          border: 1px dashed var(--border);
          border-radius: 10px;
          background: var(--bg-panel);
        }
        .ccpath-nextcard-name { font-size: 15px; font-weight: 600; margin-bottom: 3px; }
        .ccpath-nextcard-desc { font-size: 12px; color: var(--text-dim); font-family: var(--mono); }

        /* ---- bottom nav ---- */
        .ccpath-footer {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 28px;
          border-top: 1px solid var(--border);
          flex-shrink: 0;
        }
        .ccpath-navbtn {
          font-family: var(--mono);
          font-size: 12px;
          letter-spacing: 0.05em;
          background: var(--bg-panel);
          border: 1px solid var(--border);
          color: var(--text-primary);
          padding: 8px 14px;
          border-radius: 7px;
          cursor: pointer;
          transition: all 0.15s;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .ccpath-navbtn:hover:not(:disabled) { border-color: rgba(255,255,255,0.25); }
        .ccpath-navbtn:disabled { opacity: 0.3; cursor: default; }

        .ccpath-dots { display: flex; gap: 6px; }
        .ccpath-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--border);
          cursor: pointer;
          transition: all 0.2s;
        }
        .ccpath-dot.active { width: 18px; border-radius: 3px; }
        .ccpath-hint { font-family: var(--mono); font-size: 10.5px; color: var(--text-dim); }

        @media (max-width: 720px) {
          .ccpath-rail { width: 46px; }
          .ccpath-node { width: 24px; height: 24px; font-size: 8px; }
          .ccpath-main { padding: 26px 18px 20px 18px; }
          .ccpath-title { font-size: 24px; }
          .ccpath-stagecards { grid-template-columns: 1fr; }
          .ccpath-hint { display: none; }
        }

        .ccpath-main::-webkit-scrollbar { width: 8px; }
        .ccpath-main::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
      `}</style>

      <div className="ccpath-bggrid" />

      {/* top bar */}
      <div className="ccpath-topbar">
        <span className="ccpath-brand">CLOUD_COMPUTING // LEARNING_PATH</span>
        <span className="ccpath-counter">
          <b>{String(idx + 1).padStart(2, "0")}</b> / {String(total).padStart(2, "0")}
        </span>
      </div>
      <div className="ccpath-progress">
        <div
          className="ccpath-progress-fill"
          style={{ width: `${((idx + 1) / total) * 100}%`, background: accent }}
        />
      </div>

      <div className="ccpath-body">
        {/* rail */}
        <div className="ccpath-rail">
          {NODES.map((n, i) => {
            const done = i < activeNode;
            const active = i === activeNode;
            const color = STAGE_COLOR[n.key];
            return (
              <React.Fragment key={n.key}>
                <div
                  className={`ccpath-node ${done ? "done" : ""} ${active ? "active" : ""}`}
                  style={{
                    background: done || active ? color : undefined,
                    borderColor: done || active ? color : undefined,
                    color: active ? color : done ? "#0A1120" : undefined,
                  }}
                  onClick={() => jump(n.range[0])}
                  title={n.label}
                >
                  {n.label}
                </div>
                {i < NODES.length - 1 && (
                  <div className="ccpath-rail-track">
                    <div
                      className="ccpath-rail-fill"
                      style={{ height: i < activeNode ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* main content */}
        <div className="ccpath-main">
          <div key={idx} className="ccpath-fade">
            <div className="ccpath-eyebrow" style={{ color: accent }}>{slide.eyebrow}</div>
            <div className="ccpath-title">{slide.title}</div>
            {slide.subtitle && <div className="ccpath-subtitle">{slide.subtitle}</div>}

            {slide.type === "title" && (
              <div className="ccpath-stagecards">
                {slide.data.map((s) => (
                  <div key={s.num} className="ccpath-stagecard" style={{ "--card-color": s.color }}>
                    <div className="ccpath-stagecard-num">{s.num}</div>
                    <div className="ccpath-stagecard-name">{s.name}</div>
                    <div className="ccpath-stagecard-desc">{s.desc}</div>
                  </div>
                ))}
              </div>
            )}

            {slide.type === "objectives" && (
              <ul className="ccpath-objlist">
                {slide.data.map((item, i) => (
                  <li key={i}>
                    <span className="ccpath-objidx" style={{ color: accent }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {slide.type === "links" && (
              <div className="ccpath-linklist">
                {slide.data.map((item, i) => (
                  <a
                    key={i}
                    className="ccpath-linkrow"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="ccpath-linkidx">{String(i + 1).padStart(2, "0")}</span>
                    <PlayGlyph color={accent} />
                    <span className="ccpath-linktitle">{item.title}</span>
                    {item.badge && <span className="ccpath-badge">{item.badge}</span>}
                    <span className="ccpath-arrow">↗</span>
                  </a>
                ))}
              </div>
            )}

            {slide.type === "courses" && (
              <div>
                <div className="ccpath-linklist">
                  {slide.resources.map((item, i) => (
                    <a
                      key={i}
                      className="ccpath-linkrow"
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="ccpath-linkidx">{String(i + 1).padStart(2, "0")}</span>
                      <PlayGlyph color={accent} />
                      <span className="ccpath-linktitle">{item.title}</span>
                      {item.badge && <span className="ccpath-badge">{item.badge}</span>}
                      <span className="ccpath-arrow">↗</span>
                    </a>
                  ))}
                </div>
                {slide.topics && (
                  <>
                    <div className="ccpath-sectionlabel">RECOMMENDED TOPICS</div>
                    <div className="ccpath-topics">
                      {slide.topics.map((t) => (
                        <span key={t} className="ccpath-chip">{t}</span>
                      ))}
                    </div>
                  </>
                )}
                {slide.note && (
                  <div className="ccpath-note" style={{ "--acc": accent }}>{slide.note}</div>
                )}
              </div>
            )}

            {slide.type === "closing" && (
              <div className="ccpath-nextcards">
                {slide.data.map((n) => (
                  <div key={n.name} className="ccpath-nextcard">
                    <div>
                      <div className="ccpath-nextcard-name">{n.name}</div>
                      <div className="ccpath-nextcard-desc">{n.desc}</div>
                    </div>
                    <span style={{ color: accent, fontSize: 18 }}>→</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* footer nav */}
      <div className="ccpath-footer">
        <button className="ccpath-navbtn" onClick={() => go(-1)} disabled={idx === 0}>
          ← PREV
        </button>
        <div className="ccpath-dots">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className={`ccpath-dot ${i === idx ? "active" : ""}`}
              style={i === idx ? { background: accent } : undefined}
              onClick={() => jump(i)}
            />
          ))}
        </div>
        <span className="ccpath-hint">← → TO NAVIGATE</span>
        <button className="ccpath-navbtn" onClick={() => go(1)} disabled={idx === total - 1}>
          NEXT →
        </button>
      </div>
    </div>
  );
}
