function EmergencyApp() {
  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      backgroundColor: '#0a0a0f',
      color: '#ffd700',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }
  }, [
    React.createElement('h1', { key: 'title', style: { fontSize: '3rem', marginBottom: '1rem' } }, '🚀 BLOCKADEMIA EMERGENCY'),
    React.createElement('p', { key: 'status', style: { fontSize: '1.5rem', marginBottom: '1rem' } }, 'Emergency App Loaded - React is Working!'),
    React.createElement('div', { 
      key: 'info',
      style: {
        padding: '20px',
        backgroundColor: '#1a1a24',
        borderRadius: '10px',
        border: '2px solid #ffd700'
      }
    }, [
      React.createElement('p', { key: 'p1' }, 'If you see this, React is rendering correctly.'),
      React.createElement('p', { key: 'p2' }, 'The issue was a conflicting root App.tsx file.'),
      React.createElement('p', { key: 'p3' }, 'We can now switch back to your full application.')
    ])
  ]);
}

// Use React as a global - this works even if imports fail
const React = (window as any).React || require('react');

export default EmergencyApp;
