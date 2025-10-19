import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function BenefitCard({ icon: Icon, title, description, index }: BenefitCardProps) {
  return (
    <Card
      className="card-glass hover:shadow-lg transition-all duration-300 animate-fade-in group"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <CardContent className="pt-6 text-center space-y-3">
        <div className="h-14 w-14 rounded-full bg-accent/10 border-2 border-accent/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-7 w-7 text-accent" />
        </div>
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
