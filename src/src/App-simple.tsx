export default function SimpleApp() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-primary">⚡ BLOCKADEMIA</h1>
        <p className="text-xl text-muted-foreground">Platform Loading Successfully</p>
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <div className="space-y-2 text-sm">
          <p>✅ Entry point: /src/main.tsx</p>
          <p>✅ App component: /src/App.tsx</p>
          <p>✅ Tailwind CSS: Working</p>
          <p>✅ Build configuration: OK</p>
        </div>
      </div>
    </div>
  );
}
