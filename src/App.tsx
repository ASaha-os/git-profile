import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { useAuth0 } from "@auth0/auth0-react";

const queryClient = new QueryClient();

const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <span className="text-sm">Loading...</span>
  </div>
);

const App = () => {
  const { isLoading, isAuthenticated, error, user } = useAuth0();

  // DEBUG: log auth state to the browser console
  // Remove this after debugging
  // eslint-disable-next-line no-console
  console.log("Auth0 state:", { isLoading, isAuthenticated, error, user });

  // Show error info in UI so we can see issues without opening devtools
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-lg bg-red-50 border border-red-200 p-6 rounded">
          <h2 className="text-lg font-semibold text-red-700 mb-2">
            Auth0 initialization error
          </h2>
          <p className="text-sm text-red-600 mb-2">{error?.message}</p>
          <pre className="text-xs text-muted-foreground">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  if (isLoading) return <Loading />;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public landing / login */}
              <Route
                path="/"
                element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Index />}
              />

              {/* Protected dashboard */}
              <Route
                path="/dashboard"
                element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />}
              />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
