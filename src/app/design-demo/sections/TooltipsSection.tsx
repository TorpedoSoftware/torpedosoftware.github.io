import { Button, Tooltip, RichTooltip } from "@/components/primitives";
import { Info } from "lucide-react";

export function TooltipsSection() {
  return (
    <section className="flex flex-col gap-[var(--space-7)]">
      <div>
        <h2 className="text-metric-lg font-semibold tracking-tight text-text-primary">Tooltips</h2>
        <p className="mt-1 text-body text-text-secondary">
          Compact (12 words or fewer) and rich (body + learn-more link) variants.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <Tooltip content="Open source modules available on GitHub">
          <Button variant="secondary">Hover me (compact)</Button>
        </Tooltip>

        <Tooltip content="This project has been featured in two Fortune Magazine articles." side="right">
          <Button variant="ghost" aria-label="Info">
            <Info size={18} strokeWidth={1.75} />
          </Button>
        </Tooltip>

        <RichTooltip
          content="Luau is the scripting language used by Roblox. It is a fast, small, safe, gradually typed embeddable scripting language derived from Lua 5.1."
          learnMoreHref="#"
        >
          <Button variant="tertiary">Hover me (rich)</Button>
        </RichTooltip>
      </div>
    </section>
  );
}
