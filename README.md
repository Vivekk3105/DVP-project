### Frontend Setup

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
\`\`\`bash
cd backend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a `.env` file with your configuration:
\`\`\`env

PORT=5000

MONGODB_URI=mongodb://localhost:27017/medical-diagnosis

JWT_SECRET=your-super-secret-jwt-key-here

NODE_ENV=development

\`\`\`

4. Seed the database with sample data:
\`\`\`bash
node seedData.js
\`\`\`

5. Start the server:
\`\`\`bash
npm run dev
\`\`\`

The backend will be available at `http://localhost:5000`

## Default Login Credentials

After running the seed script, you can login with:
- **Email**: admin@medical.com
- **Password**: admin123
