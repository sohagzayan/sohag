import prisma from './prisma';

/**
 * Check if the database connection is healthy
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$connect();
    await prisma.$disconnect();
    return true;
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
}

/**
 * Get database statistics
 */
export async function getDatabaseStats() {
  try {
    const [users, projects, experiences, skills, recommendations, messages, content] = await Promise.all([
      prisma.user.count(),
      prisma.project.count(),
      prisma.experience.count(),
      prisma.skill.count(),
      prisma.recommendation.count(),
      prisma.message.count(),
      prisma.content.count(),
    ]);

    return {
      users,
      projects,
      experiences,
      skills,
      recommendations,
      messages,
      content,
      total: users + projects + experiences + skills + recommendations + messages + content,
    };
  } catch (error) {
    console.error('Failed to get database stats:', error);
    throw error;
  }
}

/**
 * Initialize database with default data if empty
 */
export async function initializeDatabase() {
  try {
    const contentCount = await prisma.content.count();
    
    if (contentCount === 0) {
      console.log('Initializing database with default data...');
      
      // You can add default content here
      await prisma.content.createMany({
        data: [
          { key: 'site_title', value: 'Sohag Zayan', type: 'text' },
          { key: 'site_description', value: 'Portfolio Website', type: 'text' },
        ],
      });
      
      console.log('Database initialized successfully!');
    }
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

export { prisma };

