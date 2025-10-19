import { LucideIcon } from "lucide-react";

interface WorkflowStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function WorkflowStep({ icon: Icon, title, description, index }: WorkflowStepProps) {
  return (
    <div
      className="flex flex-col items-center text-center space-y-3 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="h-16 w-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <h4 className="font-semibold text-lg">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
