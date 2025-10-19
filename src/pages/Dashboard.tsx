import { Sparkles, LogOut, GitBranch, GitPullRequest, GitCommit, Users, Globe, Heart, Code, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProfileCard } from "@/components/ProfileCard";
import { SkillBadge } from "@/components/SkillBadge";
import { ProjectCard } from "@/components/ProjectCard";
import { WorkflowStep } from "@/components/WorkflowStep";
import { BenefitCard } from "@/components/BenefitCard";
import { useNavigate } from "react-router-dom";

// Mock data - will be replaced with real data from backend
const mockData = {
  username: "johndoe",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe",
  analysis_type: "Expert" as const,
  welcome_summary:
    "You're an experienced full-stack developer with a strong focus on modern web technologies. Your repositories demonstrate consistent activity and a deep understanding of React, TypeScript, and cloud architecture. Your commitment to clean code and best practices is evident throughout your projects.",
  top_skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
  project_recommendations: [
    {
      title: "shadcn/ui",
      description:
        "A collection of beautifully designed components built with Radix UI and Tailwind CSS. Perfect for enhancing your UI development skills.",
      github_url: "https://github.com/shadcn/ui",
    },
    {
      title: "tRPC",
      description:
        "End-to-end typesafe APIs with TypeScript. Great for building type-safe full-stack applications.",
      github_url: "https://github.com/trpc/trpc",
    },
    {
      title: "Prisma",
      description:
        "Next-generation ORM for Node.js and TypeScript. Ideal for database management in modern applications.",
      github_url: "https://github.com/prisma/prisma",
    },
  ],
};

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      {/* Header */}
      <header className="border-b bg-background/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">GitProfile AI</span>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/")}
                className="rounded-full"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 space-y-12">
        {/* Profile Section */}
        <section>
          <ProfileCard
            username={mockData.username}
            avatar={mockData.avatar}
            summary={mockData.welcome_summary}
            analysisType={mockData.analysis_type}
          />
        </section>

        {/* Skills Section */}
        <section className="space-y-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div>
            <h2 className="text-3xl font-bold mb-2">Top Skills & Tools</h2>
            <p className="text-muted-foreground">
              Based on your repository analysis and commit history
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {mockData.top_skills.map((skill, index) => (
              <SkillBadge key={skill} skill={skill} index={index} />
            ))}
          </div>
        </section>

        {/* Recommendations Section */}
        <section className="space-y-6 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <div>
            <h2 className="text-3xl font-bold mb-2">Recommended Projects</h2>
            <p className="text-muted-foreground">
              Repositories that match your skills and interests
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockData.project_recommendations.map((project, index) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                github_url={project.github_url}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* GitHub Workflow Section */}
        <section className="space-y-8 animate-fade-in" style={{ animationDelay: "600ms" }}>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-3">How GitHub Workflows Work</h2>
            <p className="text-muted-foreground">
              Understanding the collaborative development process that powers millions of projects
            </p>
          </div>
          
          <div className="card-glass p-8 rounded-2xl">
            <div className="grid md:grid-cols-4 gap-8">
              <WorkflowStep
                icon={GitBranch}
                title="Branch"
                description="Create a branch to work on new features without affecting the main codebase"
                index={0}
              />
              <div className="hidden md:flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
              </div>
              <WorkflowStep
                icon={GitCommit}
                title="Commit"
                description="Save your changes with descriptive messages documenting what you built"
                index={1}
              />
              <div className="hidden md:flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
              </div>
              <WorkflowStep
                icon={GitPullRequest}
                title="Pull Request"
                description="Propose your changes and collaborate with team members through code review"
                index={2}
              />
              <div className="hidden md:flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
              </div>
              <WorkflowStep
                icon={GitBranch}
                title="Merge"
                description="Integrate your reviewed and approved changes into the main project"
                index={3}
              />
            </div>
          </div>
        </section>

        {/* Open Source Benefits Section */}
        <section className="space-y-8 animate-fade-in" style={{ animationDelay: "800ms" }}>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-3">Why Open Source Matters</h2>
            <p className="text-muted-foreground">
              The power of collaborative development and shared knowledge
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BenefitCard
              icon={Users}
              title="Collaboration"
              description="Connect with developers worldwide, learn from experts, and contribute to projects used by millions"
              index={0}
            />
            <BenefitCard
              icon={Lightbulb}
              title="Innovation"
              description="Access cutting-edge solutions, experiment freely, and build on top of proven technologies"
              index={1}
            />
            <BenefitCard
              icon={Code}
              title="Skill Growth"
              description="Learn by reading real-world code, get feedback from maintainers, and build your portfolio"
              index={2}
            />
            <BenefitCard
              icon={Globe}
              title="Community Impact"
              description="Give back to the community, solve real problems, and make software accessible to everyone"
              index={3}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground border-t mt-12 space-y-2">
        <p>Data refreshes on each login • Analysis powered by Gemini AI</p>
        <p className="flex items-center justify-center gap-1">
          Developed with <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" /> by <span className="font-semibold text-foreground">Akash Saha</span>
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
