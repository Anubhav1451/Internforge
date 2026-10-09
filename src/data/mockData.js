// Mock Data & Real Contextual Debugging Challenges for InternForge

export const DEPARTMENTS = [
  { id: 'all', name: 'All Departments', icon: 'Layers' },
  { id: 'frontend', name: 'Frontend Engineering', icon: 'Layout' },
  { id: 'backend', name: 'Backend Systems', icon: 'Server' },
  { id: 'aiml', name: 'AI & Machine Learning', icon: 'Cpu' },
  { id: 'devops', name: 'DevOps & Cloud', icon: 'Cloud' },
  { id: 'cyber', name: 'Cybersecurity', icon: 'ShieldCheck' },
  { id: 'data', name: 'Data Engineering', icon: 'Database' },
  { id: 'uiux', name: 'UI/UX & Product Design', icon: 'Figma' },
];

export const INTERNSHIPS = [
  {
    id: 'int-1',
    title: 'Frontend Performance & UI Systems Intern',
    company: 'Vercel Labs',
    department: 'frontend',
    location: 'Remote (Worldwide)',
    stipend: '₹75,000 / month',
    duration: '6 Months',
    matchScore: 94,
    tags: ['React 19', 'Next.js', 'State Hydration', 'Web Vitals'],
    challengeId: 'frontend-cart',
    applicants: 412,
    urgency: 'Closing in 2 days',
    description: 'Work alongside the Next.js core team optimizing micro-frontends and fixing hydration reconciliation bottlenecks.',
    requirements: ['Solid JS closure knowledge', 'Contextual state debugging', 'Clean DOM lifecycle understanding'],
  },
  {
    id: 'int-2',
    title: 'High-Throughput API Gateway Intern',
    company: 'Razorpay',
    department: 'backend',
    location: 'Bengaluru / Hybrid',
    stipend: '₹65,000 / month',
    duration: '6 Months',
    matchScore: 88,
    tags: ['Node.js', 'Redis Mutex', 'Idempotency Keys', 'PostgreSQL'],
    challengeId: 'backend-auth',
    applicants: 620,
    urgency: 'Active Hiring',
    description: 'Solve race conditions in distributed checkout sessions and micro-service payment webhook retries.',
    requirements: ['Async concurrency', 'Idempotency patterns', 'Distributed lock knowledge'],
  },
  {
    id: 'int-3',
    title: 'LLM RAG & Context Window Optimizer Intern',
    company: 'Linear AI Systems',
    department: 'aiml',
    location: 'Remote (India / US)',
    stipend: '₹85,000 / month',
    duration: '3 Months',
    matchScore: 91,
    tags: ['Python / JS', 'Vector Embeddings', 'RAG Chunking', 'Token Latency'],
    challengeId: 'event-telemetry',
    applicants: 290,
    urgency: 'High Priority',
    description: 'Debug retrieval hallucination regressions and optimize semantic search vector caching.',
    requirements: ['Vector similarity metrics', 'Fast data structures', 'Realtime streaming pipelines'],
  },
  {
    id: 'int-4',
    title: 'Zero-Downtime Distributed Cache Intern',
    company: 'Swiggy Tech',
    department: 'backend',
    location: 'Bengaluru (Onsite)',
    stipend: '₹55,000 / month',
    duration: '6 Months',
    matchScore: 82,
    tags: ['Golang/Node', 'Kafka EventBus', 'Memory Profiling', 'Docker'],
    challengeId: 'event-telemetry',
    applicants: 540,
    urgency: 'Active Hiring',
    description: 'Eliminate duplicate event broadcast storms during peak 100k req/sec lunch orders.',
    requirements: ['Event bus architecture', 'Sliding window deduplication', 'Memory leak prevention'],
  },
  {
    id: 'int-5',
    title: 'Design System & Micro-Interactions Intern',
    company: 'Figma Ecosystem',
    department: 'uiux',
    location: 'Remote',
    stipend: '₹70,000 / month',
    duration: '4 Months',
    matchScore: 89,
    tags: ['Design Tokens', 'CSS Variables', 'Accessible Canvas', 'WAI-ARIA'],
    challengeId: 'frontend-cart',
    applicants: 310,
    urgency: 'New Batch',
    description: 'Build robust token-driven primitives that respect high-contrast and complex responsive viewports.',
    requirements: ['Figma variables to CSS', 'Micro-animation physics', 'Sub-pixel rendering'],
  },
  {
    id: 'int-6',
    title: 'Cloud Security & Auth Token Audit Intern',
    company: 'Datadog Security',
    department: 'cyber',
    location: 'Gurgaon / Hybrid',
    stipend: '₹80,000 / month',
    duration: '6 Months',
    matchScore: 86,
    tags: ['JWT Validation', 'OWASP Top 10', 'Rate Limiting', 'Audit Trails'],
    challengeId: 'backend-auth',
    applicants: 198,
    urgency: 'Active Hiring',
    description: 'Fortify token expiration skew and patch replay attacks across edge worker auth layers.',
    requirements: ['Crypto timing attack prevention', 'JWT claims parsing', 'Edge security guards'],
  },
  {
    id: 'int-7',
    title: 'Realtime Data Pipeline Intern',
    company: 'Postman Insights',
    department: 'data',
    location: 'Bengaluru / Remote',
    stipend: '₹60,000 / month',
    duration: '6 Months',
    matchScore: 84,
    tags: ['Event Streams', 'Deduplication', 'Time Series', 'SQL Aggregates'],
    challengeId: 'event-telemetry',
    applicants: 380,
    urgency: 'Active Hiring',
    description: 'Implement windowed deduplication filters for millions of developer telemetry traces.',
    requirements: ['Stream sliding windows', 'Hash index maps', 'Garbage collection mitigation'],
  },
  {
    id: 'int-8',
    title: 'Kubernetes Container Mesh Intern',
    company: 'Zepto HyperLogistics',
    department: 'devops',
    location: 'Mumbai / Hybrid',
    stipend: '₹65,000 / month',
    duration: '6 Months',
    matchScore: 79,
    tags: ['K8s Pods', 'Helm Charts', 'Traffic Canary', 'Prometheus'],
    challengeId: 'backend-auth',
    applicants: 245,
    urgency: 'Closing soon',
    description: 'Automate canary traffic rollback triggers when latency anomalies exceed p99 thresholds.',
    requirements: ['Container health probes', 'Shell & JS automation', 'Metrics threshold parsing'],
  },
];

export const BUG_CHALLENGES = {
  'frontend-cart': {
    id: 'frontend-cart',
    title: 'Checkout State & Tax Glitch (Contextual Bug Fix)',
    department: 'Frontend Engineering',
    timeLimitSeconds: 300, // 5 minutes
    difficulty: 'Production Context',
    concept: 'State Closure & Floating Point Precision',
    description: `A fast-growing e-commerce platform has a critical checkout bug in production:
1. When a coupon percentage discount is applied, the calculation divides the discount before applying tax incorrectly.
2. If total discount exceeds items subtotal, total must gracefully clamp to $0.00 (not negative charge!).
3. Tax is calculated as a flat percentage on the discounted subtotal (if subtotal > 0).
4. Results must be rounded to exactly 2 decimal places to prevent floating-point calculation errors.

Fix the broken function \`calculateCartTotal(items, discountPercent, taxPercent)\`.`,
    starterCode: `function calculateCartTotal(items, discountPercent, taxPercent) {
  // BUG 1: Naive summation without item price/qty validation
  let subtotal = 0;
  for (let i = 0; i < items.length; i++) {
    subtotal += (items[i].price || 0) * (items[i].quantity || 1);
  }

  // BUG 2: Incorrect discount formula causing inverted tax calculation
  // and allowing negative totals when discountPercent > 100
  let discountAmount = subtotal * (discountPercent / 10); // <-- BUG: divided by 10 instead of 100!
  let discountedSubtotal = subtotal - discountAmount;

  // BUG 3: Doesn't clamp to 0 if discount exceeds subtotal
  // and calculates tax on unchecked value with floating point noise
  let taxAmount = discountedSubtotal * (taxPercent / 100);
  let grandTotal = discountedSubtotal + taxAmount;

  // Return formatted object
  return {
    subtotal: subtotal,
    discountedSubtotal: discountedSubtotal,
    taxAmount: taxAmount,
    grandTotal: grandTotal // Needs proper clamping & 2-decimal rounding!
  };
}`,
    solutionSnippet: `function calculateCartTotal(items, discountPercent, taxPercent) {
  let subtotal = 0;
  for (let i = 0; i < items.length; i++) {
    subtotal += (items[i].price || 0) * (items[i].quantity || 1);
  }
  subtotal = Math.round(subtotal * 100) / 100;

  const validDiscount = Math.max(0, Math.min(100, discountPercent || 0));
  const discountAmount = Math.round((subtotal * (validDiscount / 100)) * 100) / 100;
  
  let discountedSubtotal = Math.max(0, subtotal - discountAmount);
  discountedSubtotal = Math.round(discountedSubtotal * 100) / 100;

  const validTax = Math.max(0, taxPercent || 0);
  const taxAmount = Math.round((discountedSubtotal * (validTax / 100)) * 100) / 100;
  
  const grandTotal = Math.round((discountedSubtotal + taxAmount) * 100) / 100;

  return {
    subtotal: subtotal,
    discountedSubtotal: discountedSubtotal,
    taxAmount: taxAmount,
    grandTotal: grandTotal
  };
}`,
    testCases: [
      {
        name: 'Standard Cart with 20% discount & 10% tax',
        input: '([ { price: 50, quantity: 2 }, { price: 100, quantity: 1 } ], 20, 10)',
        evalStr: 'calculateCartTotal([ { price: 50, quantity: 2 }, { price: 100, quantity: 1 } ], 20, 10)',
        expected: {
          subtotal: 200,
          discountedSubtotal: 160,
          taxAmount: 16,
          grandTotal: 176,
        },
      },
      {
        name: 'Excessive Discount (120%) should Clamp Grand Total to 0',
        input: '([ { price: 40, quantity: 1 } ], 120, 10)',
        evalStr: 'calculateCartTotal([ { price: 40, quantity: 1 } ], 120, 10)',
        expected: {
          subtotal: 40,
          discountedSubtotal: 0,
          taxAmount: 0,
          grandTotal: 0,
        },
      },
      {
        name: 'Floating Point Precision (0.10 + 0.20 items with 5% tax)',
        input: '([ { price: 0.1, quantity: 1 }, { price: 0.2, quantity: 1 } ], 0, 5)',
        evalStr: 'calculateCartTotal([ { price: 0.1, quantity: 1 }, { price: 0.2, quantity: 1 } ], 0, 5)',
        expected: {
          subtotal: 0.3,
          discountedSubtotal: 0.3,
          taxAmount: 0.02,
          grandTotal: 0.32,
        },
      },
    ],
    weakSkill: 'Floating-Point Arithmetic & State Clamping',
    strongSkill: 'DOM Rendering & UI Event Handlers',
    learningResources: [
      {
        title: 'IEEE-754 Floating-point in JavaScript',
        source: 'MDN Web Docs',
        time: '7 min read',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number',
      },
      {
        title: 'Defensive State Transformation & Invariant Guards',
        source: 'Production React Patterns',
        time: '12 min read',
        url: 'https://react.dev/learn/updating-objects-in-state',
      },
    ],
  },

  'backend-auth': {
    id: 'backend-auth',
    title: 'JWT Expiration Skew & Payload Race Condition',
    department: 'Backend Systems',
    timeLimitSeconds: 300,
    difficulty: 'Production Context',
    concept: 'Clock Drift Tolerances & Payload Claim Validation',
    description: `A distributed API gateway authenticates microservices via bearer tokens.
Due to clock skew between AWS US-East and APAC edge servers (up to 3 seconds), tokens are expiring prematurely.
Furthermore, if a token has \`role: "admin"\`, but the \`revokedAt\` timestamp is prior to the current request, it still leaks admin privileges!

Fix \`verifyTokenPayload(tokenPayload, currentTimeSeconds, allowedDriftSeconds)\` to:
1. Accept token if \`currentTimeSeconds <= exp + allowedDriftSeconds\`.
2. Reject if token was issued in future beyond drift (\`iat > currentTimeSeconds + allowedDriftSeconds\`).
3. Reject if \`revokedAt\` exists and is <= \`currentTimeSeconds\`.
4. Return \`{ valid: true, role: tokenPayload.role }\` if authenticated, else \`{ valid: false, reason: 'EXPIRED' | 'REVOKED' | 'FUTURE_IAT' }\`.`,
    starterCode: `function verifyTokenPayload(payload, currentTimeSeconds, allowedDriftSeconds = 3) {
  // BUG: Clock skew not considered and string/number types unchecked
  if (!payload || !payload.exp) {
    return { valid: false, reason: 'INVALID' };
  }

  // BUG: Strict equality without drift allowance rejects edge workers
  if (currentTimeSeconds > payload.exp) {
    return { valid: false, reason: 'EXPIRED' };
  }

  // BUG: Missing check for future issued tokens (iat attack)
  // BUG: Ignores revokedAt timestamp completely!
  
  return {
    valid: true,
    role: payload.role || 'guest'
  };
}`,
    solutionSnippet: `function verifyTokenPayload(payload, currentTimeSeconds, allowedDriftSeconds = 3) {
  if (!payload || typeof payload.exp !== 'number') {
    return { valid: false, reason: 'INVALID' };
  }

  // Check future iat
  if (typeof payload.iat === 'number' && payload.iat > currentTimeSeconds + allowedDriftSeconds) {
    return { valid: false, reason: 'FUTURE_IAT' };
  }

  // Check revocation
  if (typeof payload.revokedAt === 'number' && payload.revokedAt <= currentTimeSeconds) {
    return { valid: false, reason: 'REVOKED' };
  }

  // Check expiration with clock skew allowance
  if (currentTimeSeconds > payload.exp + allowedDriftSeconds) {
    return { valid: false, reason: 'EXPIRED' };
  }

  return {
    valid: true,
    role: payload.role || 'guest'
  };
}`,
    testCases: [
      {
        name: 'Tolerate 2s clock skew on edge node',
        input: '({ exp: 1000, role: "developer" }, 1002, 3)',
        evalStr: 'verifyTokenPayload({ exp: 1000, role: "developer" }, 1002, 3)',
        expected: { valid: true, role: 'developer' },
      },
      {
        name: 'Block Revoked Token even before expiration',
        input: '({ exp: 2000, revokedAt: 1500, role: "admin" }, 1600, 3)',
        evalStr: 'verifyTokenPayload({ exp: 2000, revokedAt: 1500, role: "admin" }, 1600, 3)',
        expected: { valid: false, reason: 'REVOKED' },
      },
      {
        name: 'Reject Token issued 10 seconds in future',
        input: '({ iat: 1010, exp: 2000, role: "admin" }, 1000, 3)',
        evalStr: 'verifyTokenPayload({ iat: 1010, exp: 2000, role: "admin" }, 1000, 3)',
        expected: { valid: false, reason: 'FUTURE_IAT' },
      },
    ],
    weakSkill: 'Distributed Clock Skew & Auth Claim Invariants',
    strongSkill: 'REST API Routing & JSON Serialization',
    learningResources: [
      {
        title: 'RFC 7519: JSON Web Token (JWT) Timing Validations',
        source: 'IETF Standards',
        time: '8 min read',
        url: 'https://datatracker.ietf.org/doc/html/rfc7519',
      },
      {
        title: 'Preventing Replay & Clock Skew Vulnerabilities in Edge Auth',
        source: 'Cloudflare / AWS Security',
        time: '10 min read',
        url: 'https://owasp.org/www-project-top-ten/',
      },
    ],
  },

  'event-telemetry': {
    id: 'event-telemetry',
    title: 'EventBus Listener Leak & Sliding Deduplicator',
    department: 'Data / Distributed Systems',
    timeLimitSeconds: 300,
    difficulty: 'Production Context',
    concept: 'Sliding Window Memory Management & Deduplication',
    description: `A live telemetry server receives duplicate sensor packets due to UDP network retries.
The current dedup filter leaks memory because its cache grows infinitely, and it drops new packets if their sequence matches an old packet from 10 minutes ago.

Fix \`createDeduplicator(windowSizeMs)\` which returns an object with \`process(event)\`:
1. Each event is \`{ id: string, timestamp: number, payload: any }\`.
2. If an event with the same \`id\` was processed within \`timestamp - previousTimestamp <= windowSizeMs\`, drop it (return \`false\`).
3. If \`timestamp - previousTimestamp > windowSizeMs\` (or id is new), accept it (return \`true\`) and update the record.
4. Auto-prune entries older than current timestamp by more than \`windowSizeMs * 2\` to avoid memory leaks.`,
    starterCode: `function createDeduplicator(windowSizeMs = 500) {
  // BUG: Set stores IDs forever causing out-of-memory crash!
  const seenIds = new Set();

  return {
    process: function(event) {
      if (!event || !event.id) return false;
      
      // BUG: Never clears old IDs, causing events from 5 mins later with same id to be rejected!
      if (seenIds.has(event.id)) {
        return false;
      }
      
      seenIds.add(event.id);
      return true;
    }
  };
}`,
    solutionSnippet: `function createDeduplicator(windowSizeMs = 500) {
  const cache = new Map();

  return {
    process: function(event) {
      if (!event || !event.id || typeof event.timestamp !== 'number') return false;

      // Prune old entries
      for (const [id, prevTime] of cache.entries()) {
        if (event.timestamp - prevTime > windowSizeMs * 2) {
          cache.delete(id);
        }
      }

      if (cache.has(event.id)) {
        const lastTime = cache.get(event.id);
        if (event.timestamp - lastTime <= windowSizeMs) {
          return false; // Duplicate within window
        }
      }

      cache.set(event.id, event.timestamp);
      return true;
    }
  };
}`,
    testCases: [
      {
        name: 'Drop rapid duplicate packet within window (200ms gap <= 500ms)',
        input: 'Event 1 (t=1000) then Event 1 (t=1200)',
        evalStr: `(function() {
          const dedup = createDeduplicator(500);
          const first = dedup.process({ id: 'evt-1', timestamp: 1000 });
          const second = dedup.process({ id: 'evt-1', timestamp: 1200 });
          return { first, second };
        })()`,
        expected: { first: true, second: false },
      },
      {
        name: 'Allow same ID after window has expired (1000ms gap > 500ms)',
        input: 'Event 2 (t=1000) then Event 2 (t=2000)',
        evalStr: `(function() {
          const dedup = createDeduplicator(500);
          const first = dedup.process({ id: 'evt-2', timestamp: 1000 });
          const second = dedup.process({ id: 'evt-2', timestamp: 2000 });
          return { first, second };
        })()`,
        expected: { first: true, second: true },
      },
    ],
    weakSkill: 'Sliding Window Cache Eviction & Memory Leaks',
    strongSkill: 'Data Structure Manipulation & Hash Maps',
    learningResources: [
      {
        title: 'Sliding Window Deduplication in Distributed Streams',
        source: 'High Scalability Blog',
        time: '9 min read',
        url: 'https://en.wikipedia.org/wiki/Sliding_window_protocol',
      },
      {
        title: 'Memory Leaks in JavaScript Map & Closure Retainers',
        source: 'V8 Dev Guide',
        time: '11 min read',
        url: 'https://v8.dev/blog',
      },
    ],
  },
};

export const SAMPLE_RESUMES = {
  frontend_pro: {
    name: 'Aman Sharma (Frontend Specialist)',
    role: 'Frontend Engineering Fresher',
    rawText: `AMAN SHARMA
Email: aman.sharma@college.edu | GitHub: github.com/amansharma | Portfolio: amandev.io

EDUCATION
B.Tech in Computer Science & Engineering | CGPA: 8.7/10 | 2021 - 2025

TECHNICAL SKILLS
Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3, Python
Frameworks & Libraries: React 18/19, Next.js 14, Redux Toolkit, TailwindCSS, Framer Motion, Three.js
Tools & Platforms: Git, Vite, Webpack, Chrome DevTools Profiler, Jest, Cypress, Vercel

PROJECTS
1. HyperCommerce Micro-Frontend Engine (React, TypeScript, Redux)
- Built high-performance checkout flow with optimistic state updates and zero layout shift.
- Reduced initial JS bundle size by 42% via dynamic route splitting and code chunking.
- Implemented real-time cart state reconciliation avoiding race conditions in async promo code validation.

2. DevPulse - Realtime Performance Monitor (Next.js, WebSockets, Canvas)
- Visualized Core Web Vitals (LCP, CLS, FID) in a custom interactive Canvas dashboard.
- Engineered offline-first caching strategy utilizing Service Workers and IndexedDB.

EXPERIENCE
Frontend Developer Intern | NeoTech Labs (May 2024 - July 2024)
- Fixed 14 production UI state synchronization bugs in multi-tenant SaaS dashboard.
- Maintained 95%+ test coverage across 20+ reusable React UI components.`,
  },

  backend_pro: {
    name: 'Priya Verma (Backend & Cloud)',
    role: 'Backend Systems Fresher',
    rawText: `PRIYA VERMA
Email: priya.verma@college.edu | LinkedIn: linkedin.com/in/priya-backend | GitHub: github.com/priyav

EDUCATION
B.Tech in Computer Science | CGPA: 9.1/10 | 2021 - 2025

TECHNICAL SKILLS
Languages: Node.js, JavaScript, Python, Go, SQL
Databases & Cache: PostgreSQL, MongoDB, Redis, Prisma ORM
Cloud & DevOps: Docker, Kubernetes, AWS (S3, EC2, Lambda), GitHub Actions, Nginx
System Design: RESTful APIs, WebSockets, Rate Limiting, JWT Authentication, Microservices

PROJECTS
1. Distributed Idempotent Payment Processor (Node.js, Redis, PostgreSQL)
- Designed atomic token-bucket rate limiter handling 2,500 req/sec without latency spikes.
- Implemented distributed locking via Redis Redlock to prevent double-charging in concurrent transactions.
- Wrote integration tests using Supertest and Jest, achieving 98% test pass reliability.

2. CloudMesh - Edge Reverse Proxy & Cache Invalidation (Go, Docker)
- Built lightweight HTTP reverse proxy with least-connections load balancing and LRU cache.
- Orchestrated container deployment using Kubernetes manifests and automated GitHub Actions CI/CD.`,
  },

  generic_fresher: {
    name: 'Rohan Gupta (Generic Resume - Needs Work)',
    role: 'B.Tech Fresher (Generic)',
    rawText: `ROHAN GUPTA
Contact: 9876543210 | Email: rohan.cooldev@gmail.com

OBJECTIVE
Looking for a challenging position in a reputed IT company where I can utilize my skills to contribute to organization growth.

EDUCATION
B.Tech (CSE) - 2025 passing out. 72% marks.
12th Standard - CBSE Board. 75% marks.

SKILLS
C, C++, Java, HTML, CSS, JavaScript, Hardworking, Good communication, Quick learner, MS Office.

PROJECTS
1. Library Management System
- Made in Java and MySQL.
- Can add books, issue books, and return books.
- Has admin login screen.

2. Personal Portfolio Website
- Made with HTML, CSS, and basic JavaScript.
- Shows my bio and contact form.

HOBBIES
Playing cricket, listening to music, watching tech reviews.`,
  },
};

export const JUDGE_BATTLE_CARDS = [
  {
    id: 'counter-1',
    number: '01',
    badge: 'Core Differentiation',
    question: 'HackerRank aur Unstop bhi to test lete hain, unse alag kya hai?',
    answer: `Sir, HackerRank aur Unstop "Reverse a String" ya LeetCode DSA puchte hain, jise ChatGPT-4o ek second me solve kar deta hai.

Hamara InternForge syntax memorization nahi, "Live Contextual Bug Fixing" test karta hai — jaise broken frontend state closure ya API payload glitch.

Iska internet par direct generic solution exist nahi karta, isme human contextual intelligence lagti hai jo candidate ke real production-debugging reflexes ko verify karta hai.`,
    proofMetric: 'Zero Syntactic LeetCode / 100% Contextual Glitch Sandboxes',
    testTriggerType: 'bug-engine',
  },
  {
    id: 'counter-2',
    number: '02',
    badge: 'Anti-Cheat Hardware Loophole',
    question: 'Agar student laptop ke bagal me mobile phone rakh kar camera/prompt se solve kar raha ho, tab tumhara tab-switch kaise pakdega?',
    answer: `Sir, isliye humara Tier-2 defense hai: Hyper-Time-Boxing (5 mins) + Keystroke Flight Dynamics.

1. Task itna fast-paced hota hai ki phone me prompt type karke answer padhne me hi timer freeze ho jayega.
2. Human natural typing me 150-250ms ka key variance hota hai. Agar koi phone se dekh kar abnormal pause ke baad achanak block paste ya unnatural typing karta hai, to system ka Candidate Integrity Index automatically drop ho jata hai.`,
    proofMetric: 'Keystroke Latency Variance & Clipboard Burst Sensor',
    testTriggerType: 'flight-dynamics',
  },
  {
    id: 'counter-3',
    number: '03',
    badge: 'False Positive Protection',
    question: 'Galti se mouse bahar chala gaya ya internet flick hua to kya bacha disqualify ho jayega?',
    answer: `Nahi sir! Hum direct disqualify nahi karte. Hum "Integrity Confidence Decay Curve" use karte hain.

1-2 momentary lapses yellow warning toast dete hain taaki innocent candidate affect na ho.
Hard penalty tabhi lagti hai jab long focus-loss ke baad instantaneous bulk code mutation detect ho.`,
    proofMetric: 'Progressive Decay Curve with 3-Tier Grace Tolerance',
    testTriggerType: 'decay-curve',
  },
  {
    id: 'counter-4',
    number: '04',
    badge: 'The Corporate Reality Masterstroke',
    question: 'Judge ko Chup Karane Wala Masterstroke (Corporate Reality)',
    answer: `Sir, aaj Google aur Microsoft me bhi developers GitHub Copilot aur Cursor use karte hain.

Hamara goal ye rokna nahi hai ki bacha AI use na kare, balki ye dekhna hai ki kya bacha problem ko samajhkar 3-5 minute me debug kar sakta hai?

Hum syntax ratne wale nahi, fast problem-solvers ko companies se match kar rahe hain. Jo 3 minute me debug kar sakta hai, wahi real engineer hai!`,
    proofMetric: 'AI-Augmented Problem Agility > Rote Memorization',
    testTriggerType: 'corporate-masterstroke',
  },
];
