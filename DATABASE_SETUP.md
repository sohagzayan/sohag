# Database Setup with MongoDB & Prisma

## ✅ Setup Complete!

Your MongoDB database is now successfully connected to your Next.js project using Prisma.

## 📋 Database Information

- **Database**: MongoDB Atlas
- **Database Name**: sohagzayan_db_user
- **Connection**: ✅ Active and tested
- **ORM**: Prisma v6.17.1

## 🗂️ Database Models

The following models are available in your database:

1. **User** - User authentication and profiles
2. **Project** - Portfolio projects
3. **Experience** - Work experience entries
4. **Skill** - Technical skills
5. **Recommendation** - Client/colleague recommendations
6. **Message** - Contact form messages
7. **Content** - Dynamic content management

## 📂 File Structure

```
/Users/sohaghossain/Desktop/personal/Update Life/sohag.com/
├── .env                        # Environment variables (DO NOT COMMIT)
├── .env.local                  # Next.js environment variables (DO NOT COMMIT)
├── prisma/
│   └── schema.prisma          # Prisma schema with MongoDB models
├── src/
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client singleton instance
│   │   └── db.ts              # Database utility functions
│   └── app/
│       └── api/
│           └── test-db/       # Database connection test endpoint
│               └── route.ts
└── test-db-connection.js      # Standalone connection test script
```

## 🚀 Available Scripts

### Database Commands

```bash
# Generate Prisma Client (run after schema changes)
npm run db:generate

# Push schema changes to database (no migrations needed for MongoDB)
npm run db:push

# Open Prisma Studio (database GUI)
npm run db:studio

# Test database connection
npm run db:test
```

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📖 Usage Examples

### 1. Using Prisma Client in API Routes

```typescript
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
      take: 10,
    });
    
    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const project = await prisma.project.create({
      data: {
        title: body.title,
        description: body.description,
        tags: body.tags || [],
        featured: body.featured || false,
      },
    });
    
    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
```

### 2. Using Database Utilities

```typescript
import { checkDatabaseConnection, getDatabaseStats } from '@/lib/db';

// Check connection
const isConnected = await checkDatabaseConnection();

// Get stats
const stats = await getDatabaseStats();
console.log(stats);
```

### 3. Server Components

```typescript
import prisma from '@/lib/prisma';

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <div>
      {projects.map((project) => (
        <div key={project.id}>{project.title}</div>
      ))}
    </div>
  );
}
```

## 🧪 Testing the Connection

### Method 1: Using the Test Script
```bash
npm run db:test
```

### Method 2: Using the API Endpoint
Start the dev server and visit:
```
http://localhost:7000/api/test-db
```

### Method 3: Using Prisma Studio
```bash
npm run db:studio
```
This will open a browser-based GUI at `http://localhost:5555`

## 🔧 Common Operations

### Adding a New Model

1. Edit `prisma/schema.prisma`:
```prisma
model BlogPost {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  title     String
  content   String
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

2. Generate the client:
```bash
npm run db:generate
```

3. Push to database:
```bash
npm run db:push
```

### Querying Data

```typescript
// Find all
const users = await prisma.user.findMany();

// Find one
const user = await prisma.user.findUnique({
  where: { email: 'user@example.com' },
});

// Create
const newUser = await prisma.user.create({
  data: {
    email: 'new@example.com',
    name: 'New User',
    password: 'hashed_password',
  },
});

// Update
const updated = await prisma.user.update({
  where: { id: 'user_id' },
  data: { name: 'Updated Name' },
});

// Delete
await prisma.user.delete({
  where: { id: 'user_id' },
});

// Count
const count = await prisma.user.count();

// Complex queries
const results = await prisma.project.findMany({
  where: {
    featured: true,
    tags: { hasSome: ['react', 'nextjs'] },
  },
  orderBy: { createdAt: 'desc' },
  take: 10,
});
```

## 🔒 Security Best Practices

1. ✅ Environment variables are in `.env` and `.env.local` (not committed to git)
2. ✅ Prisma client uses singleton pattern to prevent connection pool exhaustion
3. ✅ Connection logging enabled in development, disabled in production
4. ✅ Proper error handling in all database operations

## 🐛 Troubleshooting

### Connection Issues

If you can't connect to the database:

1. Check your `.env` file has the correct `DATABASE_URL`
2. Verify your IP is whitelisted in MongoDB Atlas
3. Check your network allows connections to MongoDB Atlas
4. Run `npm run db:test` to see detailed error messages

### Prisma Client Issues

If you get "Cannot find module '@/generated/prisma'":

```bash
npm run db:generate
```

### Schema Changes Not Reflecting

After changing `schema.prisma`:

```bash
npm run db:generate
npm run db:push
```

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma with MongoDB](https://www.prisma.io/docs/concepts/database-connectors/mongodb)
- [Next.js with Prisma](https://www.prisma.io/nextjs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

## ⚡ Performance Tips

1. Use indexes for frequently queried fields (add `@@index` in schema)
2. Use `select` to limit returned fields
3. Use `include` carefully to avoid over-fetching
4. Consider pagination for large datasets
5. Cache frequently accessed data

## 🎉 Next Steps

1. ✅ Database connection is working
2. 🔄 Create API routes for your models
3. 🔄 Build admin interface for data management
4. 🔄 Add authentication/authorization
5. 🔄 Deploy to production (Vercel recommended)

---

**Status**: ✅ Connected and Ready to Use!

