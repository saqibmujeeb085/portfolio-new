import { Target, Lightbulb, Code2, TrendingUp } from "lucide-react";

export function AboutStorySection() {
  const features = [
    {
      icon: Target,
      title: "Strategic Thinking",
      description:
        "Every project starts with a clear strategy. We align digital solutions with your business goals to ensure measurable impact.",
    },
    {
      icon: Lightbulb,
      title: "Premium Design",
      description:
        "Design that feels intentional and premium. We craft experiences that resonate with your audience and elevate your brand.",
    },
    {
      icon: Code2,
      title: "Scalable Development",
      description:
        "Built to grow with you. Our development approach ensures your digital presence can evolve as your business expands.",
    },
    {
      icon: TrendingUp,
      title: "Real-World Performance",
      description:
        "We optimize for results. From load times to conversions, every detail is engineered to perform in the real world.",
    },
  ];

  return (
    <section className="bg-background text-foreground">
      <div className="ds-container py-16 md:py-20 xl:py-24">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-4xl text-center md:mb-16">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-foreground/50">
            Who We Are
          </p>
          <h2 className="text-4xl font-semibold leading-[1.1] tracking-[-0.05em] md:text-5xl xl:text-6xl">
            We combine strategy, design, development, and growth thinking
          </h2>
          <p className="mt-6 text-base leading-7 text-foreground/65 md:text-lg">
            Digital experiences should feel intentional from every angle. We
            don't just build websites — we create systems designed to
            communicate, convert, and evolve with your business.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-[32px] border border-surface-border bg-card p-8 shadow-[var(--shadow-soft)] transition-all duration-300 hover:border-foreground/20 hover:shadow-[var(--shadow-medium)] md:p-10"
              >
                {/* Icon */}
                <div className="mb-6 inline-flex rounded-2xl bg-secondary p-4 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6 text-foreground/80" />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-semibold tracking-[-0.02em] md:text-2xl">
                  {feature.title}
                </h3>
                <p className="text-base leading-7 text-foreground/65">
                  {feature.description}
                </p>

                {/* Decorative gradient */}
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-foreground/5 to-transparent opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>

        {/* Bottom Statement */}
        <div className="mt-12 rounded-[32px] border border-surface-border bg-gradient-to-br from-card to-secondary/30 p-8 text-center shadow-[var(--shadow-soft)] md:mt-16 md:p-12">
          <p className="mx-auto max-w-3xl text-lg leading-8 text-foreground/80 md:text-xl md:leading-9">
            "We see websites as living systems — built to support your business
            growth, adapt to market changes, and deliver consistent value over
            time."
          </p>
        </div>
      </div>
    </section>
  );
}
