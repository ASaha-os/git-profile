import { Github, Sparkles, TrendingUp, Code2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">GitProfile AI</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Heading */}
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Discover Your{" "}
              <span className="gradient-text">GitHub Identity</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              AI-powered analysis of your coding journey. Get personalized insights,
              skill assessments, and tailored project recommendations.
            </p>
          </div>

          {/* CTA Button */}
          <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <Button
              size="lg"
              className="btn-hero text-lg px-8 py-6 rounded-full"
              onClick={() => navigate("/dashboard")}
            >
              <Github className="mr-2 h-5 w-5" />
              Analyze My Profile - Login with GitHub
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Free • Secure • Instant Analysis
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <div className="card-glass p-6 rounded-2xl">
              <Code2 className="h-10 w-10 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">AI-Powered Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Gemini AI analyzes your repositories, commits, and coding patterns
              </p>
            </div>
            
            <div className="card-glass p-6 rounded-2xl">
              <TrendingUp className="h-10 w-10 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Skill Assessment</h3>
              <p className="text-sm text-muted-foreground">
                Discover your top programming languages and expertise level
              </p>
            </div>
            
            <div className="card-glass p-6 rounded-2xl">
              <Zap className="h-10 w-10 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Smart Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                Get personalized project suggestions based on your profile
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
        <p>Powered by Gemini AI • Secure GitHub OAuth • Built with React</p>
      </footer>
    </div>
  );
};

export default Index;
