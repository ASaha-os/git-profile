import React from "react";
import { Sparkles, LogOut, GitBranch, GitPullRequest, GitCommit, Users, Globe, Heart, Code, Lightbulb, ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProfileCard } from "@/components/ProfileCard";
import { SkillBadge } from "@/components/SkillBadge";
import { ProjectCard } from "@/components/ProjectCard";
import { WorkflowStep } from "@/components/WorkflowStep";
import { BenefitCard } from "@/components/BenefitCard";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useGitHubAnalysis } from "@/hooks/useGitHubAnalysis";

// Fallback data for when analysis is loading or fails
const fallbackData = {
  username: "User",
  avatar: "",
  analysis_type: "Beginner" as const,
  welcome_summary: "Welcome! We're analyzing your GitHub profile to provide personalized insights.",
  top_skills: ["Loading..."],
  project_recommendations: [],
};

const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <span className="text-sm">Loading...</span>
  </div>
);

const Dashboard: React.FC = () => {
  const { user, isLoading, isAuthenticated, logout } = useAuth0();
  const { analysis, loading: analysisLoading, error: analysisError, refetch } = useGitHubAnalysis();
  const navigate = useNavigate();

  if (isLoading) return <Loading />;
  if (!isAuthenticated || !user) return <Navigate to="/" replace />;

  // Use real analysis data or fallback
  const displayData = analysis || fallbackData;
  const username = displayData.username;
  const avatar = displayData.avatar || (user.picture as string) || "";
  const summary = displayData.welcome_summary;

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
                onClick={refetch}
                disabled={analysisLoading}
                className="rounded-full"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${analysisLoading ? 'animate-spin' : ''}`} />
                {analysisLoading ? 'Analyzing...' : 'Refresh Analysis'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logout({ returnTo: window.location.origin })}
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
            username={username}
            avatar={avatar}
            summary={summary}
            analysisType={displayData.analysis_type}
          />
        </section>

        {/* Analysis Status */}
        {analysisLoading && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />
              <div>
                <h3 className="font-semibold text-blue-800">Analyzing Your GitHub Profile</h3>
                <p className="text-sm text-blue-600">Fetching repositories, analyzing languages, and generating insights...</p>
              </div>
            </div>
          </div>
        )}

        {analysisError && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 text-red-600">⚠️</div>
              <div>
                <h3 className="font-semibold text-red-800">Analysis Failed</h3>
                <p className="text-sm text-red-600">{analysisError}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refetch}
                  className="mt-2"
                >
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Skills Section */}
        <section className="space-y-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div>
            <h2 className="text-3xl font-bold mb-2">Top Skills & Tools</h2>
            <p className="text-muted-foreground">
              Based on your repository analysis and commit history
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {displayData.top_skills.map((skill, index) => (
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
            {displayData.project_recommendations.map((project, index) => (
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
