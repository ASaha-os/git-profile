interface FloatingCodeBlockProps {
  code: string;
  delay: number;
  position: string;
}

export function FloatingCodeBlock({ code, delay, position }: FloatingCodeBlockProps) {
  return (
    <div
      className={`absolute ${position} opacity-0 animate-fade-in hidden lg:block`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="card-glass p-3 rounded-lg border border-primary/20 transform hover:scale-110 transition-transform duration-300">
        <code className="text-xs font-mono text-primary">{code}</code>
      </div>
    </div>
  );
}
