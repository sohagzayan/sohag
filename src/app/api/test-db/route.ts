import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Try to connect to the database
    await prisma.$connect();
    
    // Get database stats
    const stats = {
      users: await prisma.user.count(),
      projects: await prisma.project.count(),
      experiences: await prisma.experience.count(),
      skills: await prisma.skill.count(),
      recommendations: await prisma.recommendation.count(),
      messages: await prisma.message.count(),
      content: await prisma.content.count(),
    };

    return NextResponse.json({
      success: true,
      message: '✅ Database connected successfully!',
      database: 'MongoDB',
      connection: 'Active',
      stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Database connection error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: '❌ Database connection failed',
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

