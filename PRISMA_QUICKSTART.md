# Prisma + MongoDB Quick Start Guide 🚀

## ✅ Connection Status: SUCCESSFUL

Your MongoDB database is successfully connected and ready to use!

## 🎯 Quick Commands

```bash
# Test database connection
npm run db:test

# Open Prisma Studio (Database GUI)
npm run db:studio

# Generate Prisma Client (after schema changes)
npm run db:generate

# Push schema changes to database
npm run db:push
```

## 📡 API Endpoints

### Test Connection
- **GET** `http://localhost:7000/api/test-db`
  - Returns database connection status and statistics

### Projects
- **GET** `http://localhost:7000/api/projects`
  - Query params: `?featured=true&limit=10`
- **POST** `http://localhost:7000/api/projects`
- **GET** `http://localhost:7000/api/projects/[id]`
- **PUT** `http://localhost:7000/api/projects/[id]`
- **DELETE** `http://localhost:7000/api/projects/[id]`

### Messages (Contact Form)
- **GET** `http://localhost:7000/api/messages`
  - Query params: `?unread=true`
- **POST** `http://localhost:7000/api/messages`

## 💡 Usage Examples

### In API Routes
```typescript
import prisma from '@/lib/prisma';

export async function GET() {
  const projects = await prisma.project.findMany();
  return Response.json({ projects });
}
```

### In Server Components
```typescript
import prisma from '@/lib/prisma';

export default async function Page() {
  const projects = await prisma.project.findMany();
  return <div>{/* render projects */}</div>;
}
```

### Common Operations
```typescript
// Create
const project = await prisma.project.create({
  data: { title: 'New Project', description: 'Description' }
});

// Read
const projects = await prisma.project.findMany();
const project = await prisma.project.findUnique({ where: { id } });

// Update
await prisma.project.update({
  where: { id },
  data: { title: 'Updated Title' }
});

// Delete
await prisma.project.delete({ where: { id } });

// Count
const count = await prisma.project.count();
```

## 🗄️ Available Models

1. **User** - User authentication and profiles
2. **Project** - Portfolio projects
3. **Experience** - Work experience entries
4. **Skill** - Technical skills
5. **Recommendation** - Client/colleague recommendations
6. **Message** - Contact form messages
7. **Content** - Dynamic content management

## 📁 Key Files

- `prisma/schema.prisma` - Database schema
- `src/lib/prisma.ts` - Prisma client instance
- `src/lib/db.ts` - Database utilities
- `.env` - Environment variables (DO NOT COMMIT)

## 🔒 Environment Variables

Located in `.env`:
```env
DATABASE_URL="mongodb+srv://sohagzayan_db_user:YBJ7BrZzqFQFDcac@cluster0.klulhla.mongodb.net/sohagzayan_db_user?retryWrites=true&w=majority&appName=Cluster0"
```

## 🧪 Test Results

```
✅ Successfully connected to MongoDB!
📊 Database Statistics:
  - Users: 0
  - Projects: 0
  - Experiences: 0
  - Skills: 0
  - Recommendations: 0
  - Messages: 0
  - Content: 0
```

## 🎨 Prisma Studio

Launch the visual database editor:
```bash
npm run db:studio
```

Then open: `http://localhost:5555`

## 📚 Learn More

- Full documentation: `DATABASE_SETUP.md`
- [Prisma Docs](https://www.prisma.io/docs)
- [Next.js + Prisma](https://www.prisma.io/nextjs)

---

**Status**: ✅ Ready to use!

