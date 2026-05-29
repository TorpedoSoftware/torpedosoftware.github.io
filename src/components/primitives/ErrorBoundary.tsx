import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertOctagon, RotateCw } from "lucide-react";
import { Button } from "./Button";
import { Card, CardBody, CardHeader } from "./Card";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
  resetKeys?: ReadonlyArray<unknown>;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.props.onError?.(error, info);
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    if (!this.state.error || !this.props.resetKeys || !prevProps.resetKeys) return;
    const changed =
      prevProps.resetKeys.length !== this.props.resetKeys.length ||
      prevProps.resetKeys.some((k, i) => !Object.is(k, this.props.resetKeys![i]));
    if (changed) this.reset();
  }

  reset = (): void => {
    this.setState({ error: null });
  };

  render(): ReactNode {
    if (this.state.error) {
      if (this.props.fallback) return this.props.fallback(this.state.error, this.reset);
      return <DefaultErrorFallback error={this.state.error} reset={this.reset} />;
    }
    return this.props.children;
  }
}

function DefaultErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex w-full justify-center p-[var(--space-7)]">
      <Card variant="surface" className="max-w-xl">
        <CardHeader>
          <div className="flex items-center gap-[var(--space-3)] text-text-primary">
            <AlertOctagon size={20} className="text-[var(--color-danger)]" />
            <span className="text-heading-sm font-semibold">Something went wrong</span>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-[var(--space-4)]">
          <p className="text-body text-text-secondary">
            An unexpected error prevented this view from rendering.
          </p>
          <pre className="overflow-x-auto rounded-md bg-[var(--color-surface-sunken)] p-[var(--space-3)] text-caption text-text-tertiary">
            {error.message}
          </pre>
          <div>
            <Button variant="secondary" size="sm" icon={<RotateCw size={14} />} onClick={reset}>
              Try again
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
