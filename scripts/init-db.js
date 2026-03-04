#!/usr/bin/env node

/**
 * This script initializes the database with Prisma
 * Run: node scripts/init-db.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function main() {
  try {
    console.log('🔧 Setting up database...\n');

    // Create .env.local if it doesn't exist
    const envPath = path.join(process.cwd(), '.env.local');
    if (!fs.existsSync(envPath)) {
      const dbUrl = 'file:./prisma/dev.db';
      fs.writeFileSync(envPath, `DATABASE_URL="${dbUrl}"\n`);
      console.log('✓ Created .env.local with DATABASE_URL');
    }

    console.log('📦 Generating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });

    console.log('\n📝 Creating database schema...');
    execSync('npx prisma db push --skip-generate', { stdio: 'inherit' });

    console.log('\n✅ Database setup complete!');
    console.log('\n📚 Next steps:');
    console.log('  1. Start the dev server: npm run dev');
    console.log('  2. View database UI: npx prisma studio');
  } catch (error) {
    console.error('\n❌ Error setting up database:', error.message);
    process.exit(1);
  }
}

main();
