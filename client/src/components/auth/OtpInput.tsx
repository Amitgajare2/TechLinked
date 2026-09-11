"use client";

import { useRef, type ChangeEvent, type ClipboardEvent, type KeyboardEvent } from "react";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export default function OtpInput({ length = 6, value, onChange, error }: OtpInputProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  const setDigit = (index: number, digit: string) => {
    const next = digits.slice();
    next[index] = digit;
    onChange(next.join(""));
  };

  const handleChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (!raw) {
      setDigit(index, "");
      return;
    }
    // browsers sometimes fire onChange with more than one char pasted into a single box
    const char = raw[raw.length - 1];
    setDigit(index, char);
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    e.preventDefault();
    onChange(pasted);
    const focusIndex = Math.min(pasted.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="flex items-center justify-between gap-2 sm:gap-3" onPaste={handlePaste}>
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digit}
          onChange={handleChange(index)}
          onKeyDown={handleKeyDown(index)}
          className={`w-11 h-12 sm:w-12 sm:h-14 text-center text-[18px] font-medium rounded-md bg-[#122C52] border outline-none transition-all text-[#EDEFF7] focus:ring-4 focus:ring-[#4C5FFF]/15 ${
            error ? "border-[#FF6B6B]" : "border-[#1E3A63] focus:border-[#4C5FFF]"
          }`}
        />
      ))}
    </div>
  );
}