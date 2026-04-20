const pillars = [
  {
    title: "Strategic Thinking",
    text: "Every project starts with purpose. We shape the work around business goals, user behavior, and long-term scalability.",
  },
  {
    title: "Premium Execution",
    text: "We care deeply about visual quality, motion, structure, and the details that make digital products feel elevated.",
  },
  {
    title: "Scalable Systems",
    text: "From clean architecture to CMS flexibility, we build for teams that want to grow without rebuilding everything later.",
  },
  {
    title: "Growth Alignment",
    text: "We approach digital products with a performance mindset — balancing brand, conversion, and usability together.",
  },
];

export function AboutPillarsSection() {
  return (
    <section className="bg-background text-foreground">
      <div className="ds-container py-16 md:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-foreground/50">
            What Makes Us Different
          </p>
          <h2 className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
            Built with depth, not just decoration.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {pillars.map((item) => (
            <div
              key={item.title}
              className="rounded-[32px] border border-surface-border bg-card p-6 shadow-[var(--shadow-soft)] md:p-8"
            >
              <h3 className="text-2xl font-semibold tracking-[-0.03em]">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-foreground/68 md:text-base md:leading-7">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
