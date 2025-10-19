interface SkillBadgeProps {
  skill: string;
  index: number;
}

export function SkillBadge({ skill, index }: SkillBadgeProps) {
  return (
    <div
      className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm hover:bg-primary/20 transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {skill}
    </div>
  );
}
