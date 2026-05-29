import { useState, useCallback } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { SideNav } from "@/components/layout/SideNav";
import {
  Palette,
  Type,
  MousePointerClick,
  TextCursorInput,
  CreditCard,
  Table2,
  PanelTop,
  MessageSquare,
  PanelRight,
  Columns3,
  Bell,
  AlertCircle,
  Loader2,
  PackageOpen,
  Tag,
  Navigation,
  Grip,
} from "lucide-react";

import { TokensSection } from "./sections/TokensSection";
import { TypographySection } from "./sections/TypographySection";
import { IconsSection } from "./sections/IconsSection";
import { ButtonsSection } from "./sections/ButtonsSection";
import { InputsSection } from "./sections/InputsSection";
import { CardsSection } from "./sections/CardsSection";
import { TableSection } from "./sections/TableSection";
import { TabsSection } from "./sections/TabsSection";
import { TooltipsSection } from "./sections/TooltipsSection";
import { PopoverSection } from "./sections/PopoverSection";
import { ModalSheetSection } from "./sections/ModalSheetSection";
import { ToastSection } from "./sections/ToastSection";
import { AlertsSection } from "./sections/AlertsSection";
import { LoadingSection } from "./sections/LoadingSection";
import { EmptyStateSection } from "./sections/EmptyStateSection";
import { ChipsTagsBadgesSection } from "./sections/ChipsTagsBadgesSection";
import { NavigationSection } from "./sections/NavigationSection";

const sections = [
  {
    id: "tokens",
    label: "Tokens",
    icon: <Palette size={20} strokeWidth={1.75} />,
  },
  {
    id: "typography",
    label: "Typography",
    icon: <Type size={20} strokeWidth={1.75} />,
  },
  { id: "icons", label: "Icons", icon: <Grip size={20} strokeWidth={1.75} /> },
  {
    id: "buttons",
    label: "Buttons",
    icon: <MousePointerClick size={20} strokeWidth={1.75} />,
  },
  {
    id: "inputs",
    label: "Inputs",
    icon: <TextCursorInput size={20} strokeWidth={1.75} />,
  },
  {
    id: "cards",
    label: "Cards",
    icon: <CreditCard size={20} strokeWidth={1.75} />,
  },
  {
    id: "table",
    label: "Table",
    icon: <Table2 size={20} strokeWidth={1.75} />,
  },
  {
    id: "tabs",
    label: "Tabs",
    icon: <PanelTop size={20} strokeWidth={1.75} />,
  },
  {
    id: "tooltips",
    label: "Tooltips",
    icon: <MessageSquare size={20} strokeWidth={1.75} />,
  },
  {
    id: "popover",
    label: "Popover",
    icon: <PanelRight size={20} strokeWidth={1.75} />,
  },
  {
    id: "modal-sheet",
    label: "Modal & Sheet",
    icon: <Columns3 size={20} strokeWidth={1.75} />,
  },
  { id: "toast", label: "Toast", icon: <Bell size={20} strokeWidth={1.75} /> },
  {
    id: "alerts",
    label: "Alerts",
    icon: <AlertCircle size={20} strokeWidth={1.75} />,
  },
  {
    id: "loading",
    label: "Loading",
    icon: <Loader2 size={20} strokeWidth={1.75} />,
  },
  {
    id: "empty-state",
    label: "Empty State",
    icon: <PackageOpen size={20} strokeWidth={1.75} />,
  },
  {
    id: "chips-tags",
    label: "Chips & Tags",
    icon: <Tag size={20} strokeWidth={1.75} />,
  },
  {
    id: "navigation",
    label: "Navigation",
    icon: <Navigation size={20} strokeWidth={1.75} />,
  },
];

const sectionComponents: Record<string, React.FC> = {
  tokens: TokensSection,
  typography: TypographySection,
  icons: IconsSection,
  buttons: ButtonsSection,
  inputs: InputsSection,
  cards: CardsSection,
  table: TableSection,
  tabs: TabsSection,
  tooltips: TooltipsSection,
  popover: PopoverSection,
  "modal-sheet": ModalSheetSection,
  toast: ToastSection,
  alerts: AlertsSection,
  loading: LoadingSection,
  "empty-state": EmptyStateSection,
  "chips-tags": ChipsTagsBadgesSection,
  navigation: NavigationSection,
};

export function DesignDemoPage() {
  const [activeSection, setActiveSection] = useState("tokens");

  const scrollToSection = useCallback((id: string) => {
    setActiveSection(id);
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <PageShell sidebar={<SideNav items={sections} activeId={activeSection} onSelect={scrollToSection} />}>
      <div className="flex flex-col gap-[var(--space-14)]">
        <div>
          <h1 className="text-display-lg font-normal tracking-tight text-text-primary">Components</h1>
          <p className="mt-2 max-w-xl text-body-lg leading-7 text-text-secondary">
            Every primitive in the design system, rendered in all variants and states. Toggle the theme with
            the moon/sun icon in the top bar.
          </p>
        </div>

        {sections.map(({ id }) => {
          const Component = sectionComponents[id];
          return (
            <div key={id} id={`section-${id}`}>
              <Component />
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}
