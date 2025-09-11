import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Basic diagnostic component
function DiagnosticApp() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold text-primary">⚡ BLOCKADEMIA</h1>
            <div className="text-lg text-muted-foreground">
              Diagnostic Mode - Checking Components
            </div>
            
            <div className="grid gap-4 text-left max-w-md mx-auto">
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold text-accent">✅ React Router</h3>
                <p className="text-sm text-muted-foreground">Working</p>
              </div>
              
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold text-accent">✅ Tailwind Classes</h3>
                <p className="text-sm text-muted-foreground">CSS Variables Loading</p>
              </div>
              
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold text-accent">✅ Entry Point</h3>
                <p className="text-sm text-muted-foreground">/src/main.tsx → /src/App.tsx</p>
              </div>
            </div>
            
            <Routes>
              <Route path="/" element={
                <div className="mt-8 p-4 border-2 border-primary rounded-lg bg-primary/10">
                  <h2 className="text-xl font-semibold">🎉 Application Loading Successfully!</h2>
                  <p className="mt-2">Ready to switch back to full app</p>
                </div>
              } />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default DiagnosticApp;
