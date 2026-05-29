export function TypographySection() {
  return (
    <section className="flex flex-col gap-[var(--space-7)]">
      <div>
        <h2 className="text-metric-lg font-semibold tracking-tight text-text-primary">Typography</h2>
        <p className="mt-1 text-body text-text-secondary">
          Inter (sans) + Big Shoulders Display (display). All numeric columns use tabular numerals.
        </p>
      </div>

      <div className="flex flex-col gap-[var(--space-5)]">
        <TypeSample
          label="display-xl"
          size={64}
          leading={68}
          weight={400}
          tracking={-0.02}
          display
          text="boatbomber"
        />
        <TypeSample
          label="display-lg"
          size={48}
          leading={54}
          weight={400}
          tracking={-0.015}
          display
          text="Portfolio"
        />
        <TypeSample
          label="display-md"
          size={36}
          leading={44}
          weight={500}
          tracking={-0.01}
          text="Open Source Projects"
        />
        <TypeSample
          label="heading-lg"
          size={28}
          leading={36}
          weight={600}
          tracking={-0.005}
          text="Games and Experiences"
        />
        <TypeSample
          label="heading-md"
          size={22}
          leading={30}
          weight={600}
          tracking={-0.0025}
          text="Roblox Studio Plugins"
        />
        <TypeSample
          label="heading-sm"
          size={18}
          leading={26}
          weight={600}
          tracking={0}
          text="Accolades and Appearances"
        />
        <TypeSample
          label="body-lg"
          size={17}
          leading={26}
          weight={400}
          tracking={0}
          text="Building tools and experiences that push the boundaries of the Roblox platform."
        />
        <TypeSample
          label="body"
          size={15}
          leading={24}
          weight={400}
          tracking={0}
          text="A lot of my work is done free and open source. That benefits everyone in the community."
        />
        <TypeSample
          label="body-sm"
          size={13}
          leading={20}
          weight={400}
          tracking={0.005}
          text="Helper text appears below inputs to provide context."
        />
        <TypeSample
          label="caption"
          size={12}
          leading={16}
          weight={500}
          tracking={0.02}
          text="PUBLISHED · MAY 2026"
        />
        <TypeSample
          label="overline"
          size={11}
          leading={16}
          weight={600}
          tracking={0.08}
          text="OPEN SOURCE PROJECTS"
          uppercase
        />
      </div>

      <div>
        <h4 className="mb-3 text-body font-semibold text-text-primary">Metric tokens (tabular numerals)</h4>
        <div className="flex flex-wrap items-end gap-8">
          <div className="flex flex-col">
            <span className="text-overline font-semibold uppercase tracking-[0.08em] text-text-tertiary">
              metric-xl
            </span>
            <span className="text-metric-xl font-semibold leading-[44px] tracking-tight tabular-nums text-text-primary">
              2,840
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-overline font-semibold uppercase tracking-[0.08em] text-text-tertiary">
              metric-lg
            </span>
            <span className="text-metric-lg font-semibold leading-8 tracking-tight tabular-nums text-text-primary">
              19
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-overline font-semibold uppercase tracking-[0.08em] text-text-tertiary">
              metric-md
            </span>
            <span className="text-metric-md font-semibold leading-6 tracking-tight tabular-nums text-text-primary">
              5
            </span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-body font-semibold text-text-primary">Numeric formatting</h4>
        <div className="flex flex-col gap-1 text-body tabular-nums text-text-primary">
          <span>Count (large): 2,840</span>
          <span>Count (small): 48</span>
          <span>Percentage: 75%</span>
          <span>Date: May 24, 2026</span>
        </div>
      </div>
    </section>
  );
}

function TypeSample({
  label,
  size,
  leading,
  weight,
  tracking,
  text,
  display,
  uppercase,
}: {
  label: string;
  size: number;
  leading: number;
  weight: number;
  tracking: number;
  text: string;
  display?: boolean;
  uppercase?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-overline text-text-tertiary">
        {label} · {size}/{leading} · {weight}
        {tracking !== 0 ? ` · ${tracking > 0 ? "+" : ""}${(tracking * 100).toFixed(1)}%` : ""}
      </span>
      <span
        style={{
          fontSize: size,
          lineHeight: `${leading}px`,
          fontWeight: weight,
          letterSpacing: `${tracking}em`,
          fontFamily: display ? "var(--font-display)" : "var(--font-sans)",
          textTransform: uppercase ? "uppercase" : undefined,
        }}
        className="text-text-primary"
      >
        {text}
      </span>
    </div>
  );
}
