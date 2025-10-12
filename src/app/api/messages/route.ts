import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/messages - Get all messages
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const unreadOnly = searchParams.get('unread') === 'true';

    const messages = await prisma.message.findMany({
      where: unreadOnly ? { read: false } : undefined,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: messages,
      count: messages.length,
    });
  } catch (error: any) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch messages',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// POST /api/messages - Create a new message (contact form submission)
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
          message: 'Name, email, and message are required',
        },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email',
          message: 'Please provide a valid email address',
        },
        { status: 400 }
      );
    }

    const message = await prisma.message.create({
      data: {
        name: body.name,
        email: body.email,
        subject: body.subject || null,
        message: body.message,
        read: false,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: message,
        message: 'Message sent successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating message:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send message',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

