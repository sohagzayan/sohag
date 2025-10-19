const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

const sampleBlogs = [
  {
    title: "Getting Started with Next.js 14",
    slug: "getting-started-nextjs-14",
    excerpt: "Learn the fundamentals of Next.js 14 and build your first modern web application with the latest features and best practices.",
    content: `
      <h2>Introduction</h2>
      <p>Next.js 14 brings exciting new features that make building modern web applications even more powerful and efficient. In this comprehensive guide, we'll explore the key improvements and how to leverage them in your projects.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li><strong>App Router:</strong> The new App Router provides a more intuitive file-based routing system with better performance.</li>
        <li><strong>Server Components:</strong> Build faster applications with server-side rendering by default.</li>
        <li><strong>Turbopack:</strong> Lightning-fast bundling for development environments.</li>
        <li><strong>Enhanced TypeScript Support:</strong> Better type safety and developer experience.</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>To create a new Next.js 14 project, simply run:</p>
      <pre><code>npx create-next-app@latest my-app</code></pre>
      
      <p>This will set up a new project with all the latest features and configurations.</p>
      
      <h2>Conclusion</h2>
      <p>Next.js 14 represents a significant step forward in React-based web development. With its improved performance, better developer experience, and powerful new features, it's the perfect choice for your next project.</p>
    `,
    coverImage: "https://images.prismic.io/loco-blogs/79328284-f97b-489f-924c-eb3b17e34b56_image2.png?auto=compress%2Cformat&rect=0%2C0%2C1999%2C1124&w=1920&fit=max",
    tags: ["Next.js", "React", "Web Development", "JavaScript"],
    author: "Sohag Hossain",
    readTime: 8,
    published: true,
    featured: true,
    views: 1250,
    likes: 89,
  },
  {
    title: "Advanced TypeScript Patterns",
    slug: "advanced-typescript-patterns",
    excerpt: "Discover advanced TypeScript patterns and techniques that will make you a more effective TypeScript developer.",
    content: `
      <h2>Introduction</h2>
      <p>TypeScript has evolved into one of the most powerful tools for building scalable JavaScript applications. This guide explores advanced patterns that will help you write more maintainable and type-safe code.</p>
      
      <h2>Advanced Type Patterns</h2>
      <h3>Conditional Types</h3>
      <p>Conditional types allow you to create types that depend on other types:</p>
      <pre><code>type ApiResponse&lt;T&gt; = T extends string ? string : T extends number ? number : never;</code></pre>
      
      <h3>Mapped Types</h3>
      <p>Mapped types enable you to transform existing types:</p>
      <pre><code>type Optional&lt;T&gt; = {
        [K in keyof T]?: T[K];
      };</code></pre>
      
      <h2>Design Patterns</h2>
      <ul>
        <li><strong>Factory Pattern:</strong> Create objects without specifying their exact class.</li>
        <li><strong>Observer Pattern:</strong> Implement event-driven architectures.</li>
        <li><strong>Strategy Pattern:</strong> Define a family of algorithms and make them interchangeable.</li>
      </ul>
      
      <h2>Best Practices</h2>
      <p>Always use strict mode, leverage utility types, and keep your types as specific as possible while maintaining flexibility.</p>
    `,
    coverImage: "https://images.prismic.io/loco-blogs/79328284-f97b-489f-924c-eb3b17e34b56_image2.png?auto=compress%2Cformat&rect=0%2C0%2C1999%2C1124&w=1920&fit=max",
    tags: ["TypeScript", "Programming", "Design Patterns"],
    author: "Sohag Hossain",
    readTime: 12,
    published: true,
    featured: false,
    views: 890,
    likes: 67,
  },
  {
    title: "Building Scalable APIs with Node.js",
    slug: "building-scalable-apis-nodejs",
    excerpt: "Learn how to build robust, scalable APIs using Node.js, Express, and modern development practices.",
    content: `
      <h2>Introduction</h2>
      <p>Building scalable APIs is crucial for modern web applications. In this guide, we'll explore best practices for creating robust Node.js APIs that can handle high traffic and maintain excellent performance.</p>
      
      <h2>Project Setup</h2>
      <p>Start by setting up your Node.js project with the necessary dependencies:</p>
      <pre><code>npm init -y
npm install express cors helmet morgan
npm install -D nodemon typescript @types/node</code></pre>
      
      <h2>Architecture Patterns</h2>
      <h3>MVC Pattern</h3>
      <p>Organize your code using the Model-View-Controller pattern for better maintainability.</p>
      
      <h3>Middleware</h3>
      <p>Use middleware for cross-cutting concerns like authentication, logging, and error handling.</p>
      
      <h2>Performance Optimization</h2>
      <ul>
        <li>Implement caching strategies</li>
        <li>Use database connection pooling</li>
        <li>Optimize database queries</li>
        <li>Implement rate limiting</li>
      </ul>
      
      <h2>Security Best Practices</h2>
      <p>Always validate input, use HTTPS, implement proper authentication, and keep dependencies updated.</p>
    `,
    coverImage: "https://images.prismic.io/loco-blogs/79328284-f97b-489f-924c-eb3b17e34b56_image2.png?auto=compress%2Cformat&rect=0%2C0%2C1999%2C1124&w=1920&fit=max",
    tags: ["Node.js", "API", "Backend", "JavaScript"],
    author: "Sohag Hossain",
    readTime: 15,
    published: true,
    featured: true,
    views: 2100,
    likes: 156,
  },
  {
    title: "CSS Grid vs Flexbox: When to Use Which",
    slug: "css-grid-vs-flexbox",
    excerpt: "A comprehensive comparison of CSS Grid and Flexbox, with practical examples and use cases for each layout method.",
    content: `
      <h2>Introduction</h2>
      <p>CSS Grid and Flexbox are both powerful layout tools, but they serve different purposes. Understanding when to use each will make you a more effective CSS developer.</p>
      
      <h2>CSS Grid</h2>
      <p>CSS Grid is perfect for two-dimensional layouts where you need to control both rows and columns.</p>
      
      <h3>Use Cases:</h3>
      <ul>
        <li>Complex page layouts</li>
        <li>Card grids</li>
        <li>Dashboard layouts</li>
      </ul>
      
      <h2>Flexbox</h2>
      <p>Flexbox excels at one-dimensional layouts, either in a row or column direction.</p>
      
      <h3>Use Cases:</h3>
      <ul>
        <li>Navigation bars</li>
        <li>Button groups</li>
        <li>Centering content</li>
      </ul>
      
      <h2>Combining Both</h2>
      <p>Often, the best approach is to combine both Grid and Flexbox in the same layout, using each for what it does best.</p>
    `,
    coverImage: "https://images.prismic.io/loco-blogs/79328284-f97b-489f-924c-eb3b17e34b56_image2.png?auto=compress%2Cformat&rect=0%2C0%2C1999%2C1124&w=1920&fit=max",
    tags: ["CSS", "Web Design", "Layout", "Frontend"],
    author: "Sohag Hossain",
    readTime: 6,
    published: true,
    featured: false,
    views: 750,
    likes: 45,
  },
  {
    title: "React Performance Optimization Techniques",
    slug: "react-performance-optimization",
    excerpt: "Learn advanced techniques to optimize React applications for better performance and user experience.",
    content: `
      <h2>Introduction</h2>
      <p>Performance optimization is crucial for creating smooth, responsive React applications. This guide covers the most effective techniques to improve your app's performance.</p>
      
      <h2>React.memo</h2>
      <p>Use React.memo to prevent unnecessary re-renders of functional components:</p>
      <pre><code>const MyComponent = React.memo(({ data }) => {
  return &lt;div&gt;{data.name}&lt;/div&gt;;
});</code></pre>
      
      <h2>useMemo and useCallback</h2>
      <p>Optimize expensive calculations and function references:</p>
      <pre><code>const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);</code></pre>
      
      <h2>Code Splitting</h2>
      <p>Split your code to load only what's needed:</p>
      <pre><code>const LazyComponent = React.lazy(() => import('./LazyComponent'));</code></pre>
      
      <h2>Bundle Analysis</h2>
      <p>Use tools like webpack-bundle-analyzer to identify optimization opportunities.</p>
    `,
    coverImage: "https://images.prismic.io/loco-blogs/79328284-f97b-489f-924c-eb3b17e34b56_image2.png?auto=compress%2Cformat&rect=0%2C0%2C1999%2C1124&w=1920&fit=max",
    tags: ["React", "Performance", "Optimization", "JavaScript"],
    author: "Sohag Hossain",
    readTime: 10,
    published: true,
    featured: true,
    views: 1800,
    likes: 134,
  },
];

async function seedBlogs() {
  try {
    console.log('Starting blog seeding...');
    
    // Clear existing blogs (optional - remove this if you want to keep existing data)
    // await prisma.blog.deleteMany({});
    
    for (const blog of sampleBlogs) {
      const existingBlog = await prisma.blog.findUnique({
        where: { slug: blog.slug },
      });
      
      if (!existingBlog) {
        await prisma.blog.create({
          data: {
            ...blog,
            publishedAt: new Date(),
          },
        });
        console.log(`Created blog: ${blog.title}`);
      } else {
        console.log(`Blog already exists: ${blog.title}`);
      }
    }
    
    console.log('Blog seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding blogs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedBlogs();
