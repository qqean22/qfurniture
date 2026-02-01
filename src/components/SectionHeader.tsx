interface SectionHeaderProps {
  title: string;
}

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="text-center mb-8 lg:mb-10">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary uppercase tracking-tight">
        {title}
      </h2>
      <div className="mt-3 mx-auto h-0.5 w-16 bg-gold" aria-hidden />
    </div>
  );
}
