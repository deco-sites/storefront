// Example: Client-only component
// This file demonstrates client-only code that should only run in the browser

import { useState, useEffect } from 'preact/hooks';

/**
 * Client-only hook for browser APIs
 */
export function useBrowserAPI() {
  const [isOnline, setIsOnline] = useState(true);
  const [userAgent, setUserAgent] = useState('');

  useEffect(() => {
    // These APIs only exist in the browser
    if (typeof window === 'undefined') return;

    setUserAgent(navigator.userAgent);
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, userAgent };
}

/**
 * Client-only component that uses browser APIs
 */
export default function ClientOnlyComponent() {
  const { isOnline, userAgent } = useBrowserAPI();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render on server
  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div class="client-only">
      <h3>Client-Only Information</h3>
      <p>Status: {isOnline ? 'Online' : 'Offline'}</p>
      <p>User Agent: {userAgent}</p>
      <p>Window size: {window.innerWidth} x {window.innerHeight}</p>

      <LocalStorageDemo />
    </div>
  );
}

/**
 * Component that uses localStorage (browser-only API)
 */
function LocalStorageDemo() {
  const [value, setValue] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('demo-value') || '';
    setValue(stored);
  }, []);

  const handleChange = (e: Event) => {
    const newValue = (e.target as HTMLInputElement).value;
    setValue(newValue);
    localStorage.setItem('demo-value', newValue);
  };

  return (
    <div>
      <label>
        Local Storage Demo:
        <input
          type="text"
          value={value}
          onInput={handleChange}
          placeholder="This will persist in localStorage"
        />
      </label>
    </div>
  );
}

