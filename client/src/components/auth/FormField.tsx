"use client";

import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
  error?: string;
  labelExtra?: ReactNode;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, icon: Icon, error, labelExtra, type = "text", id, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor={id} className="text-[13px] text-[#9FB0CC]">
            {label}
          </label>
          {labelExtra}
        </div>

        <div className="relative">
          <Icon
            size={17}
            strokeWidth={1.75}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6D84A8] pointer-events-none"
          />
          <input
            ref={ref}
            id={id}
            type={isPassword && showPassword ? "text" : type}
            className={`w-full bg-[#122C52] border rounded-md pl-10 py-2.5 text-[14px] text-[#EDEFF7] placeholder-[#6D84A8] outline-none transition-colors ${
              isPassword ? "pr-11" : "pr-4"
            } ${error ? "border-[#FF6B6B]" : "border-[#1E3A63] focus:border-[#4C5FFF]"}`}
            aria-invalid={Boolean(error)}
            {...rest}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6D84A8] hover:text-[#9FB0CC] transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={17} strokeWidth={1.75} /> : <Eye size={17} strokeWidth={1.75} />}
            </button>
          )}
        </div>

        {error && <p className="mt-1.5 text-[12px] text-[#FF6B6B]">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export default FormField;