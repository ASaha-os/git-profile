import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileCardProps {
  username: string;
  avatar: string;
  summary: string;
  analysisType: "Expert" | "Beginner";
}

export function ProfileCard({ username, avatar, summary, analysisType }: ProfileCardProps) {
  return (
    <Card className="card-glass border-2 animate-fade-in">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-primary/20">
            <AvatarImage src={avatar} alt={username} />
            <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-3 mb-3">
              <h2 className="text-2xl font-bold">{username}</h2>
              <Badge 
                variant={analysisType === "Expert" ? "default" : "secondary"}
                className="px-4 py-1"
              >
                {analysisType === "Expert" ? "🚀 Expert Developer" : "🌱 New Contributor"}
              </Badge>
            </div>
            <p className="text-muted-foreground leading-relaxed">{summary}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
