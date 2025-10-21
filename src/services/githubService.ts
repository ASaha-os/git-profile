// src/services/githubService.ts

// 1. ADD THIS LINE: Reads the API URL from your environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// --- INTERFACES (No changes) ---
interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  language: string;
  languages_url: string;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  topics: string[];
}

interface GitHubLanguages {
  [language: string]: number;
}

interface ProfileAnalysis {
  username: string;
  avatar: string;
  analysis_type: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  welcome_summary: string;
  top_skills: string[];
  project_recommendations: {
    title: string;
    description: string;
    github_url: string;
  }[];
}

// --- GITHUB SERVICE CLASS (No changes to most methods) ---
export class GitHubService {
  private static instance: GitHubService;
  private githubToken: string | null = null;

  private constructor() {}

  static getInstance(): GitHubService {
    if (!GitHubService.instance) {
      GitHubService.instance = new GitHubService();
    }
    return GitHubService.instance;
  }

  setToken(token: string) {
    this.githubToken = token;
  }

  private async fetchWithAuth(url: string): Promise<any> {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (this.githubToken) {
      headers['Authorization'] = `token ${this.githubToken}`;
    }

    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Please try again later.');
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getUserData(username: string): Promise<GitHubUser> {
    const url = `https://api.github.com/users/${username}`;
    return this.fetchWithAuth(url);
  }

  async getUserRepositories(username: string, page = 1, perPage = 100): Promise<GitHubRepo[]> {
    const url = `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated&direction=desc`;
    return this.fetchWithAuth(url);
  }

  async getRepositoryLanguages(repoFullName: string): Promise<GitHubLanguages> {
    const url = `https://api.github.com/repos/${repoFullName}/languages`;
    return this.fetchWithAuth(url);
  }

  async getAllUserLanguages(username: string): Promise<GitHubLanguages> {
    const repos = await this.getUserRepositories(username);
    const allLanguages: GitHubLanguages = {};
    
    // Get languages for each repository (limit to first 10 repos to avoid rate limits)
    const reposToAnalyze = repos.slice(0, 10);
    
    for (const repo of reposToAnalyze) {
      try {
        const languages = await this.getRepositoryLanguages(repo.full_name);
        for (const [language, bytes] of Object.entries(languages)) {
          allLanguages[language] = (allLanguages[language] || 0) + bytes;
        }
      } catch (error) {
        console.warn(`Failed to fetch languages for repo ${repo.full_name}:`, error);
      }
    }
    
    return allLanguages;
  }

  // --- THIS IS THE MODIFIED FUNCTION ---
  async analyzeProfileWithGemini(username: string): Promise<ProfileAnalysis> {
    try {
      console.log(`Starting analysis for user: ${username}`);
      
      // Fetch user data and repositories (Same as before)
      const [userData, repos, languages] = await Promise.all([
        this.getUserData(username),
        this.getUserRepositories(username),
        this.getAllUserLanguages(username)
      ]);

      console.log('Fetched GitHub data:', { userData, reposCount: repos.length, languages });

      // Prepare data for Gemini AI analysis (Same as before)
      const analysisData = {
        user: {
          username: userData.login,
          name: userData.name,
          bio: userData.bio,
          public_repos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          created_at: userData.created_at,
          avatar_url: userData.avatar_url
        },
        repositories: repos.slice(0, 20).map(repo => ({
          name: repo.name,
          description: repo.description,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          created_at: repo.created_at,
          topics: repo.topics
        })),
        languages: languages
      };

      // 2. REMOVED MOCK CALL:
      // const analysis = this.createMockAnalysis(analysisData);
      
      // 3. ADDED REAL BACKEND CALL:
      console.log('Sending data to backend for analysis at:', `${API_BASE_URL}/api/analyze`);
      
      const response = await fetch(`${API_BASE_URL}/api/analyze`, { // <-- CHECK YOUR BACKEND ENDPOINT
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(analysisData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend API error response:', errorText);
        throw new Error(`Backend API error: ${response.status} ${response.statusText}`);
      }

      const analysis: ProfileAnalysis = await response.json();
      
      console.log('Generated analysis from backend:', analysis);
      return analysis;

    } catch (error) {
      console.error('Error analyzing profile:', error);
      // Check if error is an instance of Error to access message property
      if (error instanceof Error) {
        throw new Error(`Failed to analyze GitHub profile: ${error.message}`);
      } else {
        throw new Error('An unknown error occurred during profile analysis.');
      }
    }
  }

  // --- MOCK FUNCTIONS (No changes, left here just in case) ---
  private createMockAnalysis(data: any): ProfileAnalysis {
    const { user, repositories, languages } = data;
    
    // Analyze languages to determine top skills
    const sortedLanguages = Object.entries(languages)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 5)
      .map(([lang]) => lang);

    // Determine analysis type based on activity and repository count
    let analysisType: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    if (user.public_repos < 5) {
      analysisType = "Beginner";
    } else if (user.public_repos < 15) {
      analysisType = "Intermediate";
    } else if (user.public_repos < 30) {
      analysisType = "Advanced";
    } else {
      analysisType = "Expert";
    }

    // Create welcome summary
    const welcomeSummary = this.generateWelcomeSummary(user, repositories, analysisType);

    // Generate project recommendations based on skills
    const projectRecommendations = this.generateProjectRecommendations(sortedLanguages);

    return {
      username: user.username,
      avatar: user.avatar_url,
      analysis_type: analysisType,
      welcome_summary: welcomeSummary,
      top_skills: sortedLanguages.length > 0 ? sortedLanguages : ["JavaScript", "HTML", "CSS"],
      project_recommendations: projectRecommendations
    };
  }

  private generateWelcomeSummary(user: any, repos: any[], analysisType: string): string {
    const repoCount = user.public_repos;
    const followerCount = user.followers;
    const topRepo = repos[0];
    
    const summaries = {
      Beginner: `Welcome ${user.name || user.username}! You're starting your coding journey with ${repoCount} repositories. ${topRepo ? `Your most recent project "${topRepo.name}" shows great potential.` : 'Keep building and sharing your projects!'} Every expert was once a beginner.`,
      Intermediate: `Hello ${user.name || user.username}! You've built ${repoCount} repositories and have ${followerCount} followers. Your consistent development activity shows dedication to learning and growing as a developer. ${topRepo ? `Your project "${topRepo.name}" demonstrates solid understanding.` : ''}`,
      Advanced: `Greetings ${user.name || user.username}! With ${repoCount} repositories and ${followerCount} followers, you're clearly an experienced developer. Your code quality and project diversity show expertise in modern development practices.`,
      Expert: `Welcome back, ${user.name || user.username}! Your ${repoCount} repositories and ${followerCount} followers showcase your expertise in software development. You're a valuable contributor to the open source community.`
    };

    return summaries[analysisType] || summaries.Intermediate;
  }

  private generateProjectRecommendations(skills: string[]): any[] {
    const recommendations = [
      {
        title: "shadcn/ui",
        description: "Beautifully designed components built with Radix UI and Tailwind CSS. Perfect for enhancing your UI development skills.",
        github_url: "https://github.com/shadcn/ui",
      },
      {
        title: "tRPC",
        description: "End-to-end typesafe APIs with TypeScript. Great for building type-safe full-stack applications.",
        github_url: "https://github.com/trpc/trpc",
      },
      {
        title: "Prisma",
        description: "Next-generation ORM for Node.js and TypeScript. Ideal for database management in modern applications.",
        github_url: "https://github.com/prisma/prisma",
      },
    ];

    // Customize recommendations based on skills
    if (skills.includes('Python')) {
      recommendations.push({
        title: "FastAPI",
        description: "Modern, fast web framework for building APIs with Python. Perfect for Python developers.",
        github_url: "https://github.com/tiangolo/fastapi",
      });
    }

    if (skills.includes('React')) {
      recommendations.push({
        title: "Next.js",
        description: "The React Framework for Production. Build full-stack React applications with ease.",
        github_url: "https://github.com/vercel/next.js",
      });
    }

    return recommendations.slice(0, 4);
  }
}

export const githubService = GitHubService.getInstance();