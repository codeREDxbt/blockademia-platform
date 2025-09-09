import React from 'react';

export default function MinimalApp() {
  console.log('MinimalApp is rendering!');
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0a0a0f', 
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🚀 Blockademia Test</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>React is working!</p>
      <div style={{ 
        padding: '10px 20px', 
        backgroundColor: '#ffd700', 
        color: '#0a0a0f',
        borderRadius: '8px',
        fontWeight: 'bold'
      }}>
        Minimal App Loaded Successfully
      </div>
      <p style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.7 }}>
        Check browser console for any errors
      </p>
    </div>
  );
}