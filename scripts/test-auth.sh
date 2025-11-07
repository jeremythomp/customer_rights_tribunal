#!/bin/bash

# Test Authentication Setup Script
# This script helps verify that authentication is properly configured

echo "🔐 Testing Customer Rights Tribunal Authentication Setup"
echo "=========================================================="
echo ""

# Check if .env exists
echo "1. Checking environment variables..."
if [ ! -f .env ]; then
    echo "   ❌ .env file not found!"
    echo "   📝 Please create a .env file. See AUTH_QUICK_START.md for details."
    exit 1
else
    echo "   ✅ .env file exists"
    
    # Check for required variables
    if grep -q "NEXTAUTH_SECRET" .env && grep -q "NEXTAUTH_URL" .env && grep -q "DATABASE_URL" .env; then
        echo "   ✅ Required environment variables are set"
    else
        echo "   ⚠️  Some required environment variables may be missing"
        echo "   📝 Ensure NEXTAUTH_SECRET, NEXTAUTH_URL, and DATABASE_URL are set"
    fi
fi
echo ""

# Check if Docker is running
echo "2. Checking Docker..."
if ! docker info > /dev/null 2>&1; then
    echo "   ❌ Docker is not running"
    echo "   📝 Start Docker Desktop and try again"
    exit 1
else
    echo "   ✅ Docker is running"
fi
echo ""

# Check if PostgreSQL is running
echo "3. Checking PostgreSQL database..."
if docker-compose ps | grep -q "customer_rights_tribunal_db"; then
    echo "   ✅ PostgreSQL container is running"
else
    echo "   ⚠️  PostgreSQL container is not running"
    echo "   📝 Run: docker-compose up -d"
fi
echo ""

# Check if Prisma client is generated
echo "4. Checking Prisma client..."
if [ -d "lib/generated/prisma" ]; then
    echo "   ✅ Prisma client is generated"
else
    echo "   ⚠️  Prisma client not found"
    echo "   📝 Run: npx prisma generate"
fi
echo ""

# Check if NextAuth files exist
echo "5. Checking NextAuth configuration..."
if [ -f "lib/auth.ts" ] && [ -f "app/api/auth/[...nextauth]/route.ts" ]; then
    echo "   ✅ NextAuth configuration files exist"
else
    echo "   ❌ NextAuth configuration files missing"
    exit 1
fi
echo ""

# Check if registration endpoint exists
echo "6. Checking registration endpoint..."
if [ -f "app/api/auth/register/route.ts" ]; then
    echo "   ✅ Registration endpoint exists"
else
    echo "   ❌ Registration endpoint missing"
    exit 1
fi
echo ""

# Test database connection
echo "7. Testing database connection..."
if npx prisma db execute --stdin <<< "SELECT 1;" > /dev/null 2>&1; then
    echo "   ✅ Database connection successful"
else
    echo "   ⚠️  Could not connect to database"
    echo "   📝 Verify DATABASE_URL and ensure PostgreSQL is running"
fi
echo ""

# Check if dev server is running
echo "8. Checking if dev server is needed..."
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "   ✅ Dev server is running on http://localhost:3000"
    echo ""
    echo "🎯 Quick Test Commands:"
    echo ""
    echo "   Test registration:"
    echo "   curl -X POST http://localhost:3000/api/auth/register \\"
    echo "     -H 'Content-Type: application/json' \\"
    echo "     -d '{\"email\":\"test@example.com\",\"password\":\"Test123!\",\"role\":\"consumer\",\"firstName\":\"Test\",\"lastName\":\"User\"}'"
    echo ""
else
    echo "   ⚠️  Dev server is not running"
    echo "   📝 Start it with: npm run dev"
    echo ""
fi

echo "=========================================================="
echo "✅ Authentication Setup Verification Complete!"
echo ""
echo "📚 Documentation:"
echo "   - AUTH_QUICK_START.md - Quick reference"
echo "   - AUTH_SETUP.md - Detailed documentation"
echo "   - lib/examples/auth-examples.tsx - Code examples"
echo ""
echo "🚀 Next Steps:"
echo "   1. Ensure .env has all required variables"
echo "   2. Start database: docker-compose up -d"
echo "   3. Start dev server: npm run dev"
echo "   4. Test registration using the curl command above"
echo "   5. Build your authentication UI"
echo ""

