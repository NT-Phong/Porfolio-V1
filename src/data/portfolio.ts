// ─── Portfolio Data: Nguyễn Thành Phong ───────────────────────────────────────
// Source: CV extracted from Intern .NET Dev 2.pdf

export const OWNER = {
  name: 'Nguyễn Thành Phong',
  nameEn: 'Nguyen Thanh Phong',
  alias: 'PhongDev',
  role: 'Full-Stack Developer',
  roleShort: 'DEVELOPER',
  email: 'phongg.dev@gmail.com',
  phone: '(+84) 034 565 1206',
  location: 'Thủ Đức, TP. Hồ Chí Minh',
  dob: '21/07/2003',
  github: 'github.com/phongdev',
  tagline: 'Building performant web apps with clean architecture & modern stacks.',
  summary:
    "I'm a proactive developer with practical experience in .NET & Full-Stack development, focusing on ASP.NET Core, C#, ReactJS, and Node.js. I've built RESTful APIs, integrated secure payment systems, and applied SOLID principles across multiple real-world projects.",
} as const;

export const EDUCATION = {
  university: 'Trường Đại học Công nghệ TP.HCM (HUTECH)',
  universityEn: 'Ho Chi Minh City University of Technology (HUTECH)',
  major: 'Công nghệ Thông tin',
  majorEn: 'Information Technology',
  gpa: '3.54 / 4.00',
  period: '10/2021 – 01/2025',
} as const;

export const SKILLS = {
  backend: ['C#', 'ASP.NET Core', 'Node.js / Express.js', 'Python', 'Java', 'Spring Boot'],
  frontend: ['ReactJS', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Bootstrap'],
  databases: ['SQL Server', 'MySQL', 'MongoDB', 'SQLite'],
  tools: ['Git', 'GitHub', 'AWS (EC2, S3)', 'Cypress (E2E)', 'Agile / Scrum'],
} as const;

export const PROJECTS = [
  {
    id: 'mangasmurf',
    name: 'MangaSmurf',
    subtitle: 'Comic Reading Platform',
    period: '08/2024 – 12/2024',
    role: 'Team Leader & Main Developer',
    stack: ['ASP.NET Core', 'jQuery', 'Ajax', 'Bootstrap', 'Flask (Python)'],
    description:
      'A modern manga-reading platform recognized for its creative approach, user-friendly design, and practical features.',
    highlights: [
      'Authentication with ASP.NET Identity + Google/Facebook OAuth',
      'RBAC-based authorization for secure role-permission management',
      'VNPay integration for secure online payment processing',
      'Email notifications: invoices, password recovery',
      'Recommendation engine with Python similarity-based models',
    ],
    github: 'github.com/phongdev/Mangasmurf',
    demoUrl: 'https://github.com/phongdev/Mangasmurf',
    videoUrl: '/assets/videos/Video3.mp4',
    tag: 'Full-Stack · .NET',
    accent: 'orange',
    layout: 'wide',
    image: '/assets/images/mangasmurf_mockup.png'
  },
  {
    id: 'timtro24h',
    name: 'TimTro24h',
    subtitle: 'Room Rental Finder Web App',
    period: '01/2025 – 04/2025',
    role: 'Team Leader & Main Developer',
    stack: ['Node.js', 'MongoDB', 'ReactJS', 'Google Maps API'],
    description:
      'A platform helping students and young professionals efficiently search for rental rooms with speed, accuracy, and great UX.',
    highlights: [
      'RESTful APIs with Node.js for auth, room listings, user interactions',
      'Google Maps API integration for map-based room discovery',
      'SMTP email service for feedback and password recovery',
      'E2E automated tests with Cypress for key user flows',
    ],
    github: 'github.com/phongdev/timtro24h',
    demoUrl: 'https://github.com/phongdev/timtro24h',
    videoUrl: '/assets/videos/Video1.mp4',
    tag: 'Full-Stack · MERN',
    accent: 'cyan',
    layout: 'tall',
    image: '/assets/images/timtro24h_mockup.png'
  },
  {
    id: 'awscloud',
    name: 'AWS Cloud Infrastructure',
    subtitle: 'Cloud Deployment & Networking',
    period: '06/2025 – 08/2025',
    role: 'Cloud Engineer Intern',
    stack: ['AWS EC2', 'AWS S3', 'VPC', 'IAM', 'Scrum/Agile'],
    description:
      'Xây dựng và tối ưu hóa cơ sở hạ tầng đám mây AWS cho các dịch vụ backend, cải thiện độ trễ và khả năng chịu tải.',
    highlights: [
      'Triển khai các EC2 instances trong mạng VPC bảo mật',
      'Tích hợp AWS S3 để lưu trữ tệp và assets tĩnh hiệu năng cao',
      'Phân quyền IAM chính xác đảm bảo nguyên tắc bảo mật tối thiểu',
      'Làm việc trong môi trường Scrum/Agile chuyên nghiệp tại DEK Technologies',
    ],
    github: 'github.com/phongdev/aws-cloud-infrastructure',
    demoUrl: 'https://github.com/phongdev/aws-cloud-infrastructure',
    videoUrl: '/assets/videos/Video2.mp4',
    tag: 'Cloud · DevOps',
    accent: 'cyan',
    layout: 'normal',
    image: '/assets/images/aws_cloud_mockup.png'
  },
  {
    id: 'portfolio3d',
    name: '3D Interactive Portfolio',
    subtitle: 'Immersive Digital Experience',
    period: '09/2025 – NOW',
    role: 'Freelance Developer',
    stack: ['React 19', 'TypeScript', 'GSAP', 'Spline 3D', 'Vite'],
    description:
      'Trang portfolio cá nhân thế hệ mới với mô hình 3D tương tác thời gian thực, chuyển động cuộn cinematic.',
    highlights: [
      'Tích hợp mô hình Spline 3D tương tác mượt mà theo cử chỉ chuột',
      'Thiết lập chuỗi chuyển động kể chuyện (Scroll Storytelling) với GSAP',
      'Tối ưu hóa GPU render đạt hiệu năng mượt mà 60fps trên di động',
      'Bố cục Bento Grid bất đối xứng kết hợp hiệu ứng kính mờ glassmorphism',
    ],
    github: 'github.com/phongdev/3d-interactive-portfolio',
    demoUrl: 'https://github.com/phongdev/3d-interactive-portfolio',
    videoUrl: '/assets/videos/Video2.mp4',
    tag: 'Frontend · Motion',
    accent: 'orange',
    layout: 'normal',
    image: '/assets/images/portfolio_mockup.png'
  }
] as const;

export const EXPERIENCE = [
  {
    company: 'HUTECH University (Academic Projects)',
    role: 'Full-Stack Developer & Team Lead',
    period: '10/2021 – 01/2025',
    description: 'Bắt đầu hành trình lập trình và lãnh đạo nhóm phát triển các dự án lớn như MangaSmurf (Comic platform với ASP.NET Core) và TimTro24h (MERN stack). Thực hiện thiết kế hệ thống, tích hợp cổng thanh toán VNPay, và viết kịch bản kiểm thử tự động Cypress.',
    skills: ['ASP.NET Core', 'ReactJS', 'Node.js', 'Cypress', 'MongoDB'],
    year: '2021',
  },
  {
    company: 'DEK Technologies Vietnam (AWS Project)',
    role: 'Cloud Engineer Intern',
    period: '06/2025 – 08/2025',
    description: 'Đóng vai trò kỹ sư Cloud xây dựng và tích hợp các dịch vụ backend với AWS để tăng trải nghiệm sản phẩm và khắc phục lỗi dự án. Làm việc trong môi trường Scrum/Agile chuyên nghiệp.',
    skills: ['AWS EC2', 'S3', 'Backend Integration', 'Agile / Scrum'],
    year: '2025',
  },
  {
    company: 'Freelance & Self-directed Learning',
    role: 'Freelance Full-Stack Developer',
    period: '09/2025 – NOW',
    description: 'Thiết kế & phát triển các ứng dụng web chất lượng cao, các trang portfolio cá nhân tương tác 3D mượt mà cho khách hàng. Nghiên cứu sâu về GSAP, WebGL, và các giải pháp tối ưu hóa hiệu năng render UI.',
    skills: ['React 19', 'TypeScript', 'GSAP Motion', 'Spline 3D', 'CSS Tech'],
    year: 'NOW',
  },
] as const;

export const CERTIFICATIONS = [
  {
    name: 'Agile & Scrum Training',
    issuer: 'DEK Technologies Vietnam',
    date: 'June 2022',
  },
  {
    name: 'English Certificate – CEFR Level B1',
    issuer: 'HUTECH University',
    date: 'January 2025',
  },
] as const;
