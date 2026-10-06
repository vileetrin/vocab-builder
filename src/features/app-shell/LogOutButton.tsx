type LogOutButtonProps = {
  disabled: boolean;
  label: string;
  inverted?: boolean;
  onClick: () => void;
};

export default function LogOutButton({
  disabled,
  label,
  inverted = false,
  onClick,
}: LogOutButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-2 font-bold transition-colors disabled:opacity-60 ${
        inverted
          ? "min-h-12 rounded-[30px] px-5 text-base text-text-on-accent hover:bg-text-on-accent/15"
          : "text-sm text-text-secondary hover:text-text-primary"
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        className="h-2.5 w-2.5 -rotate-45 border-r-2 border-b-2 border-current"
      />
    </button>
  );
}
