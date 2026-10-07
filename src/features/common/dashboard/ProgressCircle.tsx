type ProgressCircleProps = {
  value: number;
  label: string;
};

export default function ProgressCircle({ value, label }: ProgressCircleProps) {
  const progress = Math.min(100, Math.max(0, value));

  return (
    <div
      aria-label={label}
      className="grid h-5 w-5 shrink-0 place-items-center rounded-full md:h-7 md:w-7"
      role="img"
      style={{
        background: `conic-gradient(var(--color-accent) ${progress}%, var(--color-accent-muted) 0)`,
      }}
    >
      <span className="h-3 w-3 rounded-full bg-white md:h-4.5 md:w-4.5" />
    </div>
  );
}
