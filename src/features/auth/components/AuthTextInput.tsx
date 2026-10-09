import { type ComponentProps } from "react";

type AuthTextInputProps = Omit<ComponentProps<"input">, "className" | "type"> & {
  id: string;
  type: "text" | "email";
  label: string;
  className: string;
  errorClassName: string;
  error?: string;
};

export default function AuthTextInput({
  id,
  type,
  label,
  className,
  errorClassName,
  autoComplete,
  error,
  ...inputProps
}: AuthTextInputProps) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={label}
        autoComplete={autoComplete}
        className={className}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className={errorClassName}>
          {error}
        </p>
      )}
    </div>
  );
}
