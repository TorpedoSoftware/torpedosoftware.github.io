import { Tabs, TabContent } from "@/components/primitives";

export function TabsSection() {
  return (
    <section className="flex flex-col gap-[var(--space-7)]">
      <div>
        <h2 className="text-metric-lg font-semibold tracking-tight text-text-primary">Tabs</h2>
        <p className="mt-1 text-body text-text-secondary">
          Horizontal underline tabs with animated indicator. Vertical tabs for inspector-style panels.
        </p>
      </div>

      <div>
        <h4 className="mb-3 text-body font-semibold text-text-primary">Horizontal</h4>
        <Tabs
          tabs={[
            { value: "overview", label: "Overview" },
            { value: "games", label: "Games" },
            { value: "plugins", label: "Plugins" },
            { value: "oss", label: "Open Source" },
            { value: "disabled", label: "Archived", disabled: true },
          ]}
        >
          <TabContent value="overview">
            <p className="text-body text-text-secondary">
              Overview tab content. Shows a summary of all portfolio sections.
            </p>
          </TabContent>
          <TabContent value="games">
            <p className="text-body text-text-secondary">
              Games tab content. Roblox experiences with play counts and awards.
            </p>
          </TabContent>
          <TabContent value="plugins">
            <p className="text-body text-text-secondary">
              Plugins tab content. Studio tools for the Roblox developer community.
            </p>
          </TabContent>
          <TabContent value="oss">
            <p className="text-body text-text-secondary">
              Open source tab content. Modules, libraries, and community contributions.
            </p>
          </TabContent>
        </Tabs>
      </div>

      <div>
        <h4 className="mb-3 text-body font-semibold text-text-primary">Vertical (Inspector style)</h4>
        <div className="max-w-lg rounded-md border border-[var(--color-border-subtle)] bg-surface">
          <Tabs
            orientation="vertical"
            tabs={[
              { value: "details", label: "Details" },
              { value: "readme", label: "README" },
              { value: "changelog", label: "Changelog" },
            ]}
            className="min-h-[200px]"
          >
            <TabContent value="details" className="flex-1 p-[var(--space-5)]">
              <p className="text-body text-text-secondary">
                Project metadata panel. Edit name, description, tags, and repository URL.
              </p>
            </TabContent>
            <TabContent value="readme" className="flex-1 p-[var(--space-5)]">
              <p className="text-body text-text-secondary">
                Rendered README with usage examples and API docs.
              </p>
            </TabContent>
            <TabContent value="changelog" className="flex-1 p-[var(--space-5)]">
              <p className="text-body text-text-secondary">Version history and release notes.</p>
            </TabContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
