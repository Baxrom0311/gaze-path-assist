export const en = {
  nav: {
    home: "Home",
    demo: "Demo",
    cta: "Try Prototype",
  },
  brand: {
    name: "EyeTracking",
    tagline: "Empowering voices through gaze",
  },
  hero: {
    eyebrow: "Assistive AI from Uzbekistan",
    title: "Speak with your eyes.",
    titleAccent: "No hands needed.",
    subtitle: "EyeTracking turns any Android tablet into an AAC communication device — controlled entirely by gaze. For people with ALS, cerebral palsy, SMA, and other motor disabilities.",
    ctaPrimary: "View Live Prototype",
    ctaSecondary: "Watch Demo",
  },
  problemSolution: {
    sectionLabel: "The Mission",
    problemTitle: "The Problem",
    problemBody: "Millions of people with ALS, cerebral palsy, spinal muscular atrophy, and other motor disabilities cannot use standard devices. They are isolated from communication, education, and independence.",
    problemStats: [
      { value: "5M+", label: "people worldwide need AAC tools" },
      { value: "0", label: "AAC apps available natively in Uzbek" },
      { value: "$15K+", label: "cost of dedicated eye-tracking hardware" },
    ],
    solutionTitle: "Our Solution",
    solutionBody: "EyeTracking uses the front camera of any tablet to detect eye gaze in real-time using AI (MediaPipe + a custom ML model). Users navigate an AAC symbol board just by looking — no hands, no voice needed.",
    solutionPoints: [
      "Works on standard Android tablets",
      "Real-time gaze detection with MediaPipe",
      "Multilingual TTS: Uzbek, Russian, English",
      "Caregiver-customizable symbol board",
    ],
  },
  team: {
    sectionLabel: "The Team",
    title: "Four people. One mission.",
    subtitle: "A multidisciplinary team combining AI engineering, design, and accessibility expertise.",
    members: [
      {
        name: "Jasur",
        role: "Product Lead & AI Engineer",
        skills: ["Python", "MediaPipe", "TensorFlow Lite"],
        stack: "AI/ML · Mobile",
      },
      {
        name: "Dilnoza",
        role: "UX/UI Designer",
        skills: ["Figma", "User Research", "Accessibility Design"],
        stack: "Design Systems",
      },
      {
        name: "Bobur",
        role: "Frontend Developer",
        skills: ["React Native", "JavaScript", "WebRTC"],
        stack: "Mobile · Web",
      },
      {
        name: "Nodira",
        role: "Backend Developer",
        skills: ["Node.js", "Firebase", "REST API"],
        stack: "Cloud · Backend",
      },
    ],
  },
  whyTeam: {
    sectionLabel: "Why Us",
    title: "Why our team can solve this",
    points: [
      {
        title: "Personal connection",
        body: "Several team members have family or community ties to people living with motor disabilities in Central Asia. This isn't just a project — it's personal.",
      },
      {
        title: "Combined expertise",
        body: "AI/ML engineering, accessibility-first UX, native mobile, and cloud backend — all under one roof.",
      },
      {
        title: "Working prototype",
        body: "We don't pitch ideas. We pitch shipped code. Try it live at eyetracking.boos.uz today.",
      },
      {
        title: "Local market understanding",
        body: "Uzbekistan has zero AAC tools available natively in Uzbek. We're closest to the users, the clinicians, and the language.",
      },
    ],
  },
  roadmap: {
    sectionLabel: "Roadmap",
    title: "Where we are. Where we're going.",
    stages: [
      { icon: "💡", name: "Idea", status: "Done", description: "Identified the problem, researched Tobii Dynavox and similar tools, defined scope." },
      { icon: "🔧", name: "Prototype", status: "Current", description: "Eye gaze detection working via front camera, basic AAC symbol board, tested on Android tablet." },
      { icon: "🚀", name: "MVP", status: "Upcoming", description: "Multilingual AAC board (UZ/RU), offline mode, caregiver dashboard, clinic partnerships." },
      { icon: "🌍", name: "Launched", status: "Future", description: "App store release, NGO partnerships, integration with Uzbek rehabilitation centers." },
    ],
    statusLabels: { done: "Done", current: "In Progress", upcoming: "Upcoming", future: "Future" },
  },
  implementation: {
    sectionLabel: "How We Build It",
    title: "Implementation Plan",
    subtitle: "Five focused steps from camera input to clinic deployment.",
    steps: [
      {
        title: "Eye Tracking Engine",
        items: [
          "Technology: MediaPipe Face Mesh (468 landmarks), custom gaze calibration",
          "AI Tools: TensorFlow Lite for on-device inference",
          "Platform: Android (React Native + native module)",
        ],
      },
      {
        title: "AAC Symbol Board",
        items: [
          "Grid of 12–48 symbols (expandable)",
          "Dwell-time selection (look at a symbol for X ms to select)",
          "Text-to-speech output in Uzbek, Russian, English",
        ],
      },
      {
        title: "Calibration System",
        items: [
          "5-point gaze calibration on first use",
          "Adaptive recalibration based on session drift",
        ],
      },
      {
        title: "Caregiver Dashboard",
        items: [
          "Web interface for caregivers to customize symbol boards",
          "Usage analytics, session history",
        ],
      },
      {
        title: "Deployment",
        items: [
          "Firebase backend",
          "Offline-first architecture",
          "Targeted at rehabilitation centers and NGOs in Uzbekistan",
        ],
      },
    ],
  },
  demoPage: {
    eyebrow: "Live Demo",
    title: "See EyeTracking in action.",
    subtitle: "A short walkthrough of gaze calibration, dwell selection, and text-to-speech.",
    videoPlaceholder: "Demo video coming soon — 1–5 min walkthrough",
    descriptionTitle: "What you'll see",
    description: "In this demo, you will see a person with limited motor ability using only their eye movements to navigate an AAC communication board on a standard Android tablet. The front camera detects the user's gaze in real time using our AI model. By dwelling (looking) on a symbol for 1.5 seconds, the user selects it and the app speaks the word aloud. The demo showcases: gaze calibration (5-point setup), symbol selection via dwell time, text-to-speech output in Uzbek, and the basic caregiver customization panel. No special hardware is required — just any Android tablet with a front camera.",
    prototypeTitle: "Try it yourself",
    prototypeBody: "The working prototype is live and free to try right now in your browser.",
    prototypeCta: "View Live Prototype →",
  },
  footer: {
    tagline: "Empowering voices through gaze",
    links: "Links",
    demo: "Demo",
    github: "GitHub",
    prototype: "Live Prototype",
    rights: "All rights reserved.",
  },
  chat: {
    title: "Ask EyeTracking AI",
    subtitle: "Powered by Claude",
    placeholder: "Ask anything about the product...",
    send: "Send",
    suggestions: [
      "How does the eye tracking work?",
      "What devices does it support?",
      "How can I partner with you?",
    ],
    welcome: "Hi! I'm EyeTracking's AI assistant. Ask me anything about the product, team, or roadmap.",
    error: "Sorry, something went wrong. Please try again.",
    rateLimit: "Too many requests. Please wait a moment.",
  },
  theme: { light: "Light", dark: "Dark" },
};
