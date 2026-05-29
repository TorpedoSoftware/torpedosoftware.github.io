import { useState } from "react";
import {
  FieldShell,
  TextInput,
  Select,
  Slider,
  Switch,
  Checkbox,
  RadioGroup,
  DateInput,
  TagInput,
} from "@/components/primitives";

export function InputsSection() {
  const [switchOn, setSwitchOn] = useState(false);
  const [checked, setChecked] = useState<boolean | "indeterminate">(false);
  const [tags, setTags] = useState(["Luau", "Roblox"]);

  return (
    <section className="flex flex-col gap-[var(--space-7)]">
      <div>
        <h2 className="text-metric-lg font-semibold tracking-tight text-text-primary">Inputs</h2>
        <p className="mt-1 text-body text-text-secondary">
          Text, currency, percent, select, slider, switch, checkbox, radio, date, tags.
        </p>
      </div>

      <div className="grid max-w-2xl grid-cols-2 gap-6">
        <FieldShell label="Project name" helper="A short, memorable name">
          <TextInput placeholder="e.g., HashLib" />
        </FieldShell>

        <FieldShell label="Commission price" helper="In USD">
          <TextInput inputType="currency" placeholder="500" />
        </FieldShell>

        <FieldShell label="Completion">
          <TextInput inputType="percent" placeholder="75" />
        </FieldShell>

        <FieldShell label="Player count">
          <TextInput inputType="number" placeholder="100" />
        </FieldShell>

        <FieldShell label="With error" error="This value must be between 1 and 1000.">
          <TextInput inputType="number" defaultValue="5000" error />
        </FieldShell>

        <FieldShell label="Disabled">
          <TextInput disabled placeholder="Not editable" />
        </FieldShell>

        <FieldShell label="Project type">
          <Select
            options={[
              { value: "game", label: "Game" },
              { value: "plugin", label: "Plugin" },
              { value: "module", label: "Open Source Module" },
              { value: "website", label: "Website" },
            ]}
            placeholder="Select type..."
          />
        </FieldShell>

        <FieldShell label="Start date">
          <DateInput />
        </FieldShell>
      </div>

      <div className="max-w-md">
        <FieldShell label="Project progress">
          <Slider
            defaultValue={[60]}
            min={0}
            max={100}
            step={5}
            formatValue={(v) => `${v}%`}
            aria-label="Project progress"
          />
        </FieldShell>
      </div>

      <div className="flex flex-wrap items-center gap-8">
        <label className="flex items-center gap-2 text-body text-text-primary">
          <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
          Dark mode
        </label>

        <label className="flex items-center gap-2 text-body text-text-primary">
          <Checkbox checked={checked} onCheckedChange={setChecked} />
          Show draft posts
        </label>
      </div>

      <div className="max-w-xs">
        <RadioGroup
          defaultValue="featured"
          options={[
            { value: "featured", label: "Featured" },
            { value: "recent", label: "Most Recent" },
            { value: "popular", label: "Most Popular" },
          ]}
        />
      </div>

      <div className="max-w-md">
        <FieldShell label="Tags">
          <TagInput value={tags} onChange={setTags} placeholder="Add a tag..." />
        </FieldShell>
      </div>
    </section>
  );
}
