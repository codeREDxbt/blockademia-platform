import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-ee2f9f16/health", (c) => {
  return c.json({ status: "ok" });
});

// User signup endpoint
app.post("/make-server-ee2f9f16/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    if (!email || !password || !name) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        full_name: name,
        name: name 
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error("Signup error:", error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      user: data.user,
      message: "User created successfully" 
    });
  } catch (error) {
    console.error("Signup error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Password reset endpoint
app.post("/make-server-ee2f9f16/reset-password", async (c) => {
  try {
    const { email } = await c.req.json();
    
    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }

    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'recovery',
      email: email,
    });

    if (error) {
      console.error("Password reset error:", error);
      return c.json({ error: "Failed to generate reset link" }, 400);
    }

    // In a production environment, you would send this link via email
    // For now, we'll return it in the response for testing
    console.log("Password reset link:", data.properties?.action_link);
    
    return c.json({ 
      message: "Password reset link generated successfully",
      // Remove this in production - links should only be sent via email
      resetLink: data.properties?.action_link
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Update password endpoint
app.post("/make-server-ee2f9f16/update-password", async (c) => {
  try {
    const { password } = await c.req.json();
    const accessToken = c.req.header("Authorization")?.split(" ")[1];
    
    if (!accessToken) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    if (!password) {
      return c.json({ error: "Password is required" }, 400);
    }

    const { data, error } = await supabase.auth.admin.updateUserById(
      '', // User ID would be extracted from token in real implementation
      { password }
    );

    if (error) {
      console.error("Password update error:", error);
      return c.json({ error: "Failed to update password" }, 400);
    }

    return c.json({ 
      message: "Password updated successfully" 
    });
  } catch (error) {
    console.error("Password update error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// User profile endpoints
app.get("/make-server-ee2f9f16/profile/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const accessToken = c.req.header("Authorization")?.split(" ")[1];
    
    if (!accessToken) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Get profile from KV store
    const profile = await kv.get(`profile:${userId}`);
    
    return c.json({ profile });
  } catch (error) {
    console.error("Get profile error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

app.put("/make-server-ee2f9f16/profile/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const accessToken = c.req.header("Authorization")?.split(" ")[1];
    
    if (!accessToken) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error || user.id !== userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const profileData = await c.req.json();
    
    // Save profile to KV store
    await kv.set(`profile:${userId}`, profileData);
    
    return c.json({ 
      profile: profileData,
      message: "Profile updated successfully" 
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

Deno.serve(app.fetch);
