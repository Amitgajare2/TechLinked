"use client";
import { type ClipboardEvent, type KeyboardEvent } from "react";
import { useRef, useState } from "react";

const OTP_LENGTH = 6;

export const OtpBoxes = ({ onChange, error }: { onChange: (otp: string) => void; error: boolean }) => {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const update = (next: string[]) => {
    setDigits(next);
    onChange(next.join(""));
  };

  const handleChange = (i: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    update(digits.map((d, idx) => (idx === i ? digit : d)));
    if (digit && i < OTP_LENGTH - 1) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) inputs.current[i - 1]?.focus();
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    update(Array.from({ length: OTP_LENGTH }, (_, i) => pasted[i] ?? ""));
    inputs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  return (
    <div className="flex justify-center gap-2 lg:gap-3">
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            inputs.current[i] = el;
          }}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          autoFocus={i === 0}
          aria-label={`Digit ${i + 1}`}
          className={`size-9 rounded-md border bg-white text-center text-sm font-semibold text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 lg:size-12 lg:text-lg ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      ))}
    </div>
  );
};
