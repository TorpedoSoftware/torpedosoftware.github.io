import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { EmptyState } from "@/components/primitives/EmptyState";
import { Button } from "@/components/primitives/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function NotFoundPage() {
  useDocumentTitle("Page not found · Torpedo Software");
  return (
    <Section>
      <EmptyState
        icon={<Compass size={32} strokeWidth={1.5} />}
        title="Page not found"
        description="That URL doesn't match anything on the site."
        action={
          <Button variant="primary" asChild>
            <Link to="/">Back to home</Link>
          </Button>
        }
      />
    </Section>
  );
}
