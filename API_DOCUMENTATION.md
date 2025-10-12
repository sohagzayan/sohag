# API Documentation v1.0

Complete API documentation for the portfolio website backend.

## Base URL

```
Development: http://localhost:7000/api/v1
Production: https://yourdomain.com/api/v1
```

## Response Format

All API responses follow this standard format:

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Optional success message",
  "meta": { /* pagination metadata (optional) */ }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message",
  "statusCode": 400
}
```

### Pagination Metadata
```json
{
  "total": 100,
  "page": 1,
  "limit": 10,
  "totalPages": 10,
  "hasMore": true
}
```

## Common Query Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `page` | number | Page number | 1 |
| `limit` | number | Items per page | 10 |
| `sortBy` | string | Field to sort by | createdAt |
| `sortOrder` | 'asc' \| 'desc' | Sort direction | desc |

---

## 📋 Endpoints

### 1. Profile (Hero/About Section)

#### Get Profile
```http
GET /api/v1/profile
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "Sohag Zayan",
    "title": "Full Stack Developer & UI/UX Designer",
    "headline": "Building beautiful, scalable web applications",
    "bio": "I'm a passionate full-stack developer...",
    "email": "hello@sohagzayan.com",
    "phone": "+1 (555) 123-4567",
    "location": "San Francisco, CA",
    "avatar": "https://...",
    "resume": "https://...",
    "availableForWork": true,
    "yearsOfExperience": 5,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Create Profile
```http
POST /api/v1/profile
Content-Type: application/json

{
  "name": "Sohag Zayan",
  "title": "Full Stack Developer",
  "bio": "About me...",
  "email": "hello@example.com"
}
```

#### Update Profile
```http
PUT /api/v1/profile
Content-Type: application/json

{
  "name": "Updated Name",
  "availableForWork": false
}
```

---

### 2. Social Links

#### Get All Social Links
```http
GET /api/v1/social-links?visible=true
```

**Query Parameters:**
- `visible` (boolean): Filter by visibility

#### Create Social Link
```http
POST /api/v1/social-links
Content-Type: application/json

{
  "name": "GitHub",
  "platform": "github",
  "url": "https://github.com/username",
  "icon": "FaGithub",
  "order": 1,
  "visible": true
}
```

#### Get Single Social Link
```http
GET /api/v1/social-links/:id
```

#### Update Social Link
```http
PUT /api/v1/social-links/:id
```

#### Delete Social Link
```http
DELETE /api/v1/social-links/:id
```

---

### 3. Skills

#### Get All Skills
```http
GET /api/v1/skills?category=Frontend&page=1&limit=20
```

**Query Parameters:**
- `category` (string): Filter by category
- `page`, `limit`: Pagination

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "name": "React",
      "category": "Frontend",
      "level": 95,
      "icon": "FaReact",
      "order": 1
    }
  ],
  "meta": {
    "total": 20,
    "page": 1,
    "limit": 20,
    "totalPages": 1,
    "hasMore": false
  }
}
```

#### Create Skill
```http
POST /api/v1/skills
Content-Type: application/json

{
  "name": "React",
  "category": "Frontend",
  "level": 95,
  "icon": "FaReact",
  "order": 1
}
```

#### Get, Update, Delete Skill
```http
GET    /api/v1/skills/:id
PUT    /api/v1/skills/:id
DELETE /api/v1/skills/:id
```

---

### 4. Experiences

#### Get All Experiences
```http
GET /api/v1/experiences?current=true&page=1&limit=10
```

**Query Parameters:**
- `current` (boolean): Filter current positions
- `page`, `limit`: Pagination

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "company": "Tech Innovations Inc.",
      "position": "Senior Full Stack Developer",
      "description": "Leading a team of 5 developers...",
      "startDate": "2022-01-01T00:00:00.000Z",
      "endDate": null,
      "current": true,
      "location": "San Francisco, CA",
      "logo": "https://...",
      "order": 1
    }
  ]
}
```

#### Create Experience
```http
POST /api/v1/experiences
Content-Type: application/json

{
  "company": "Tech Company",
  "position": "Developer",
  "description": "Job description...",
  "startDate": "2022-01-01",
  "current": true,
  "location": "San Francisco, CA"
}
```

#### Get, Update, Delete Experience
```http
GET    /api/v1/experiences/:id
PUT    /api/v1/experiences/:id
DELETE /api/v1/experiences/:id
```

---

### 5. Education

#### Get All Education
```http
GET /api/v1/education?page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "institution": "University of Technology",
      "degree": "Bachelor of Science",
      "field": "Computer Science",
      "description": "Focused on software engineering...",
      "startDate": "2015-09-01T00:00:00.000Z",
      "endDate": "2019-06-01T00:00:00.000Z",
      "current": false,
      "location": "San Francisco, CA",
      "logo": "https://...",
      "grade": "GPA: 3.8/4.0"
    }
  ]
}
```

#### Create Education Entry
```http
POST /api/v1/education
Content-Type: application/json

{
  "institution": "University Name",
  "degree": "Bachelor of Science",
  "field": "Computer Science",
  "startDate": "2015-09-01",
  "grade": "GPA: 3.8/4.0"
}
```

---

### 6. Projects

#### Get All Projects
```http
GET /api/v1/projects?featured=true&tag=React&page=1&limit=10
```

**Query Parameters:**
- `featured` (boolean): Filter featured projects
- `tag` (string): Filter by tag
- `page`, `limit`: Pagination

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "title": "E-Commerce Platform",
      "description": "A full-featured e-commerce platform...",
      "image": "https://...",
      "link": "https://github.com/...",
      "tags": ["Next.js", "TypeScript", "MongoDB"],
      "featured": true,
      "order": 1,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Create Project
```http
POST /api/v1/projects
Content-Type: application/json

{
  "title": "Project Name",
  "description": "Project description...",
  "image": "https://...",
  "link": "https://github.com/...",
  "tags": ["React", "Node.js"],
  "featured": true,
  "order": 1
}
```

---

### 7. Recommendations

#### Get All Recommendations
```http
GET /api/v1/recommendations?page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "name": "John Smith",
      "position": "Senior Product Manager",
      "company": "Tech Innovations Inc.",
      "text": "Sohag is an exceptional developer...",
      "image": "https://...",
      "linkedin": "https://linkedin.com/in/...",
      "order": 1
    }
  ]
}
```

#### Create Recommendation
```http
POST /api/v1/recommendations
Content-Type: application/json

{
  "name": "John Smith",
  "position": "Senior Product Manager",
  "company": "Tech Company",
  "text": "Great to work with...",
  "image": "https://...",
  "linkedin": "https://linkedin.com/in/..."
}
```

---

### 8. Blog Posts

#### Get All Blog Posts
```http
GET /api/v1/blogs?published=true&featured=true&tag=React&page=1&limit=10
```

**Query Parameters:**
- `published` (boolean): Filter published posts
- `featured` (boolean): Filter featured posts
- `tag` (string): Filter by tag
- `page`, `limit`: Pagination

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "title": "Building Scalable Web Applications with Next.js 14",
      "slug": "building-scalable-web-applications-with-nextjs-14",
      "excerpt": "Learn how to build performant...",
      "content": "# Full markdown content...",
      "coverImage": "https://...",
      "tags": ["Next.js", "React"],
      "published": true,
      "featured": true,
      "views": 1234,
      "likes": 89,
      "readTime": 8,
      "author": "Sohag Zayan",
      "publishedAt": "2024-01-15T00:00:00.000Z"
    }
  ]
}
```

#### Get Blog Post by Slug
```http
GET /api/v1/blogs/slug/:slug
```

#### Create Blog Post
```http
POST /api/v1/blogs
Content-Type: application/json

{
  "title": "Blog Post Title",
  "slug": "blog-post-title", // Optional, auto-generated
  "excerpt": "Short excerpt...",
  "content": "# Full markdown content...",
  "coverImage": "https://...",
  "tags": ["React", "JavaScript"],
  "published": true,
  "featured": false
}
```

#### Update Blog Post
```http
PUT /api/v1/blogs/:id
```

#### Delete Blog Post
```http
DELETE /api/v1/blogs/:id
```

---

### 9. Newsletter

#### Get All Subscribers (Admin)
```http
GET /api/v1/newsletter?subscribed=true&page=1&limit=10
```

#### Subscribe to Newsletter
```http
POST /api/v1/newsletter
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe" // Optional
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "email": "user@example.com",
    "name": "John Doe",
    "subscribed": true,
    "confirmedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Successfully subscribed to newsletter! Thank you!"
}
```

#### Unsubscribe from Newsletter
```http
POST /api/v1/newsletter/unsubscribe
Content-Type: application/json

{
  "email": "user@example.com"
}
```

---

### 10. Contact Requests

#### Get All Contact Requests (Admin)
```http
GET /api/v1/contact?status=pending&type=project&page=1&limit=10
```

**Query Parameters:**
- `status`: 'pending' | 'replied' | 'archived'
- `type`: 'general' | 'project' | 'collaboration'
- `page`, `limit`: Pagination

#### Submit Contact Request
```http
POST /api/v1/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry", // Optional
  "message": "I'd like to discuss...",
  "type": "project" // Optional: 'general' | 'project' | 'collaboration'
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "I'd like to discuss...",
    "type": "project",
    "status": "pending",
    "replied": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Thank you for your message! I will get back to you soon."
}
```

#### Update Contact Request Status (Admin)
```http
PUT /api/v1/contact/:id
Content-Type: application/json

{
  "status": "replied",
  "replied": true
}
```

#### Delete Contact Request (Admin)
```http
DELETE /api/v1/contact/:id
```

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request / Validation Error |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |

## Common Error Responses

### Validation Error
```json
{
  "success": false,
  "error": "Validation Error",
  "message": "Missing required fields: name, email",
  "statusCode": 400
}
```

### Not Found
```json
{
  "success": false,
  "error": "Not Found",
  "message": "Project not found",
  "statusCode": 404
}
```

### Already Exists
```json
{
  "success": false,
  "error": "Skill already exists",
  "message": "A skill with name \"React\" already exists",
  "statusCode": 400
}
```

---

## Testing the API

### Using cURL

```bash
# Get profile
curl http://localhost:7000/api/v1/profile

# Get all skills
curl http://localhost:7000/api/v1/skills

# Create a skill
curl -X POST http://localhost:7000/api/v1/skills \
  -H "Content-Type: application/json" \
  -d '{
    "name": "React",
    "category": "Frontend",
    "level": 95
  }'

# Subscribe to newsletter
curl -X POST http://localhost:7000/api/v1/newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "name": "John Doe"
  }'

# Submit contact form
curl -X POST http://localhost:7000/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello, I would like to work with you!"
  }'
```

### Using JavaScript/TypeScript

```typescript
// Get all projects
const response = await fetch('http://localhost:7000/api/v1/projects');
const data = await response.json();

// Create a project
const response = await fetch('http://localhost:7000/api/v1/projects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'My Project',
    description: 'Project description',
    tags: ['React', 'Node.js'],
    featured: true,
  }),
});

// Subscribe to newsletter
const response = await fetch('http://localhost:7000/api/v1/newsletter', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    name: 'John Doe',
  }),
});
```

---

## Database Schema

All models include these default fields:
- `id`: Unique identifier (MongoDB ObjectId)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

---

## Notes

1. **Pagination**: All list endpoints support pagination with `page` and `limit` query parameters
2. **Sorting**: Use `sortBy` and `sortOrder` for custom sorting
3. **Filtering**: Most endpoints support specific filters (see individual endpoint docs)
4. **Validation**: All POST/PUT requests validate required fields and data formats
5. **Idempotency**: Multiple identical newsletter subscriptions won't create duplicates
6. **View Counting**: Blog post views are automatically incremented when fetched
7. **Read Time**: Automatically calculated for blog posts based on content length

---

## Support

For issues or questions, please contact: hello@sohagzayan.com

**API Version**: v1.0  
**Last Updated**: 2024-01-01  
**Status**: ✅ Production Ready

