import clsx from "clsx";

type ProgressCircleProps = {
    value: number;
    label: string;
    classes: {
        outCircleClass?: string;
        inCircleClass?: string;
    };
    showValue?: boolean;
    valueLabel?: string;
    valueText?: string;
};

export default function ProgressCircle({
    value,
    label,
    classes,
    showValue = false,
    valueLabel,
    valueText
}: ProgressCircleProps) {
    const progress = Math.min(100, Math.max(0, value));

    return (
        <div
            aria-label={label}
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={progress}
            aria-valuetext={valueText}
            className={clsx("grid shrink-0 place-items-center rounded-full", classes.outCircleClass)}
            role="progressbar"
            style={{
                background: `conic-gradient(var(--color-accent) ${progress}%, var(--color-accent-muted) 0)`
            }}
        >
            <span
                className={clsx(
                    "flex items-center justify-center rounded-full bg-white text-base text-text-primary",
                    classes.inCircleClass
                )}
            >
                {showValue && (valueLabel ?? value)}
            </span>
        </div>
    );
}
