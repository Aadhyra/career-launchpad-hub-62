export const SITE_URL = "https://career-launchpad-hub-62.lovable.app";
export const SITE_NAME = "AADHYRA INNOVATIONS PVT LTD";

export const publicPages: Record<string, { title: string; description: string }> = {
  "/": { title: "Software Development, Training & Internships", description: "AADHYRA INNOVATIONS PVT LTD provides software development, AI solutions, professional training, internships, recruitment and career support." },
  "/about": { title: "About Aadhyra Innovations", description: "Meet AADHYRA INNOVATIONS PVT LTD: technology solutions, practical learning and career support for students, professionals and businesses." },
  "/courses": { title: "Professional Training Courses", description: "Explore IT, HR, digital marketing, graphic design and nursing training. Compare programs, fees and learning opportunities at Aadhyra Innovations." },
  "/courses/it": { title: "IT Training Courses", description: "Explore technology training in Java, Python, AI, cloud and software development at Aadhyra Innovations." },
  "/courses/hr": { title: "HR Training Courses", description: "Explore HR generalist, recruitment and payroll training with practical learning at Aadhyra Innovations." },
  "/courses/digital-marketing": { title: "Digital Marketing Training", description: "Explore SEO, social media, advertising and analytics training at Aadhyra Innovations." },
  "/courses/graphic-design": { title: "Graphic Design Training", description: "Explore graphic design and UI/UX training at Aadhyra Innovations." },
  "/courses/nursing": { title: "Nursing Training", description: "Explore nursing and clinical skills training opportunities at Aadhyra Innovations." },
  "/courses/degree-diploma": { title: "Degree & Diploma Programs", description: "Explore degree and diploma programs, eligibility and program details at Aadhyra Innovations." },
  "/internships": { title: "Professional Internship Programs", description: "Explore internships across technology, HR, marketing, design and healthcare. Review fees, tasks and completion requirements before applying." },
  "/hr-training": { title: "HR Training & Practical Tasks", description: "Explore HR training, recruitment skills and practical task-based learning at Aadhyra Innovations." },
  "/placement": { title: "Recruitment & Placement Support", description: "Explore recruitment, career preparation and placement support for freshers, professionals and employers at Aadhyra Innovations." },
  "/careers": { title: "Careers & Candidate Assessments", description: "Explore careers at Aadhyra Innovations, open positions and the technical, practical and HR candidate assessment process." },
  "/career": { title: "Job Openings", description: "Browse job opportunities and application details for freshers and experienced candidates at Aadhyra Innovations." },
  "/campus-drive": { title: "Campus Hiring & College Partnerships", description: "Connect your college with Aadhyra Innovations for campus hiring, training and student career opportunities." },
  "/services": { title: "Software & Business Technology Services", description: "Explore software development, AI, cloud, analytics, cybersecurity, CRM and web and mobile solutions for your business." },
  "/services/ai": { title: "AI Solutions & Automation", description: "Explore AI chatbots, machine learning and business automation services from Aadhyra Innovations." },
  "/services/cloud": { title: "Cloud & Enterprise Solutions", description: "Explore cloud migration, SaaS platforms and enterprise integration services from Aadhyra Innovations." },
  "/services/data-analytics": { title: "Data Analytics & Business Intelligence", description: "Explore analytics, business intelligence and data visualization services from Aadhyra Innovations." },
  "/services/cyber-security": { title: "Cybersecurity Services", description: "Explore network security, data protection and cybersecurity solutions from Aadhyra Innovations." },
  "/services/web-mobile": { title: "Web & Mobile Development", description: "Explore website, web application, mobile app and e-commerce development from Aadhyra Innovations." },
  "/services/crm": { title: "CRM & Sales Solutions", description: "Explore CRM software, lead management and sales pipeline solutions from Aadhyra Innovations." },
  "/services/r-suite": { title: "R Product Suite", description: "Explore business tools for communication, automation and customer operations from Aadhyra Innovations." },
  "/placement/talent-connect": { title: "AADHYRA TALENT CONNECT", description: "Explore talent connections, recruitment and candidate career services with Aadhyra Innovations." },
  "/placement/tech-partner": { title: "AADHYRA TECH PARTNER", description: "Explore technology projects and professional collaboration with AADHYRA TECH PARTNER." },
  "/placement/health-connect": { title: "AADHYRA HEALTH CONNECT", description: "Explore healthcare services and AI-assisted health tools with AADHYRA HEALTH CONNECT." },
  "/placement/ai-lab": { title: "AADHYRA LAB", description: "Explore AI-assisted creation and technology tools with AADHYRA LAB." },
  "/contact": { title: "Contact Aadhyra Innovations", description: "Contact Aadhyra Innovations about courses, internships, recruitment, campus partnerships and business technology services." },
};

export function getPageSeo(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const page = publicPages[path];
  return { path, title: page ? `${page.title} | ${SITE_NAME}` : SITE_NAME, description: page?.description ?? publicPages["/"].description, indexable: Boolean(page) };
}