import { Github, Sparkles, TrendingUp, Code2, Zap, Heart, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CreativeProjectCard } from "@/components/CreativeProjectCard";
import { FloatingCodeBlock } from "@/components/FloatingCodeBlock";
import { useNavigate } from "react-router-dom";

const creativeProjects = [
  {
    title: "Three.js Portfolio",
    description: "Stunning 3D interactive portfolio website built with WebGL and React. Features particle systems, custom shaders, and smooth animations.",
    tags: ["Three.js", "WebGL", "React", "GLSL"],
    stars: "15.2k",
    forks: "2.8k",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    title: "AI Art Generator",
    description: "Real-time AI-powered art generation using Stable Diffusion. Create unique artwork with natural language prompts.",
    tags: ["Python", "AI/ML", "FastAPI", "React"],
    stars: "23.5k",
    forks: "4.2k",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    title: "Motion Canvas",
    description: "Programmatic animation library for creating educational content. Code-driven approach to video production.",
    tags: ["TypeScript", "Canvas", "Animation"],
    stars: "12.8k",
    forks: "1.5k",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    title: "Terminal Portfolio",
    description: "Interactive terminal-style portfolio with custom shell commands. Nostalgic hacker aesthetic with modern tech.",
    tags: ["Next.js", "TypeScript", "CLI"],
    stars: "8.9k",
    forks: "1.2k",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
  {
    title: "Particle System",
    description: "Physics-based particle effects library with GPU acceleration. Create mesmerizing visual effects with ease.",
    tags: ["JavaScript", "WebGPU", "Physics"],
    stars: "19.3k",
    forks: "3.1k",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
  {
    title: "Code Visualizer",
    description: "Real-time code execution visualizer showing data structures and algorithms in action. Perfect for learning.",
    tags: ["Vue.js", "D3.js", "Education"],
    stars: "11.7k",
    forks: "2.3k",
    gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
  },
];

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

        {/* Creative Showcase Section */}
        <div className="container mx-auto px-4 py-20 relative">
          {/* Floating Code Blocks */}
          <FloatingCodeBlock
            code="git commit -m 'magic'"
            delay={600}
            position="top-10 left-10"
          />
          <FloatingCodeBlock
            code="npm run create"
            delay={800}
            position="top-32 right-20"
          />
          <FloatingCodeBlock
            code="const art = () => 🎨"
            delay={1000}
            position="bottom-32 left-20"
          />
          
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: "500ms" }}>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Rocket className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">
                Creativity Meets <span className="gradient-text">Innovation</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover how developers around the world are pushing boundaries and creating 
                amazing projects on GitHub. From interactive 3D experiences to AI-powered tools.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {creativeProjects.map((project, index) => (
                <CreativeProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  stars={project.stars}
                  forks={project.forks}
                  gradient={project.gradient}
                  index={index}
                />
              ))}
            </div>

            <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "1200ms" }}>
              <p className="text-muted-foreground mb-4">
                Ready to see what your GitHub profile reveals about your creative journey?
              </p>
              <Button
                size="lg"
                className="btn-hero px-8 py-6 rounded-full"
                onClick={() => navigate("/dashboard")}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Start Your Analysis
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground space-y-2">
        <p>Powered by Gemini AI • Secure GitHub OAuth • Built with React</p>
        <p className="flex items-center justify-center gap-1">
          Developed with <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" /> by <span className="font-semibold text-foreground">Akash Saha</span>
        </p>
      </footer>
    </div>
  );
};

export default Index;
