export default function Loading() {
  return (
    <div className="container mx-auto max-w-6xl animate-fade-in px-4 py-20">
      <div className="mb-12 flex flex-col items-center gap-4">
        <div className="h-10 w-72 animate-shimmer rounded-lg bg-muted/50" style={{ backgroundSize: "200% 100%" }} />
        <div className="h-5 w-48 animate-shimmer rounded-lg bg-muted/50" style={{ backgroundSize: "200% 100%", animationDelay: "0.1s" }} />
      </div>
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-24 animate-shimmer rounded-lg bg-muted/50"
            style={{ backgroundSize: "200% 100%", animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
}
