const baseURL = 'http://localhost:7000/api/v1';

const endpoints = [
  { name: 'Profile', url: '/profile' },
  { name: 'Social Links', url: '/social-links' },
  { name: 'Skills', url: '/skills' },
  { name: 'Experiences', url: '/experiences' },
  { name: 'Education', url: '/education' },
  { name: 'Projects', url: '/projects' },
  { name: 'Recommendations', url: '/recommendations' },
  { name: 'Blogs', url: '/blogs?published=true' },
  { name: 'Newsletter', url: '/newsletter' },
  { name: 'Contact Requests', url: '/contact' },
];

async function testEndpoint(name, url) {
  try {
    const response = await fetch(`${baseURL}${url}`);
    const data = await response.json();
    
    if (data.success) {
      const count = Array.isArray(data.data) ? data.data.length : 1;
      console.log(`✅ ${name}: ${count} ${Array.isArray(data.data) ? 'items' : 'item'}`);
      return true;
    } else {
      console.log(`❌ ${name}: ${data.error || 'Failed'}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('🧪 Testing API Endpoints...\n');
  
  let passed = 0;
  let failed = 0;
  
  for (const endpoint of endpoints) {
    const result = await testEndpoint(endpoint.name, endpoint.url);
    if (result) passed++;
    else failed++;
  }
  
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed out of ${endpoints.length} tests`);
  
  if (failed === 0) {
    console.log('\n🎉 All API endpoints are working correctly!');
  } else {
    console.log('\n⚠️  Some endpoints failed. Make sure the dev server is running: npm run dev');
  }
}

runTests();

