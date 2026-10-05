import { type ChangeEvent, type ComponentProps } from "react";

type AuthTextInputProps = {
  id: string;
  name: string;
  type: "text" | "email";
  label: string;
  value: string;
  className: string;
  errorClassName: string;
  autoComplete: ComponentProps<"input">["autoComplete"];
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function AuthTextInput({
  id,
  name,
  type,
  label,
  value,
  className,
  errorClassName,
  autoComplete,
  error,
  onChange,
}: AuthTextInputProps) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={label}
        autoComplete={autoComplete}
        value={value}
        className={className}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={onChange}
      />
      {error && (
        <p id={errorId} className={errorClassName}>
          {error}
        </p>
      )}
    </div>
  );
}
