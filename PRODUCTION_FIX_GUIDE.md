# Production Deployment Fixes for Blockademia

## Issues Fixed

1. **Replaced hardcoded Supabase config with environment variables**
2. **Improved error handling in AuthContext**
3. **Added production-ready OAuth redirect handling**
4. **Enhanced user profile fetching with fallbacks**
5. **Added proper Vercel configuration**

## Required Supabase Configuration

To fix login functionality on www.blockademia.live, you need to update your Supabase project settings:

### 1. Authentication Settings

Go to your Supabase dashboard (https://supabase.com/dashboard) → Your Project → Authentication → Settings:

**Site URL:** `https://www.blockademia.live`

**Additional Redirect URLs:**
```
https://www.blockademia.live/auth
https://www.blockademia.live/auth/callback
https://blockademia.live/auth
https://blockademia.live/auth/callback
```

### 2. OAuth Provider Configuration

For Google OAuth:
- **Authorized JavaScript origins:** `https://www.blockademia.live`, `https://blockademia.live`
- **Authorized redirect URIs:** `https://ivnxbxbkadumzklsuwob.supabase.co/auth/v1/callback`

For GitHub OAuth:
- **Homepage URL:** `https://www.blockademia.live`
- **Authorization callback URL:** `https://ivnxbxbkadumzklsuwob.supabase.co/auth/v1/callback`

### 3. Database Setup

Make sure you have a `profiles` table with this structure:
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  website TEXT,
  skills TEXT[],
  learning_goals TEXT[],
  profile_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

### 4. Vercel Environment Variables

In your Vercel dashboard, add these environment variables:
- `VITE_SUPABASE_URL` = `https://ivnxbxbkadumzklsuwob.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2bnhieGJrYWR1bXprbHN1d29iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzAyMzMsImV4cCI6MjA3Mjg0NjIzM30.KyuT2oB2v55SeXHGAT7GHn4_waqpF3FuRFNkXIi259s`

## Deployment Steps

1. Commit and push your changes to GitHub
2. Vercel will automatically redeploy
3. Test the authentication at www.blockademia.live

## Testing Authentication

1. Go to www.blockademia.live/auth
2. Try email/password signup and login
3. Test Google and GitHub OAuth (if configured)
4. Check browser console for any errors

## Common Issues & Solutions

**Stuck on Loading:** Usually means Supabase can't connect. Check environment variables.

**OAuth Redirect Errors:** Make sure redirect URLs are properly configured in Supabase.

**Profile Errors:** The code now gracefully handles missing profiles table.

**CORS Errors:** Ensure your domain is added to Supabase allowed origins.

Let me know if you need help with any of these configuration steps!