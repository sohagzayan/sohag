import {
    errorResponse,
    successResponse
} from '@/lib/api-helpers';
import prisma from '@/lib/prisma';

// GET /api/v1/skills/[id] - Get a specific skill
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const skill = await prisma.skill.findUnique({
            where: { id },
        });

        if (!skill) {
            return errorResponse('Skill not found', 404);
        }

        return successResponse(skill);
    } catch (error: any) {
        console.error('Error fetching skill:', error);
        return errorResponse('Failed to fetch skill', 500, error.message);
    }
}

// PATCH /api/v1/skills/[id] - Update a specific skill
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await request.json();

        // Check if skill exists
        const existingSkill = await prisma.skill.findUnique({
            where: { id },
        });

        if (!existingSkill) {
            return errorResponse('Skill not found', 404);
        }

        // Check if name is being changed and if it conflicts with existing skill
        if (body.name && body.name !== existingSkill.name) {
            const nameConflict = await prisma.skill.findUnique({
                where: { name: body.name },
            });

            if (nameConflict) {
                return errorResponse(
                    'Skill name already exists',
                    400,
                    `A skill with name "${body.name}" already exists`
                );
            }
        }

        // Update the skill
        const updatedSkill = await prisma.skill.update({
            where: { id },
            data: {
                ...(body.name && { name: body.name }),
                ...(body.category && { category: body.category }),
                ...(body.level !== undefined && { level: body.level }),
                ...(body.icon !== undefined && { icon: body.icon }),
                ...(body.order !== undefined && { order: body.order }),
            },
        });

        return successResponse(updatedSkill, 'Skill updated successfully');
    } catch (error: any) {
        console.error('Error updating skill:', error);
        return errorResponse('Failed to update skill', 500, error.message);
    }
}

// DELETE /api/v1/skills/[id] - Delete a specific skill
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        // Check if skill exists
        const existingSkill = await prisma.skill.findUnique({
            where: { id },
        });

        if (!existingSkill) {
            return errorResponse('Skill not found', 404);
        }

        // Delete the skill
        await prisma.skill.delete({
            where: { id },
        });

        return successResponse(null, 'Skill deleted successfully');
    } catch (error: any) {
        console.error('Error deleting skill:', error);
        return errorResponse('Failed to delete skill', 500, error.message);
    }
}