const uiColors = [
  { token: "--color-canvas", label: "Canvas" },
  { token: "--color-surface", label: "Surface" },
  { token: "--color-surface-raised", label: "Surface Raised" },
  { token: "--color-surface-sunken", label: "Surface Sunken" },
  { token: "--color-border-subtle", label: "Border Subtle" },
  { token: "--color-border", label: "Border" },
  { token: "--color-border-strong", label: "Border Strong" },
  { token: "--color-text-primary", label: "Text Primary" },
  { token: "--color-text-secondary", label: "Text Secondary" },
  { token: "--color-text-tertiary", label: "Text Tertiary" },
  { token: "--color-text-disabled", label: "Text Disabled" },
];

const brandColors = [
  { token: "--color-primary", label: "Primary" },
  { token: "--color-primary-hover", label: "Primary Hover" },
  { token: "--color-primary-pressed", label: "Primary Pressed" },
  { token: "--color-primary-soft", label: "Primary Soft" },
  { token: "--color-accent", label: "Accent" },
  { token: "--color-accent-soft", label: "Accent Soft" },
];

const semanticColors = [
  { token: "--color-success", label: "Success" },
  { token: "--color-success-soft", label: "Success Soft" },
  { token: "--color-warning", label: "Warning" },
  { token: "--color-warning-soft", label: "Warning Soft" },
  { token: "--color-danger", label: "Danger" },
  { token: "--color-danger-soft", label: "Danger Soft" },
  { token: "--color-info", label: "Info" },
  { token: "--color-info-soft", label: "Info Soft" },
];

const vizColors = [
  { token: "--viz-1", label: "Viz 1 (Teal)" },
  { token: "--viz-2", label: "Viz 2 (Rose)" },
  { token: "--viz-3", label: "Viz 3 (Blue)" },
  { token: "--viz-4", label: "Viz 4 (Purple)" },
  { token: "--viz-5", label: "Viz 5 (Wine)" },
  { token: "--viz-6", label: "Viz 6 (Olive)" },
  { token: "--viz-7", label: "Viz 7 (Cyan)" },
  { token: "--viz-8", label: "Viz 8 (Sand)" },
];

const spacingScale = [
  { token: "--space-0", label: "0" },
  { token: "--space-1", label: "1 (2px)" },
  { token: "--space-2", label: "2 (4px)" },
  { token: "--space-3", label: "3 (8px)" },
  { token: "--space-4", label: "4 (12px)" },
  { token: "--space-5", label: "5 (16px)" },
  { token: "--space-6", label: "6 (20px)" },
  { token: "--space-7", label: "7 (24px)" },
  { token: "--space-8", label: "8 (32px)" },
  { token: "--space-9", label: "9 (40px)" },
  { token: "--space-10", label: "10 (48px)" },
  { token: "--space-11", label: "11 (64px)" },
];

const radii = [
  { token: "--radius-xs", label: "XS (2px)" },
  { token: "--radius-sm", label: "SM (4px)" },
  { token: "--radius-md", label: "MD (8px)" },
  { token: "--radius-lg", label: "LG (12px)" },
  { token: "--radius-xl", label: "XL (20px)" },
  { token: "--radius-full", label: "Full" },
];

const shadows = [
  { token: "--shadow-1", label: "Shadow 1 (resting)" },
  { token: "--shadow-2", label: "Shadow 2 (hover)" },
  { token: "--shadow-3", label: "Shadow 3 (popover)" },
  { token: "--shadow-4", label: "Shadow 4 (modal)" },
  { token: "--shadow-focus", label: "Focus" },
];

function ColorGrid({ title, colors }: { title: string; colors: { token: string; label: string }[] }) {
  return (
    <div>
      <h4 className="mb-3 text-body font-semibold text-text-primary">{title}</h4>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3">
        {colors.map((c) => (
          <div key={c.token} className="flex flex-col gap-1">
            <div
              className="h-12 rounded-md border border-[var(--color-border-subtle)]"
              style={{ backgroundColor: `var(${c.token})` }}
            />
            <span className="text-overline font-medium text-text-secondary truncate" title={c.token}>
              {c.label}
            </span>
            <code className="text-overline text-text-tertiary truncate">{c.token}</code>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TokensSection() {
  return (
    <section className="flex flex-col gap-[var(--space-9)]">
      <div>
        <h2 className="text-metric-lg font-semibold tracking-tight text-text-primary">Tokens</h2>
        <p className="mt-1 text-body text-text-secondary">
          Design tokens for color, spacing, radius, and elevation.
        </p>
      </div>

      <ColorGrid title="Neutral ramp" colors={uiColors} />
      <ColorGrid title="Brand & action" colors={brandColors} />
      <ColorGrid title="Semantic" colors={semanticColors} />
      <ColorGrid title="Data visualization" colors={vizColors} />

      <div>
        <h4 className="mb-3 text-body font-semibold text-text-primary">Spacing scale</h4>
        <div className="flex flex-wrap items-end gap-3">
          {spacingScale.map((s) => (
            <div key={s.token} className="flex flex-col items-center gap-1">
              <div
                className="bg-primary/30 rounded-xs"
                style={{
                  width: `var(${s.token})`,
                  height: `var(${s.token})`,
                  minWidth: 4,
                  minHeight: 4,
                }}
              />
              <span className="text-overline text-text-tertiary">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-body font-semibold text-text-primary">Radius</h4>
        <div className="flex flex-wrap items-center gap-4">
          {radii.map((r) => (
            <div key={r.token} className="flex flex-col items-center gap-1">
              <div
                className="h-14 w-14 border-2 border-primary bg-primary-soft"
                style={{ borderRadius: `var(${r.token})` }}
              />
              <span className="text-overline text-text-tertiary">{r.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-body font-semibold text-text-primary">Elevation</h4>
        <div className="flex flex-wrap items-center gap-6">
          {shadows.map((s) => (
            <div key={s.token} className="flex flex-col items-center gap-2">
              <div
                className="flex h-16 w-24 items-center justify-center rounded-md bg-surface text-caption text-text-secondary"
                style={{ boxShadow: `var(${s.token})` }}
              >
                {s.label.split(" ")[1]}
              </div>
              <span className="text-overline text-text-tertiary">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
