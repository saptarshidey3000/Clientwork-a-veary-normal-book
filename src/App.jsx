// App.jsx
import { useEffect, useState } from "react";
import Book from "./components/Book";
import { EarProvider } from "./components/EarContext";
import Loader from "./components/Loader";
import AuthGate from "./components/AuthGate";

function App() {
  const [loading, setLoading] = useState(true); // initial loader
  const [isMobile, setIsMobile] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [postAuthLoading, setPostAuthLoading] = useState(false); // loader after auth

  // Initial loader on mount
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Detect mobile devices
  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isPhone = window.innerWidth <= 768;
    if (isTouchDevice && isPhone) {
      setIsMobile(true);
    }
  }, []);

  // Handle auth success → trigger post-auth loader
  const handleSuccess = () => {
    setAuthenticated(true);
    setPostAuthLoading(true);
    setTimeout(() => setPostAuthLoading(false), 2000); // duration of post-auth loader
  };

  // Mobile block
  if (isMobile) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-center px-4 bg-[#9cb9b7]">
        <p className="text-xl font-semibold text-red-600">
          This experience is only available on iPads and laptops.
        </p>
      </div>
    );
  }

  // Initial loader before auth
  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#9cb9b7]">
        <Loader />
      </div>
    );
  }

  // Post-auth loader
  if (postAuthLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#9cb9b7]">
        <Loader />
      </div>
    );
  }

  // Show auth gate if not authenticated
  if (!authenticated) {
    return <AuthGate onSuccess={handleSuccess} />;
  }

  // Main content
  return (
    <EarProvider>
      <Book />
    </EarProvider>
  );
}

export default App;

