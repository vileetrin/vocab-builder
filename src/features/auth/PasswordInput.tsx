"use client";

import { useState, type ChangeEvent } from "react";

import EyeOffIcon from "@/assets/icons/EyeOffIcon.svg";
import EyeOnIcon from "@/assets/icons/EyeOnIcon.svg";

type PasswordInputProps = {
  value: string;
  className: string;
  label: string;
  error?: string;
  showPasswordLabel: string;
  hidePasswordLabel: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function PasswordInput({
  value,
  className,
  label,
  error,
  showPasswordLabel,
  hidePasswordLabel,
  onChange,
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
          autoComplete="new-password"
          value={value}
          className={`${className} pr-12`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "password-error" : undefined}
          onChange={onChange}
        />
        <button
          type="button"
          className="absolute right-4 top-1/2 flex -translate-y-1/2 text-text-primary"
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
