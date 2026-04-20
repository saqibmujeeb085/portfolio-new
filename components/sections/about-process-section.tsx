const processItems = [
  {
    step: "01",
    title: "Understand",
    text: "We start by understanding the business, the market, and the user journey.",
  },
  {
    step: "02",
    title: "Shape",
    text: "We structure the right content, flow, system, and visual direction around the goal.",
  },
  {
    step: "03",
    title: "Build",
    text: "We translate ideas into robust, scalable digital experiences with clean execution.",
  },
  {
    step: "04",
    title: "Refine",
    text: "We test, improve, and sharpen the experience until it feels complete and effective.",
  },
];

export function AboutProcessSection() {
  return (
    <section className="bg-background text-foreground">
      <div className="ds-container py-16 md:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-foreground/50">
            Our Approach
          </p>
          <h2 className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
            How we move from idea to execution.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
          {processItems.map((item) => (
            <div
              key={item.step}
              className="rounded-[32px] border border-surface-border bg-card p-6 shadow-[var(--shadow-soft)] md:p-8"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-foreground/45">
                {item.step}
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-foreground/68 md:text-base md:leading-7">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
