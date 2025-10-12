# Admin Panel Documentation

## 🔐 Accessing the Admin Panel

1. Navigate to `/admin` in your browser
2. Enter the password: `admin123`
3. You'll be redirected to the admin dashboard

## 📋 Features

### Dashboard
- Overview of all your portfolio content
- Quick stats showing total experiences, projects, recommendations, and messages
- Quick navigation to all sections

### Profile & About
- Edit your personal information (name, email, phone, location)
- Update your bio/about section
- Change your avatar image URL

### Content Sections
Manage content for three main sections:
- **Hero Section**: The landing page content
- **About Section**: Your about me content
- **Footer Section**: Footer and call-to-action content

### Skills Management
- Add new skills and technologies
- Remove existing skills
- Skills are displayed as tags throughout your portfolio

### Experience Management
- Add, edit, or delete work experiences
- Include:
  - Job title and company
  - Location and dates
  - Description and achievements
  - Technologies/skills used
  - Mark if currently working

### Projects Management
- Add, edit, or delete portfolio projects
- Include:
  - Project title and description
  - Project type (Web App, SaaS, Tool, etc.)
  - Links (website, GitHub, video)
  - Technologies used
  - Mark as featured
  - Set status (Published, Draft, Archived)

### Recommendations Management
- Add, edit, or delete recommendations/testimonials
- Include:
  - Name, position, and company
  - Relationship type (Client, Colleague, Manager, etc.)
  - Recommendation text
  - Date received
  - Mark as featured

### Contact Messages
- View all messages submitted through your contact form
- Mark messages as read
- Delete individual messages or clear all
- Reply to messages via email
- Messages are automatically saved when someone submits the contact form

## 💾 Data Storage

All admin data is stored in your browser's **localStorage**. This means:
- ✅ No backend required
- ✅ No database needed
- ✅ Simple and fast
- ⚠️ Data is browser-specific
- ⚠️ Clearing browser data will reset to defaults

### Important Notes:
1. **Data is stored locally**: If you clear your browser data, you'll lose all changes
2. **Browser-specific**: Changes made in Chrome won't appear in Firefox
3. **Backup recommended**: Consider exporting your localStorage data periodically

## 🔄 Using Admin Data in Your Portfolio

The admin panel data is automatically integrated into your portfolio through custom hooks:

```typescript
import { useAdminProfile } from "@/hooks/use-admin-data";
import { useAdminExperiences } from "@/hooks/use-admin-data";
import { useAdminProjects } from "@/hooks/use-admin-data";
import { useAdminRecommendations } from "@/hooks/use-admin-data";
import { useAdminContent } from "@/hooks/use-admin-data";
import { useAdminSkills } from "@/hooks/use-admin-data";

// Example usage in a component
export default function MyComponent() {
  const profile = useAdminProfile();
  const experiences = useAdminExperiences();
  const projects = useAdminProjects();
  const heroContent = useAdminContent("hero");
  
  // Use the data in your component
  return <div>{profile.firstName}</div>;
}
```

## 🔒 Security Considerations

**Current Setup:**
- Simple password protection (password: `admin123`)
- Client-side authentication
- No server-side validation

**Recommendations for Production:**
1. Change the default password in `/src/contexts/admin-context.tsx`
2. Consider adding server-side authentication
3. Implement proper session management
4. Add HTTPS in production
5. Consider using a real backend/database for persistent storage

## 🚀 Deployment Notes

When deploying your site:
1. The admin panel will work on the deployed site
2. Each browser/device will have its own data
3. Consider using environment variables for the password
4. For persistent data across devices, consider:
   - Backend API integration
   - Database storage (MongoDB, Firebase, etc.)
   - Cloud storage solutions

## 🛠️ Customization

### Changing the Admin Password
Edit `/src/contexts/admin-context.tsx`:
```typescript
const ADMIN_PASSWORD = "your-new-password-here";
```

### Adding New Admin Sections
1. Create a new page in `/src/app/admin/[section-name]/page.tsx`
2. Add the route to the navigation in `/src/components/admin/AdminLayout.tsx`
3. Create corresponding hooks in `/src/hooks/use-admin-data.ts`

### Styling
The admin panel uses shadcn/ui components and Tailwind CSS, matching your portfolio's design system.

## 📝 Tips

1. **Regular backups**: Periodically save your data
2. **Test changes**: Preview your portfolio after making admin changes
3. **Mobile friendly**: The admin panel works on mobile devices too
4. **Keyboard shortcuts**: Use Tab to navigate forms quickly

## 🐛 Troubleshooting

**Problem**: Can't access admin panel
- Solution: Make sure you're using the correct password: `admin123`

**Problem**: Changes not appearing
- Solution: Refresh your portfolio page to see admin changes

**Problem**: Lost all data
- Solution: Check if you cleared browser data. Restore from backup if available

**Problem**: Admin panel not loading
- Solution: Check browser console for errors, ensure JavaScript is enabled

## 📧 Contact Form Integration

The contact form automatically:
1. Saves submissions to localStorage
2. Sends email via EmailJS (if configured)
3. Shows submissions in the Messages section
4. Marks messages as read/unread

You can reply to messages directly from the admin panel using your default email client.

