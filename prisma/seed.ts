import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding with REAL portfolio data...\n');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.contactRequest.deleteMany();
  await prisma.newsletter.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.recommendation.deleteMany();
  await prisma.education.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.project.deleteMany();
  await prisma.socialLink.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.content.deleteMany();
  console.log('✅ Cleared existing data\n');

  // Seed Profile (Using real data from Profile.ts)
  console.log('👤 Seeding Profile...');
  const profile = await prisma.profile.create({
    data: {
      name: 'Baraa Alshaer',
      title: 'Full-Stack Developer',
      headline: 'Software Engineer | Full-Stack Developer',
      bio: "I'm a full stack developer with 5 years of experience in front-end, back-end, and general software development. My main focus is integrating AI technologies to build smarter, more efficient web applications. I excel at creating clean, maintainable code and designing user-friendly solutions that solve real-world problems. Dedicated to continuous learning, I stay up to date with the latest trends in AI and modern development to deliver innovative, high-quality software.",
      email: 'alshaer.contact@gmail.com',
      phone: '+970599349034',
      location: 'Gaza Strip, Palestine',
      avatar: 'https://cdn.dribbble.com/userupload/14186516/file/original-302bcec5d5a7d2bae6c18ee8cabc5f37.png?resize=400x400',
      availableForWork: true,
      yearsOfExperience: 5,
    },
  });
  console.log('✅ Profile created\n');

  // Seed Social Links (Using real data from SocialLinks.ts)
  console.log('🔗 Seeding Social Links...');
  const socialLinks = await prisma.socialLink.createMany({
    data: [
      {
        name: 'GitHub',
        platform: 'github',
        url: 'https://github.com/balshaer',
        icon: 'FaGithub',
        order: 1,
        visible: true,
      },
      {
        name: 'LinkedIn',
        platform: 'linkedin',
        url: 'https://www.linkedin.com/in/balshaer/',
        icon: 'FaLinkedin',
        order: 2,
        visible: true,
      },
      {
        name: 'YouTube',
        platform: 'youtube',
        url: 'https://www.youtube.com/@Codewithbaraa',
        icon: 'FaYoutube',
        order: 3,
        visible: true,
      },
      {
        name: 'Email',
        platform: 'email',
        url: 'mailto:alshaer.contact@gmail.com',
        icon: 'FaEnvelope',
        order: 4,
        visible: true,
      },
      {
        name: 'WhatsApp',
        platform: 'whatsapp',
        url: 'https://wa.me/970599349034',
        icon: 'FaWhatsapp',
        order: 5,
        visible: true,
      },
    ],
  });
  console.log(`✅ Created ${socialLinks.count} social links\n`);

  // Seed Skills (Using real data from Profile.ts)
  console.log('💪 Seeding Skills...');
  const skills = await prisma.skill.createMany({
    data: [
      // Languages
      { name: 'JavaScript', category: 'Languages', level: 95, icon: 'SiJavascript', order: 1 },
      { name: 'TypeScript', category: 'Languages', level: 90, icon: 'SiTypescript', order: 2 },
      { name: 'Python', category: 'Languages', level: 80, icon: 'FaPython', order: 3 },
      { name: 'Java', category: 'Languages', level: 75, icon: 'FaJava', order: 4 },
      
      // Frontend
      { name: 'React.js', category: 'Frontend', level: 95, icon: 'FaReact', order: 5 },
      { name: 'Next.js', category: 'Frontend', level: 90, icon: 'SiNextdotjs', order: 6 },
      { name: 'Tailwind CSS', category: 'Frontend', level: 90, icon: 'SiTailwindcss', order: 7 },
      { name: 'Bootstrap', category: 'Frontend', level: 85, icon: 'FaBootstrap', order: 8 },
      { name: 'SASS', category: 'Frontend', level: 85, icon: 'FaSass', order: 9 },
      
      // Backend
      { name: 'Node.js', category: 'Backend', level: 90, icon: 'FaNode', order: 10 },
      { name: 'Express.js', category: 'Backend', level: 90, icon: 'SiExpress', order: 11 },
      { name: 'MongoDB', category: 'Backend', level: 85, icon: 'SiMongodb', order: 12 },
      { name: 'MySQL', category: 'Backend', level: 80, icon: 'SiMysql', order: 13 },
      { name: 'PostgreSQL', category: 'Backend', level: 80, icon: 'SiPostgresql', order: 14 },
      { name: 'Prisma', category: 'Backend', level: 85, icon: 'SiPrisma', order: 15 },
      { name: 'REST APIs', category: 'Backend', level: 90, icon: 'FaServer', order: 16 },
      
      // Tools & Others
      { name: 'Git', category: 'Tools', level: 90, icon: 'FaGit', order: 17 },
      { name: 'Docker', category: 'Tools', level: 75, icon: 'FaDocker', order: 18 },
      { name: 'Webpack', category: 'Tools', level: 80, icon: 'SiWebpack', order: 19 },
      { name: 'Google Cloud Platform', category: 'Tools', level: 70, icon: 'SiGooglecloud', order: 20 },
      { name: 'GitHub Actions', category: 'Tools', level: 75, icon: 'SiGithubactions', order: 21 },
      { name: 'Firebase', category: 'Tools', level: 80, icon: 'SiFirebase', order: 22 },
      { name: 'JWT', category: 'Security', level: 85, icon: 'SiJsonwebtokens', order: 23 },
      { name: 'OAuth', category: 'Security', level: 80, icon: 'FaLock', order: 24 },
      { name: 'Systems Design', category: 'Architecture', level: 85, icon: 'FaProjectDiagram', order: 25 },
      { name: 'OOP', category: 'Architecture', level: 90, icon: 'FaCode', order: 26 },
      { name: 'UML', category: 'Architecture', level: 75, icon: 'FaDiagram', order: 27 },
    ],
  });
  console.log(`✅ Created ${skills.count} skills\n`);

  // Seed Experience (Using real data from Experiences.ts)
  console.log('💼 Seeding Experiences...');
  await prisma.experience.createMany({
    data: [
      {
        company: 'Samtax',
        position: 'Full Stack Engineer',
        description: 'Developed and launched multiple full-stack web applications for a startup, including custom internal tools, AI-driven automation solutions, and secure payment systems to enable seamless transactions for clients.',
        startDate: new Date('2024-06-01'),
        endDate: null,
        current: true,
        location: 'Philadelphia, United States',
        logo: '/logos/samtax.svg',
        order: 1,
      },
      {
        company: 'Sustainable Star LLC',
        position: 'Frontend Developer',
        description: 'Developed the Sustainable Star Form Builder (SFB) platform, enabling companies to create custom forms with drag-and-drop functionality, ensuring responsive design and optimal performance.',
        startDate: new Date('2023-07-01'),
        endDate: new Date('2023-11-30'),
        current: false,
        location: 'Riyadh, Saudi Arabia',
        logo: '/logos/sustainablestar.png',
        order: 2,
      },
      {
        company: 'Perfect Touch (PTIT)',
        position: 'Frontend Developer',
        description: 'Contributed to team projects including the NAJ Training Center, enhanced applications for greater creativity and usability, and maintained legacy projects by updating outdated packages.',
        startDate: new Date('2023-06-01'),
        endDate: new Date('2023-09-30'),
        current: false,
        location: 'Riyadh, Saudi Arabia',
        logo: '/logos/ptit.png',
        order: 3,
      },
      {
        company: 'Gaza Electricity Distribution Company (GEDCO)',
        position: 'IT Security & Database Intern',
        description: 'Supported database maintenance operations, implemented security protocols, and participated in security monitoring and incident response to protect sensitive data.',
        startDate: new Date('2022-04-01'),
        endDate: new Date('2022-06-30'),
        current: false,
        location: 'Gaza, Palestine',
        logo: '/logos/gedco.png',
        order: 4,
      },
    ],
  });
  console.log('✅ Created 4 experiences\n');

  // Seed Education (Using real data from Education.ts)
  console.log('🎓 Seeding Education...');
  await prisma.education.createMany({
    data: [
      {
        institution: 'Al-Azhar University',
        degree: 'Diploma',
        field: 'Software Engineering and Database Systems',
        description: 'Studied Software Engineering and Database Systems with a strong emphasis on building secure applications, system architecture, and robust data management. Developed a solid foundation in modern programming practices and problem-solving within diverse technology environments.',
        startDate: new Date('2020-09-01'),
        endDate: new Date('2022-06-30'),
        current: false,
        location: 'Gaza, Palestine',
        logo: '/logos/alazhar-logo.png',
        order: 1,
      },
    ],
  });
  console.log('✅ Created 1 education entry\n');

  // Seed Projects (Using real data from Projects.ts)
  console.log('🚀 Seeding Projects...');
  await prisma.project.createMany({
    data: [
      {
        title: 'Samtax',
        description: 'A trusted tax and accounting platform providing expert tax preparation, financial planning, and business advisory services. Developed a secure, scalable web application with multi-language support, integrated payment systems, and AI-powered automation tools.',
        image: '/logos/samtax.svg',
        link: 'https://sam-tax.com/',
        tags: ['React', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JWT', 'OAuth'],
        featured: true,
        order: 1,
      },
      {
        title: 'Rove E-commerce',
        description: 'An e-commerce platform delivering seamless online shopping experiences. Combines modern UI, secure transactions, and scalable architecture to help businesses showcase products and grow sales effortlessly.',
        image: '/logos/4cv.svg',
        link: 'https://github.com/balshaer',
        tags: ['JavaScript', 'React.js', 'Tailwind CSS', 'Laravel', 'PHP', 'REST APIs'],
        featured: true,
        order: 2,
      },
      {
        title: 'SFP - Sustainable Star Form Builder',
        description: 'A powerful, no-code form builder that lets you create, customize, and deploy smart forms in minutes. Designed for teams and creators who need flexible data collection without the technical headache.',
        image: '/logos/sfb.svg',
        link: 'https://sfb-app.com',
        tags: ['React.js', 'React DnD', 'TypeScript', 'Node.js', 'Tailwind CSS', 'JWT', 'OAuth'],
        featured: true,
        order: 3,
      },
      {
        title: 'Gradients CSS',
        description: 'A modern tool that takes the hassle out of creating stunning gradients. Helps developers and designers explore, customize, and export beautiful CSS gradients with ease.',
        image: '/logos/gradientscss.png',
        link: 'https://gradientscss.vercel.app/',
        tags: ['React', 'TypeScript', 'Tailwind CSS', 'CSS3', 'Vite'],
        featured: true,
        order: 4,
      },
      {
        title: 'Barber Academy',
        description: 'Developed a comprehensive website for Barber Academy, enabling online appointment scheduling and showcasing a complete range of services. Delivered a user-friendly platform that increased client engagement and streamlined operations.',
        image: '/logos/barber.svg',
        link: 'https://raoufzadi.vercel.app/',
        tags: ['React', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
        featured: true,
        order: 5,
      },
      {
        title: 'NAJ Training Center',
        description: 'A training center website with course management, student enrollment, and progress tracking. Contributed to the project during my time at PTIT, enhancing functionality and maintaining legacy systems.',
        image: '/logos/ptit.png',
        link: '',
        tags: ['React', 'JavaScript', 'Material-UI', 'Node.js'],
        featured: false,
        order: 6,
      },
    ],
  });
  console.log('✅ Created 6 projects\n');

  // Seed Recommendations (Using real data from Recommendations.ts)
  console.log('⭐ Seeding Recommendations...');
  await prisma.recommendation.createMany({
    data: [
      {
        name: 'Fahad Hummadi',
        position: 'Senior Business Architect',
        company: 'Perfect Touch (PTIT)',
        text: 'Baraa consistently demonstrated exceptional technical skills in front-end development, with a keen eye for detail and a deep understanding of modern web technologies. He was highly dedicated, eager to learn, and contributed significantly to our projects. I am confident he will bring the same level of professionalism, commitment, and expertise to any team he joins.',
        image: '',
        linkedin: '',
        order: 1,
      },
      {
        name: 'Ali Khaled',
        position: 'Front-end Engineer',
        company: 'Sustainable Star',
        text: 'It was an absolute privilege to work with Baraa. His exceptional skills as a developer, combined with his dedication to delivering high-quality work, made every project a success. Baraa solves complex problems efficiently and his collaborative spirit makes him an asset to any team. I have no doubt he will achieve great things.',
        image: '',
        linkedin: '',
        order: 2,
      },
      {
        name: 'Mohammed Abu Harb',
        position: 'Digital Product Designer',
        company: 'Sustainable Star',
        text: 'I\'m thrilled to recommend Baraa, an incredibly skilled developer I\'ve had the pleasure of working with. His technical abilities are top-notch and his passion for development is clear in every project. Baraa brings a positive attitude and strong problem-solving skills, delivering high-quality work every time.',
        image: '',
        linkedin: '',
        order: 3,
      },
    ],
  });
  console.log('✅ Created 3 recommendations\n');

  // Seed Content (Using real data from Content.ts)
  console.log('⚙️  Seeding Content/Settings...');
  await prisma.content.createMany({
    data: [
      { key: 'site_title', value: 'Baraa Alshaer - Full-Stack Developer', type: 'text' },
      { key: 'site_description', value: 'Portfolio of Baraa Alshaer, a Full-Stack Developer specializing in React, Next.js, Node.js, and AI integration', type: 'text' },
      { key: 'hero_greeting', value: 'Hello, I\'m', type: 'text' },
      { key: 'hero_name', value: 'Baraa Alshaer', type: 'text' },
      { key: 'hero_tagline', value: 'Software Engineer | Full-Stack Developer', type: 'text' },
      { key: 'hero_description', value: 'I build seamless, efficient web applications with expertise in frontend, backend, and system design. My mission is to deliver high-quality digital solutions that meet real-world needs and advance technology.', type: 'text' },
      { key: 'about_title', value: 'About Me', type: 'text' },
      { key: 'about_subtitle', value: 'Dedicated to Excellence', type: 'text' },
      { key: 'footer_message', value: 'Do you have a project you\'d like to collaborate on? Please feel free to reach out.', type: 'text' },
      { key: 'footer_copyright', value: '© 2025 Baraa Alshaer. All rights reserved.', type: 'text' },
    ],
  });
  console.log('✅ Created 10 content entries\n');

  console.log('🎉 Database seeding completed successfully!\n');
  console.log('📊 Summary:');
  console.log('  - 1 Profile');
  console.log('  - 5 Social Links');
  console.log('  - 27 Skills');
  console.log('  - 4 Experiences');
  console.log('  - 1 Education Entry');
  console.log('  - 6 Projects');
  console.log('  - 3 Recommendations');
  console.log('  - 10 Content/Settings');
  console.log('\n✨ Your database is now populated with your REAL portfolio data!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

