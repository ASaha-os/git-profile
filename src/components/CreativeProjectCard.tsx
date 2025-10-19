import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star, GitFork } from "lucide-react";

interface CreativeProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  stars: string;
  forks: string;
  gradient: string;
  index: number;
}

export function CreativeProjectCard({
  title,
  description,
  tags,
  stars,
  forks,
  gradient,
  index,
}: CreativeProjectCardProps) {
  return (
    <Card
      className="group relative overflow-hidden card-glass hover:shadow-2xl transition-all duration-500 cursor-pointer animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Gradient Background */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{ background: gradient }}
      />
      
      <CardContent className="pt-6 space-y-4 relative z-10">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
            {title}
          </h3>
          <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>{stars}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="h-4 w-4" />
            <span>{forks}</span>
          </div>
        </div>
      </CardContent>
      
      {/* Animated border effect */}
      <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 rounded-lg transition-all duration-500" />
    </Card>
  );
}
