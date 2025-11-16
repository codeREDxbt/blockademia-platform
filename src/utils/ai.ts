/**
 * Minimal AI integration scaffold.
 * - Uses `VITE_AI_PROVIDER` and `VITE_AI_API_KEY` in `.env` (examples below).
 * - If no API key is set, it replies with a simple local mock for preview.
 *
 * Example .env lines (not checked into repo):
 * VITE_AI_PROVIDER=openai
 * VITE_AI_API_KEY=xai-xxx
 * VITE_AI_MODEL=grok-beta
 * VITE_AI_BASE_URL=https://api.x.ai/v1
 */

export async function sendAIMessage(prompt: string) {
  // Minimal guard: return mock if no key
  if (!import.meta.env.VITE_AI_API_KEY || !import.meta.env.VITE_AI_PROVIDER) {
    // Friendly mocking with a hint of humor - return various responses
    const demoResponses = [
      `I'm just a demo bot! You asked about "${prompt.substring(0, 50)}..." — connect a real AI key in .env for smart answers! 🤖`,
      `Demo mode activated! Your question: "${prompt.substring(0, 40)}..." sounds interesting. Add VITE_AI_API_KEY to get real responses.`,
      `I'm not a real AI yet! To answer "${prompt.substring(0, 45)}..." properly, set up your AI provider in the .env file. Check the README! 📚`,
      `Beep boop! Demo bot here. "${prompt.substring(0, 40)}..." is a great question, but I need API keys to give you a real answer. 🔑`
    ];
    return demoResponses[Math.floor(Math.random() * demoResponses.length)];
  }

  try {
    const provider = import.meta.env.VITE_AI_PROVIDER?.toLowerCase();
    const apiKey = import.meta.env.VITE_AI_API_KEY;
    const proxy = import.meta.env.VITE_AI_PROXY; // optional proxy endpoint to keep keys server-side
    const model = import.meta.env.VITE_AI_MODEL || '';

    // If a proxy endpoint is used, prefer server-side call to keep keys secret
    if (proxy) {
      const res = await fetch(proxy, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      return data?.response || 'No response from proxy';
    }

    if (provider === 'openai') {
      // OpenAI-compatible API (works with xAI, OpenAI, Groq, OpenRouter)
      const baseUrl = import.meta.env.VITE_AI_BASE_URL || 'https://api.openai.com/v1';
      
      try {
        const res = await fetch(`${baseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ 
            model: model || 'gpt-3.5-turbo', 
            messages: [
              { 
                role: 'system', 
                content: 'You are a helpful AI assistant for Blockademia, a blockchain education platform. Be friendly, concise, and informative.' 
              },
              { 
                role: 'user', 
                content: prompt 
              }
            ],
            max_tokens: 1000,
            temperature: 0.7
          }),
        });
        
        if (!res.ok) {
          const errorText = await res.text();
          console.error('AI API error status:', res.status, errorText);
          
          // Try to parse error for better message
          let errorMsg = 'Connection issue';
          try {
            const errorData = JSON.parse(errorText);
            errorMsg = errorData.error?.message || errorData.message || errorMsg;
          } catch (e) {
            // Use default message
          }
          
          return `AI service error (${res.status}): ${errorMsg}. Check your API key and try again!`;
        }
        
        const data = await res.json();
        return data?.choices?.[0]?.message?.content || 'No response received from AI.';
      } catch (fetchError: any) {
        console.error('Fetch error:', fetchError);
        return `Network error: ${fetchError.message || 'Could not reach AI service'}. Check your internet connection!`;
      }
    }

    if (provider === 'claude') {
      // Claude / Anthropic example
      const res = await fetch('https://api.anthropic.com/v1/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ model, prompt }),
      });
      const data = await res.json();
      return data?.completion || 'No response from Claude';
    }

    return 'AI provider not configured correctly. Please check your .env file and set VITE_AI_PROVIDER to openai (for xAI/Grok/OpenAI) or claude.';
  } catch (error) {
    console.error('AI request failed:', error);
    return 'Sorry, I encountered an error trying to reach the AI service. Please check your configuration and try again.';
  }
}
