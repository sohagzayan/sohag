import {
    errorResponse,
    successResponse,
    validateRequiredFields,
    validationError,
} from '@/lib/api-helpers';
import prisma from '@/lib/prisma';

// GET /api/v1/profile - Get profile (usually there's only one)
export async function GET() {
  try {
    const profile = await prisma.profile.findFirst();

    if (!profile) {
      return errorResponse('Profile not found', 404, 'No profile data available');
    }

    return successResponse(profile);
  } catch (error: any) {
    console.error('Error fetching profile:', error);
    return errorResponse('Failed to fetch profile', 500, error.message);
  }
}

// POST /api/v1/profile - Create profile
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const missing = validateRequiredFields(body, ['name', 'title', 'bio', 'email']);
    if (missing.length > 0) {
      return validationError(`Missing required fields: ${missing.join(', ')}`);
    }

    // Check if profile already exists
    const existing = await prisma.profile.findFirst();
    if (existing) {
      return errorResponse(
        'Profile already exists',
        400,
        'Only one profile can exist. Use PUT to update.'
      );
    }

    const profile = await prisma.profile.create({
      data: {
        name: body.name,
        title: body.title,
        headline: body.headline,
        bio: body.bio,
        email: body.email,
        phone: body.phone,
        location: body.location,
        avatar: body.avatar,
        resume: body.resume,
        availableForWork: body.availableForWork ?? true,
        yearsOfExperience: body.yearsOfExperience,
      },
    });

    return successResponse(profile, 'Profile created successfully');
  } catch (error: any) {
    console.error('Error creating profile:', error);
    return errorResponse('Failed to create profile', 500, error.message);
  }
}

// PUT /api/v1/profile - Update profile
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // Get the existing profile
    const existing = await prisma.profile.findFirst();
    if (!existing) {
      return errorResponse('Profile not found', 404, 'No profile to update');
    }

    const profile = await prisma.profile.update({
      where: { id: existing.id },
      data: {
        name: body.name,
        title: body.title,
        headline: body.headline,
        bio: body.bio,
        email: body.email,
        phone: body.phone,
        location: body.location,
        avatar: body.avatar,
        resume: body.resume,
        availableForWork: body.availableForWork,
        yearsOfExperience: body.yearsOfExperience,
      },
    });

    return successResponse(profile, 'Profile updated successfully');
  } catch (error: any) {
    console.error('Error updating profile:', error);
    return errorResponse('Failed to update profile', 500, error.message);
  }
}

