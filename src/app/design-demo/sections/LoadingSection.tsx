import { Spinner, LinearProgress, Skeleton } from "@/components/primitives";

export function LoadingSection() {
  return (
    <section className="flex flex-col gap-[var(--space-7)]">
      <div>
        <h2 className="text-metric-lg font-semibold tracking-tight text-text-primary">Loading</h2>
        <p className="mt-1 text-body text-text-secondary">
          Spinner (16/20/24px), linear progress (determinate + indeterminate), skeleton.
        </p>
      </div>

      <div>
        <h4 className="mb-3 text-body font-semibold text-text-primary">Spinners</h4>
        <div className="flex items-center gap-6 text-primary">
          <Spinner size={16} />
          <Spinner size={20} />
          <Spinner size={24} />
        </div>
      </div>

      <div className="max-w-md">
        <h4 className="mb-3 text-body font-semibold text-text-primary">Linear progress</h4>
        <div className="flex flex-col gap-4">
          <div>
            <span className="text-body-sm text-text-secondary">Determinate (74%)</span>
            <LinearProgress value={7420} max={10000} label="Simulation progress" />
          </div>
          <div>
            <span className="text-body-sm text-text-secondary">Indeterminate</span>
            <LinearProgress label="Loading" />
          </div>
        </div>
      </div>

      <div className="max-w-md">
        <h4 className="mb-3 text-body font-semibold text-text-primary">Skeletons</h4>
        <div className="flex flex-col gap-3">
          <Skeleton width="60%" height={24} />
          <Skeleton width="100%" height={16} />
          <Skeleton width="100%" height={16} />
          <Skeleton width="80%" height={16} />
          <div className="flex gap-3 pt-2">
            <Skeleton width={100} height={36} radius="var(--radius-sm)" />
            <Skeleton width={100} height={36} radius="var(--radius-sm)" />
          </div>
        </div>
      </div>
    </section>
  );
}
