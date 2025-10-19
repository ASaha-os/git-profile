import { ExternalLink, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  github_url: string;
  index: number;
}

export function ProjectCard({ title, description, github_url, index }: ProjectCardProps) {
  return (
    <Card
      className="card-glass hover:shadow-lg transition-all duration-300 animate-fade-in group"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant="outline"
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
          asChild
        >
          <a href={github_url} target="_blank" rel="noopener noreferrer">
            View Repository
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
