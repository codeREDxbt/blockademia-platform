import { useAuth } from '../contexts/AuthContext';

export default function AuthDebugger() {
  const { user, session, isLoading } = useAuth();

  return (
    <div className="fixed top-4 right-4 z-50 bg-black text-white p-4 rounded-lg text-xs max-w-md">
      <h3 className="font-bold mb-2">Auth Debug Info</h3>
      <div>
        <p><strong>isLoading:</strong> {JSON.stringify(isLoading)}</p>
        <p><strong>user exists:</strong> {JSON.stringify(!!user)}</p>
        <p><strong>session exists:</strong> {JSON.stringify(!!session)}</p>
        <p><strong>user email:</strong> {user?.email || 'none'}</p>
        <p><strong>profile complete:</strong> {JSON.stringify(user?.profile?.profile_complete)}</p>
        <p><strong>current path:</strong> {window.location.pathname}</p>
        <p><strong>timestamp:</strong> {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
}