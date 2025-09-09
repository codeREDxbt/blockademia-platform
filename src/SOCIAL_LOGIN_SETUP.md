# 🔐 Social Login Setup Guide for Blockademia

## ✅ Current Status

Your social login is **already implemented** with:
- **GitHub Login Button** - Ready to use
- **Google Login Button** - Ready to use  
- **OAuth Flow Handling** - Complete in AuthContext
- **UI Components** - Fully designed and responsive

**What happens now:**
- Clicking buttons will show "Provider not enabled" error
- You need to configure OAuth providers in Supabase

## 🚀 Quick Setup Instructions

### Step 1: Access Supabase Dashboard
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your Blockademia project
3. Navigate to **Authentication → Providers**

### Step 2: Configure Google OAuth

#### A. Create Google OAuth App
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google+ API**
4. Go to **Credentials → Create Credentials → OAuth 2.0 Client IDs**
5. Set **Application type** to "Web application"
6. Add these **Authorized redirect URIs**:
   ```
   https://ivnxbxbkadumzklsuwob.supabase.co/auth/v1/callback
   ```

#### B. Configure in Supabase
1. In Supabase Dashboard → Authentication → Providers
2. Find **Google** and enable it
3. Enter your **Client ID** and **Client Secret**
4. Set **Redirect URL** to:
   ```
   https://ivnxbxbkadumzklsuwob.supabase.co/auth/v1/callback
   ```

### Step 3: Configure GitHub OAuth

#### A. Create GitHub OAuth App
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in:
   - **Application name**: Blockademia
   - **Homepage URL**: `https://yourdomain.com` (or your preview URL)
   - **Authorization callback URL**: 
     ```
     https://ivnxbxbkadumzklsuwob.supabase.co/auth/v1/callback
     ```

#### B. Configure in Supabase
1. In Supabase Dashboard → Authentication → Providers
2. Find **GitHub** and enable it
3. Enter your **Client ID** and **Client Secret**

## 🔧 Testing the Setup

After configuration:

1. **Go to `/auth` in your app**
2. **Click "GitHub" or "Google" button**
3. **You'll be redirected to provider login**
4. **After authorization, you'll return to Blockademia**
5. **Your profile will be automatically created**

## 🎯 User Experience Flow

### First-Time Social Login
1. User clicks "Google" or "GitHub"
2. Redirected to provider authorization
3. User grants permissions
4. Returns to Blockademia with account created
5. **Profile setup screen appears** (for new users)
6. User completes profile and starts learning

### Returning User Login
1. User clicks social login button
2. Quick redirect and return
3. **Direct access to dashboard**

## 🛡️ Security Features

### Data Retrieved from Providers
- **Google**: Name, email, profile picture
- **GitHub**: Username, email, profile picture, location

### Privacy & Security
- No passwords stored for social users
- Account linking prevents duplicate accounts
- Secure OAuth 2.0 flow
- Provider permissions can be revoked anytime

## 💡 Advanced Configuration Options

### Custom Scopes (Optional)
You can request additional permissions:

**Google Scopes:**
```
email profile openid
```

**GitHub Scopes:**
```
read:user user:email
```

### Domain Restrictions (Optional)
Limit signups to specific email domains:
- Set in Supabase → Authentication → Settings
- Example: Only allow `@company.com` emails

## 🎨 UI Customization

The social login buttons are fully customized with:
- **Blockchain theme colors**
- **Provider icons** (GitHub & Chrome icons)
- **Hover effects**
- **Loading states**
- **Responsive design**

### Button Styling
```tsx
// GitHub Button
<Button variant="outline" className="w-full">
  <Github className="w-4 h-4 mr-2" />
  GitHub
</Button>

// Google Button  
<Button variant="outline" className="w-full">
  <Chrome className="w-4 h-4 mr-2" />
  Google
</Button>
```

## 📱 Mobile Experience

Social login works perfectly on:
- **Mobile browsers** (iOS Safari, Android Chrome)
- **Desktop browsers**
- **Progressive Web App** mode
- **All screen sizes**

## 🔄 Account Linking

### Multiple Login Methods
Users can access the same account via:
- Email/password
- Google OAuth
- GitHub OAuth

### Account Merging
If a user signs up with email, then later uses Google with the same email:
- Supabase automatically links the accounts
- No duplicate profiles created
- User maintains all progress and data

## ⚠️ Important Notes

### Production Setup
1. **Use HTTPS** for all redirect URLs
2. **Add your production domain** to OAuth apps
3. **Test on actual domain** (not localhost)
4. **Set proper CORS policies**

### Development Testing
- OAuth providers require **real URLs** (not localhost)
- Use your preview/staging URL for testing
- Some providers may block iframe redirects

## 🎯 What Happens Next

After completing OAuth setup:

### ✅ Immediate Benefits
- **One-click registration** for new users
- **Quick login** for returning users
- **Professional user experience**
- **Higher conversion rates**

### 📊 Analytics to Track
- Social vs email signup rates
- Provider preferences (Google vs GitHub)
- User engagement by signup method
- Profile completion rates

## 🆘 Troubleshooting

### Common Issues

**"Provider not enabled" Error:**
- Enable the provider in Supabase Dashboard
- Check Client ID/Secret are entered correctly

**"Redirect URI mismatch" Error:**
- Verify redirect URLs match exactly
- Include the full Supabase callback URL

**"Invalid client" Error:**
- Double-check Client ID and Secret
- Ensure OAuth app is active in provider settings

**Popup blocked:**
- Social login uses redirects, not popups
- Should work even with popup blockers

### Support Resources
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Google OAuth Setup](https://supabase.com/docs/guides/auth/social-login/auth-google)  
- [GitHub OAuth Setup](https://supabase.com/docs/guides/auth/social-login/auth-github)

## 🚀 Ready to Launch!

Your social login implementation is **production-ready**! Just complete the OAuth provider setup and you'll have:

- **Seamless user onboarding**
- **Professional authentication flow**  
- **Multiple login options**
- **Secure OAuth integration**
- **Mobile-optimized experience**

The buttons are live and waiting for configuration! 🎉