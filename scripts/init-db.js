#!/usr/bin/env node

/**
 * This script initializes the database with Prisma
 * Run: node scripts/init-db.js
 */

const { spawn } = require('child_process');

async function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
    });

    proc.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Command failed with exit code ${code}`));
      } else {
        resolve();
      }
    });

    proc.on('error', (err) => {
      reject(err);
    });
  });
}

async function main() {
  try {
    console.log('🔧 Setting up database...\n');

    console.log('📦 Generating Prisma client...');
    await runCommand('npx', ['prisma', 'generate']);

    console.log('\n📝 Running database migrations...');
    await runCommand('npx', ['prisma', 'migrate', 'dev', '--name', 'init']);

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
