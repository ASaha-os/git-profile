import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { githubService } from '../services/githubService';

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

interface UseGitHubAnalysisReturn {
  analysis: ProfileAnalysis | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useGitHubAnalysis = (): UseGitHubAnalysisReturn => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [analysis, setAnalysis] = useState<ProfileAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalysis = async () => {
    if (!user) {
      setError('User not authenticated');
      return;
    }

    const username = user.nickname || user.name;
    if (!username) {
      setError('GitHub username not found');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Try to get GitHub access token from Auth0
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: 'https://api.github.com',
          },
        });
        githubService.setToken(accessToken);
      } catch (tokenError) {
        console.warn('Could not get GitHub access token, using public API:', tokenError);
        // Continue without token - will use public GitHub API with rate limits
      }

      const result = await githubService.analyzeProfileWithGemini(username);
      setAnalysis(result);
    } catch (err) {
      console.error('Error fetching GitHub analysis:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze GitHub profile');
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchAnalysis();
  };

  useEffect(() => {
    if (user) {
      fetchAnalysis();
    }
  }, [user]);

  return {
    analysis,
    loading,
    error,
    refetch,
  };
};

