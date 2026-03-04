// Services Data
export const SERVICES = [
  {
    id: "penetration-testing",
    title: "Penetration Testing",
    slug: "penetration-testing",
    description: "Comprehensive security assessments to identify vulnerabilities",
    icon: "Shield",
    shortDescription: "External & Internal Network Testing"
  },
  {
    id: "cloud-security",
    title: "Cloud Security",
    slug: "cloud-security",
    description: "Secure your cloud infrastructure and applications",
    icon: "Cloud",
    shortDescription: "AWS, Azure, GCP Security Assessment"
  },
  {
    id: "incident-response",
    title: "Incident Response",
    slug: "incident-response",
    description: "Rapid response and forensic investigation services",
    icon: "AlertCircle",
    shortDescription: "24/7 Incident Response & Forensics"
  },
  {
    id: "vulnerability-assessment",
    title: "Vulnerability Assessment",
    slug: "vulnerability-assessment",
    description: "Identify and prioritize security vulnerabilities",
    icon: "Bug",
    shortDescription: "Automated & Manual Scanning"
  },
  {
    id: "security-audit",
    title: "Security Audit",
    slug: "security-audit",
    description: "Comprehensive security policy and control audits",
    icon: "CheckSquare",
    shortDescription: "Compliance & Control Assessment"
  },
  {
    id: "red-team-operations",
    title: "Red Team Operations",
    slug: "red-team-operations",
    description: "Advanced adversarial testing and threat simulation",
    icon: "Target",
    shortDescription: "Advanced Persistent Threat Simulation"
  }
];

// Course Categories
export const COURSE_LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;

export const COURSE_CATEGORIES = [
  "Networking",
  "Web Security",
  "Malware Analysis",
  "Cloud Security",
  "Compliance",
  "Incident Response"
] as const;

// Navigation Links
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/academy", label: "Academy" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/contact", label: "Contact" }
];

// Footer Links
export const FOOTER_LINKS = {
  product: [
    { href: "/services", label: "Services" },
    { href: "/academy", label: "Academy" },
    { href: "/pricing", label: "Pricing" }
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/blog", label: "Blog" },
    { href: "/careers", label: "Careers" }
  ],
  legal: [
    { href: "/legal/privacy-policy", label: "Privacy Policy" },
    { href: "/legal/terms-of-service", label: "Terms of Service" },
    { href: "/legal/cookie-policy", label: "Cookie Policy" }
  ],
  contact: [
    { href: "mailto:hello@omnitrust.africa", label: "hello@omnitrust.africa" },
    { href: "https://wa.me/254712345678", label: "WhatsApp" },
    { href: "https://calendly.com/omnitrust", label: "Book a Call" }
  ]
};

// Social Media Links
export const SOCIAL_LINKS = [
  { name: "LinkedIn", href: "https://linkedin.com/company/omnitrust-africa", icon: "Linkedin" },
  { name: "Twitter", href: "https://twitter.com/omnitrust_africa", icon: "Twitter" },
  { name: "GitHub", href: "https://github.com/omnitrust-africa", icon: "Github" },
  { name: "WhatsApp", href: "https://wa.me/254712345678", icon: "MessageCircle" }
];

// Statistics
export const STATS = [
  { label: "Security Assessments Completed", value: "250+" },
  { label: "Vulnerabilities Identified", value: "5,000+" },
  { label: "Courses Launched", value: "12" },
  { label: "Students Trained", value: "1,200+" },
  { label: "Enterprise Clients", value: "80+" },
  { label: "Years in Business", value: "5+" }
];

// Team Members
export const TEAM = [
  {
    id: "alice-omondi",
    name: "Alice Omondi",
    title: "CEO & Founder",
    bio: "OSCP, GWAPT certified security expert with 10+ years in cybersecurity",
    image: "/images/team/alice.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/alice-omondi",
      twitter: "https://twitter.com/alice_omondi"
    }
  },
  {
    id: "james-kipchoge",
    name: "James Kipchoge",
    title: "Director of Security Operations",
    bio: "CEH, GIAC certified with expertise in incident response",
    image: "/images/team/james.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/james-kipchoge"
    }
  }
];

// Testimonials
export const TESTIMONIALS = [
  {
    id: 1,
    author: "Sarah Johnson",
    company: "TechCorp Kenya",
    role: "Chief Information Officer",
    content: "OmniTrust's penetration testing services revealed critical vulnerabilities we didn't know we had. Their professional approach and detailed reporting made remediation straightforward.",
    rating: 5
  },
  {
    id: 2,
    author: "David Mwangi",
    company: "FinanceFlow Ltd",
    role: "Security Director",
    content: "Their cloud security assessment saved us from potential compliance violations. Highly recommended for any organization serious about security.",
    rating: 5
  },
  {
    id: 3,
    author: "Emma Njeri",
    company: "HealthTech Africa",
    role: "IT Manager",
    content: "The academy courses are invaluable. Our team has significantly improved their security knowledge and can now handle security incidents independently.",
    rating: 5
  }
];

// Company Info
export const COMPANY_INFO = {
  name: "OmniTrust Africa",
  tagline: "Securing African Digital Innovation",
  description: "A leading cybersecurity company specializing in penetration testing, vulnerability assessment, and security training for enterprises across East Africa.",
  foundedYear: 2018,
  location: "Nairobi, Kenya",
  email: "hello@omnitrust.africa",
  phone: "+254 (0) 712 345 678",
  website: "https://omnitrust.africa",
  socialLinks: SOCIAL_LINKS
};

// Pricing & Payment Methods
export const PAYMENT_METHODS = [
  { id: "stripe", name: "Credit Card (Stripe)", icon: "CreditCard" },
  { id: "flutterwave", name: "Flutterwave", icon: "Zap" },
  { id: "mpesa", name: "M-Pesa", icon: "DollarSign" },
  { id: "bank", name: "Bank Transfer", icon: "DollarSign" }
];

// Blog Settings
export const BLOG_POSTS_PER_PAGE = 10;
export const POSTS_PER_CATEGORY = 5;
