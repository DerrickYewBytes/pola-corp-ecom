# Supabase Setup Guide for Pola Corp Backend

## Prerequisites
- A Supabase account (sign up at https://supabase.com)
- Node.js and npm installed

## Step 1: Create a Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `pola-corp` (or your preferred name)
   - Database Password: Create a strong password
   - Region: Choose closest to your users
5. Click "Create new project"

## Step 2: Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://your-project-ref.supabase.co`)
   - **anon public** key
   - **service_role** key (keep this secret!)

3. **IMPORTANT**: For the DATABASE_URL, go to **Settings** → **Database**
   - Copy the **Connection string** (URI format)
   - It should look like: `postgresql://postgres:[password]@[project-ref].supabase.co:5432/postgres`
   - Replace `[password]` with your database password

## Step 3: Set Up Environment Variables

1. Copy `env.example` to `.env`:
   ```bash
   cp env.example .env
   ```

2. Update `.env` with your Supabase credentials:
   ```env
   # Supabase Configuration
   DATABASE_URL=postgresql://postgres:[YOUR-DATABASE-PASSWORD]@[YOUR-PROJECT-REF].supabase.co:5432/postgres
   SUPABASE_URL=https://[YOUR-PROJECT-REF].supabase.co
   SUPABASE_ANON_KEY=[YOUR-ANON-KEY]
   SUPABASE_SERVICE_ROLE_KEY=[YOUR-SERVICE-ROLE-KEY]
   
   # Application Configuration
   NODE_ENV=development
   PORT=3000
   FRONTEND_URL=http://localhost:3001
   ```

## Understanding the URLs

- **DATABASE_URL**: Direct PostgreSQL connection for TypeORM
  - Format: `postgresql://postgres:password@project-ref.supabase.co:5432/postgres`
  - Used by: TypeORM for database operations

- **SUPABASE_URL**: Supabase project URL for client operations
  - Format: `https://project-ref.supabase.co`
  - Used by: Supabase client for auth, real-time, storage

## Step 4: Set Up Database Tables

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `src/scripts/create-tables.sql`
3. Paste and run the SQL script
4. This will create all necessary tables and sample data

## Step 5: Install Dependencies

```bash
npm install
```

## Step 6: Test Your Connection

```bash
npm run build
npm start
```

You should see your application start without database connection errors.

## Step 7: Verify Database Connection

1. Go to **Table Editor** in your Supabase dashboard
2. You should see the following tables:
   - `products`
   - `cart_items`
   - `orders`
   - `order_items`
3. The `products` table should contain 3 sample products

## Environment Variables Explained

- **DATABASE_URL**: Direct PostgreSQL connection string for TypeORM
- **SUPABASE_URL**: Your Supabase project URL
- **SUPABASE_ANON_KEY**: Public key for client-side operations
- **SUPABASE_SERVICE_ROLE_KEY**: Secret key for server-side operations (admin privileges)

## Security Notes

- Never commit your `.env` file to version control
- The `SUPABASE_SERVICE_ROLE_KEY` has admin privileges - keep it secure
- Use Row Level Security (RLS) policies in Supabase for production

## Next Steps

1. Set up Row Level Security policies in Supabase
2. Configure authentication if needed
3. Set up real-time subscriptions for live updates
4. Configure storage buckets for product images

## Troubleshooting

### Connection Issues
- Verify your `DATABASE_URL` format
- Check that your database password is correct
- Ensure your IP is not blocked by Supabase

### SSL Issues
- The configuration already includes `rejectUnauthorized: false` for Supabase
- This is required for Supabase connections

### Table Not Found Errors
- Run the SQL script in Supabase SQL Editor
- Check that table names match your TypeORM entities

### DATABASE_URL Format Issues
- Make sure the URL starts with `postgresql://`
- Verify the password is URL-encoded if it contains special characters
- Check that the project reference is correct
