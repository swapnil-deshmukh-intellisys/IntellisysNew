export type ServiceSlug =
  | 'website-development'
  | 'mobile-app-development'
  | 'full-stack-development'
  | 'cloud-solutions'
  | 'cybersecurity'
  | 'ui-ux-design'
  | 'software-testing';

type ServicePageData = {
  slug: ServiceSlug;
  navLabel: string;
  title: string;
  subtitle: string;
  description: string;
  heroStats: Array<{ label: string; value: string }>;
  outcomes: string[];
  deliverables: string[];
  process: Array<{ step: string; title: string; detail: string }>;
  stack: string[];
  faq: Array<{ q: string; a: string }>;
  related: ServiceSlug[];
};

export const servicePages: Record<ServiceSlug, ServicePageData> = {
  'website-development': {
    slug: 'website-development',
    navLabel: 'Website Development',
    title: 'Website Development Services',
    subtitle: 'Build fast, scalable web products that convert and grow.',
    description:
      'From business websites to enterprise-grade web applications, we design and build high-performance platforms with clear architecture, security-first practices, and long-term maintainability.',
    heroStats: [
      { label: 'Avg. MVP Timeline', value: '6-10 weeks' },
      { label: 'Typical Team', value: '3-7 experts' },
      { label: 'Delivery Method', value: 'Agile sprints' },
    ],
    outcomes: [
      'Higher lead conversion through UX-focused journeys',
      'SEO-ready performance and technical foundations',
      'Scalable architecture for feature growth',
      'Clear deployment and maintenance documentation',
    ],
    deliverables: [
      'Product discovery and scope document',
      'Responsive frontend + secure backend',
      'API design and integration layer',
      'Staging + production deployment pipeline',
    ],
    process: [
      { step: '01', title: 'Discovery', detail: 'Goals, personas, user flows, and technical constraints.' },
      { step: '02', title: 'Architecture', detail: 'Information architecture, app structure, and integration plan.' },
      { step: '03', title: 'Build', detail: 'Sprint-based implementation with weekly demos and QA.' },
      { step: '04', title: 'Launch', detail: 'Performance hardening, release runbook, and go-live support.' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Supabase', 'Docker'],
    faq: [
      { q: 'Can you modernize our old website?', a: 'Yes. We run phased modernization to avoid downtime and preserve SEO equity.' },
      { q: 'Do you provide CMS capability?', a: 'Yes, we can integrate headless CMS or custom admin workflows based on your team.' },
      { q: 'Will source code ownership be with us?', a: 'Yes, full source code and deployment assets are handed over.' },
    ],
    related: ['full-stack-development', 'ui-ux-design', 'software-testing'],
  },
  'mobile-app-development': {
    slug: 'mobile-app-development',
    navLabel: 'Mobile App Development',
    title: 'Mobile App Development Services',
    subtitle: 'Deliver native-feel mobile experiences with reliable backend connectivity.',
    description:
      'We build production-ready Android and iOS apps with attention to usability, performance, and offline reliability. The result is a polished app experience users keep coming back to.',
    heroStats: [
      { label: 'Platform Coverage', value: 'Android + iOS' },
      { label: 'Typical Sprint', value: '2 weeks' },
      { label: 'Release Support', value: 'Store ready' },
    ],
    outcomes: [
      'Consistent UX across screen sizes and device classes',
      'Stable API-integrated mobile workflows',
      'Analytics instrumentation for product decisions',
      'App Store and Play Store launch readiness',
    ],
    deliverables: [
      'UI components and app navigation architecture',
      'Backend integration and auth workflows',
      'Push notification setup and engagement events',
      'Release checklists and store listing support',
    ],
    process: [
      { step: '01', title: 'Product Framing', detail: 'Use cases, target devices, and MVP feature prioritization.' },
      { step: '02', title: 'UX and Prototyping', detail: 'Interactive mobile flows before development.' },
      { step: '03', title: 'Development', detail: 'Feature sprints, QA cycles, and test builds.' },
      { step: '04', title: 'Release and Iterate', detail: 'Store submission, monitoring, and post-launch updates.' },
    ],
    stack: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'Node.js', 'Supabase'],
    faq: [
      { q: 'Do you build cross-platform apps?', a: 'Yes, we use Flutter/React Native when speed and shared codebase are priorities.' },
      { q: 'Can you integrate existing APIs?', a: 'Yes, we integrate third-party and legacy APIs with robust error handling.' },
      { q: 'Do you support post-launch updates?', a: 'Yes, we offer maintenance plans for updates, fixes, and enhancements.' },
    ],
    related: ['full-stack-development', 'software-testing', 'ui-ux-design'],
  },
  'full-stack-development': {
    slug: 'full-stack-development',
    navLabel: 'Full Stack Development',
    title: 'Full Stack Development Services',
    subtitle: 'Ship complete products across frontend, backend, and infrastructure.',
    description:
      'Our full stack teams own end-to-end product delivery: UX-driven interfaces, robust APIs, scalable data models, and cloud deployment. Ideal for startups and modernization programs.',
    heroStats: [
      { label: 'Coverage', value: 'Frontend + Backend + Cloud' },
      { label: 'Typical Team', value: '4-8 specialists' },
      { label: 'Delivery Mode', value: 'Continuous release' },
    ],
    outcomes: [
      'Single accountable team across the stack',
      'Faster delivery with fewer handoff delays',
      'Stable architecture under traffic growth',
      'Better observability and incident readiness',
    ],
    deliverables: [
      'System architecture and API contracts',
      'Frontend modules + backend services',
      'Database schema and migration plan',
      'CI/CD setup and production rollout',
    ],
    process: [
      { step: '01', title: 'Solution Mapping', detail: 'Feature map, entities, and integration dependencies.' },
      { step: '02', title: 'Foundation Setup', detail: 'Repo standards, environments, auth, and observability baseline.' },
      { step: '03', title: 'Feature Delivery', detail: 'Parallel frontend/backend execution with integration QA.' },
      { step: '04', title: 'Scale and Stabilize', detail: 'Load tuning, security checks, and release governance.' },
    ],
    stack: ['React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'Redis', 'AWS'],
    faq: [
      { q: 'Can you work with our in-house team?', a: 'Yes, we can embed into your workflow and collaborate as an extension team.' },
      { q: 'Do you support monolith and microservices?', a: 'Yes, we choose architecture based on product stage and team maturity.' },
      { q: 'How do you ensure code quality?', a: 'Through code reviews, automated checks, QA plans, and release gates.' },
    ],
    related: ['website-development', 'cloud-solutions', 'software-testing'],
  },
  'cloud-solutions': {
    slug: 'cloud-solutions',
    navLabel: 'Cloud Solutions',
    title: 'Cloud Solutions and DevOps',
    subtitle: 'Modernize infrastructure for reliability, speed, and cost control.',
    description:
      'We help teams migrate, optimize, and run cloud-native systems with strong uptime and predictable spend. From architecture to IaC and monitoring, we cover the full lifecycle.',
    heroStats: [
      { label: 'Platforms', value: 'AWS / Azure / GCP' },
      { label: 'Focus', value: 'Cost + Reliability' },
      { label: 'Ops Model', value: 'Automation-first' },
    ],
    outcomes: [
      'Faster deployments through CI/CD and IaC',
      'Reduced downtime with proactive monitoring',
      'Controlled cloud costs via rightsizing',
      'Hardened security and access governance',
    ],
    deliverables: [
      'Cloud readiness assessment report',
      'Infrastructure-as-code setup',
      'Monitoring dashboards + alerting policies',
      'Runbooks and incident response playbooks',
    ],
    process: [
      { step: '01', title: 'Assessment', detail: 'Current state, risks, cost profile, and target architecture.' },
      { step: '02', title: 'Migration Plan', detail: 'Phased move plan with rollback and cutover strategy.' },
      { step: '03', title: 'Implementation', detail: 'IaC rollout, CI/CD, security controls, observability.' },
      { step: '04', title: 'Optimization', detail: 'Cost/performance tuning and operational governance.' },
    ],
    stack: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'Prometheus'],
    faq: [
      { q: 'Can you migrate with near-zero downtime?', a: 'Yes, we use phased cutover and rollback strategies to minimize risk.' },
      { q: 'Do you provide managed support after migration?', a: 'Yes, we support post-migration operations and optimization cycles.' },
      { q: 'Can you reduce our cloud bill?', a: 'Yes, cost optimization is built into our architecture and monitoring process.' },
    ],
    related: ['full-stack-development', 'cybersecurity', 'software-testing'],
  },
  cybersecurity: {
    slug: 'cybersecurity',
    navLabel: 'Cybersecurity',
    title: 'Cybersecurity Services',
    subtitle: 'Protect applications, infrastructure, and business-critical data.',
    description:
      'We implement practical security controls across application, cloud, and process layers. Our approach focuses on risk reduction, compliance readiness, and secure delivery pipelines.',
    heroStats: [
      { label: 'Coverage', value: 'App + Infra + Access' },
      { label: 'Security Focus', value: 'Prevention + Detection' },
      { label: 'Readiness', value: 'Audit-friendly' },
    ],
    outcomes: [
      'Reduced attack surface in production systems',
      'Improved identity and access controls',
      'Secure SDLC practices integrated into delivery',
      'Better incident preparedness and traceability',
    ],
    deliverables: [
      'Security posture assessment',
      'Risk matrix with prioritized remediation',
      'Secure configuration baselines',
      'Incident response and escalation playbook',
    ],
    process: [
      { step: '01', title: 'Threat and Risk Review', detail: 'Asset mapping, threat scenarios, and control gaps.' },
      { step: '02', title: 'Remediation Plan', detail: 'Prioritized tasks by impact and implementation effort.' },
      { step: '03', title: 'Implementation', detail: 'Controls rollout, hardening, and policy integration.' },
      { step: '04', title: 'Validation', detail: 'Security checks, monitoring, and governance cadence.' },
    ],
    stack: ['OWASP', 'WAF', 'IAM', 'SIEM', 'SAST', 'DAST', 'Cloud Security Policies'],
    faq: [
      { q: 'Do you run penetration testing?', a: 'Yes, we coordinate structured testing and remediation workflows.' },
      { q: 'Can you secure existing products?', a: 'Yes, we retrofit controls and harden systems without full rewrites.' },
      { q: 'Do you support compliance initiatives?', a: 'Yes, we help with policy, evidence, and control implementation readiness.' },
    ],
    related: ['cloud-solutions', 'software-testing', 'full-stack-development'],
  },
  'ui-ux-design': {
    slug: 'ui-ux-design',
    navLabel: 'UI/UX Design',
    title: 'UI/UX Design Services',
    subtitle: 'Design clear product experiences users understand instantly.',
    description:
      'Our design process combines user research, interaction design, and visual systems to create interfaces that are intuitive, accessible, and conversion-focused.',
    heroStats: [
      { label: 'Design Output', value: 'Research to Prototype' },
      { label: 'System Thinking', value: 'Reusable components' },
      { label: 'Accessibility', value: 'Built-in' },
    ],
    outcomes: [
      'Lower friction in critical user journeys',
      'Consistent UX through design systems',
      'Faster implementation via clear handoff specs',
      'Improved product confidence and trust',
    ],
    deliverables: [
      'User journey maps and wireframes',
      'High-fidelity UI screens and states',
      'Design system and component guidelines',
      'Developer handoff documentation',
    ],
    process: [
      { step: '01', title: 'Research', detail: 'Audience, flows, and pain-point discovery.' },
      { step: '02', title: 'Experience Design', detail: 'Information architecture and interaction models.' },
      { step: '03', title: 'Visual System', detail: 'Component design, states, and responsive behavior.' },
      { step: '04', title: 'Handoff', detail: 'Assets, specifications, and implementation alignment.' },
    ],
    stack: ['Figma', 'Design Systems', 'Accessibility Standards', 'Prototyping', 'Usability Testing'],
    faq: [
      { q: 'Can you redesign only part of our product?', a: 'Yes, we can start with high-impact workflows and expand iteratively.' },
      { q: 'Do you support developer handoff?', a: 'Yes, we provide detailed specs and collaborate during implementation.' },
      { q: 'Do you run usability testing?', a: 'Yes, we validate core flows and iterate based on findings.' },
    ],
    related: ['website-development', 'mobile-app-development', 'software-testing'],
  },
  'software-testing': {
    slug: 'software-testing',
    navLabel: 'Software Testing',
    title: 'Software Testing and QA Services',
    subtitle: 'Ship with confidence through structured quality engineering.',
    description:
      'We build QA strategies that combine manual validation, automation, and release quality gates. The goal is predictable releases with fewer production defects.',
    heroStats: [
      { label: 'Test Coverage', value: 'Manual + Automation' },
      { label: 'Focus', value: 'Release reliability' },
      { label: 'Cadence', value: 'Continuous QA' },
    ],
    outcomes: [
      'Reduced production incidents and hotfix pressure',
      'Faster release cycles with quality gates',
      'Higher confidence in critical business flows',
      'Traceable defect trends for product decisions',
    ],
    deliverables: [
      'QA strategy and test planning',
      'Regression suites and automation scripts',
      'Defect triage and reporting workflow',
      'Release sign-off criteria and dashboards',
    ],
    process: [
      { step: '01', title: 'QA Planning', detail: 'Risk-based test scope and environment planning.' },
      { step: '02', title: 'Test Design', detail: 'Manual scenarios and automation candidate mapping.' },
      { step: '03', title: 'Execution', detail: 'Cycle-based testing, bug triage, and retest loops.' },
      { step: '04', title: 'Release Readiness', detail: 'Quality sign-off with release recommendations.' },
    ],
    stack: ['Cypress', 'Playwright', 'Postman', 'Jest', 'CI Pipelines', 'Test Reporting'],
    faq: [
      { q: 'Can you setup automation from scratch?', a: 'Yes, we build practical suites around critical flows first.' },
      { q: 'Do you test APIs and performance?', a: 'Yes, we include API and non-functional quality checks as needed.' },
      { q: 'Can QA run with our agile sprints?', a: 'Yes, we align QA cadence with sprint delivery and release cycles.' },
    ],
    related: ['full-stack-development', 'website-development', 'mobile-app-development'],
  },
};

export const servicePageOrder: ServiceSlug[] = [
  'website-development',
  'mobile-app-development',
  'full-stack-development',
  'cloud-solutions',
  'cybersecurity',
  'ui-ux-design',
  'software-testing',
];

