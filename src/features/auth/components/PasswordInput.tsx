"use client";

import { useState, type ComponentProps } from "react";

import EyeOffIcon from "@/assets/icons/EyeOffIcon.svg";
import EyeOnIcon from "@/assets/icons/EyeOnIcon.svg";

type PasswordInputProps = Omit<
  ComponentProps<"input">,
  "className" | "id" | "type"
> & {
  className: string;
  label: string;
  error?: string;
  showPasswordLabel: string;
  hidePasswordLabel: string;
};

export default function PasswordInput({
  className,
  label,
  error,
  showPasswordLabel,
  hidePasswordLabel,
  autoComplete = "new-password",
  ...inputProps
}: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div>
      <label htmlFor="password" className="sr-only">
        {label}
      </label>
      <div className="relative">
        <input
          id="password"
          name="password"
          type={isPasswordVisible ? "text" : "password"}
          placeholder={label}
          autoComplete={autoComplete}
          className={`${className} pr-12`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "password-error" : undefined}
          {...inputProps}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-accent-muted focus-visible:bg-accent-muted focus-visible:outline-none"
          aria-label={isPasswordVisible ? hidePasswordLabel : showPasswordLabel}
          aria-controls="password"
          aria-pressed={isPasswordVisible}
          onClick={() => setIsPasswordVisible((current) => !current)}
        >
          {isPasswordVisible ? (
            <EyeOnIcon className="h-5 w-5" />
          ) : (
            <EyeOffIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      {error && (
        <p id="password-error" className="mt-1.5 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}
