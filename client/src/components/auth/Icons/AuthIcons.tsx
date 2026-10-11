import { EyeOff, LucideIcon } from "lucide-react";
import { DM_Serif_Display} from "next/font/google";
import { Eye } from "reicon-react/icons/Eye";
import { forwardRef,ReactNode,useState, type InputHTMLAttributes } from "react";
export const playfair = DM_Serif_Display({ subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
  

export const MicrosoftIcon = () => (
  <span className="grid size-4 grid-cols-2 gap-px">
    <span className="bg-[#F25022]" />
    <span className="bg-[#7FBA00]" />
    <span className="bg-[#00A4EF]" />
    <span className="bg-[#FFB900]" />
  </span>
);

export const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" className="size-4">
    <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3A12 12 0 1 1 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7A20 20 0 1 0 44 24c0-1.3-.1-2.6-.4-3.9z" />
    <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8A12 12 0 0 1 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7A20 20 0 0 0 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A12 12 0 0 1 12.7 28l-6.5 5A20 20 0 0 0 24 44z" />
    <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
  </svg>
);

export const Swoosh = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 90 10" fill="none" className={className}>
    <path d="M2 8C25 -1 60 -1 88 8" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const HeroCopy = ({ className = "" }: { className?: string }) => (
  <h2 className={`${playfair.className} font-bold leading-tight text-gray-900 ${className}`}>
    Join the hospitality network built for{" "}
    <span className="block italic text-orange-500">your Career</span>
  </h2>
);


type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon: LucideIcon;
  error?: string;
  secure?: boolean;
};

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, icon: Icon, error, secure, className = "", ...props }, ref) => {
    const [show, setShow] = useState(false);

    return (
      <label className={`block ${className}`}>
        <span className="text-xs font-semibold text-gray-900 lg:text-sm">{label}</span>
        <div className="relative mt-1.5">
          <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <input
            ref={ref}
            {...props}
            type={secure ? (show ? "text" : "password") : props.type}
            className={`h-9 w-full rounded-md border bg-white pl-9 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 lg:h-11 lg:text-sm ${
              secure ? "pr-10" : "pr-3"
            } ${
              error
                ? "border-red-500 focus:ring-red-500/20"
                : "border-gray-300 focus:border-orange-500 focus:ring-orange-500/20"
            }`}
          />
          {secure && (
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 lg:hidden"
            >
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          )}
        </div>
        {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
      </label>
    );
  }
);
Field.displayName = "Field";


export const ErrorTag = ({ children }: { children: ReactNode }) => (
  <span className="absolute -top-6 right-6 rounded-sm border border-red-500 bg-white px-2 py-0.5 text-[10px] font-medium leading-none text-red-500 after:absolute after:-bottom-[5px] after:left-3 after:size-2 after:rotate-45 after:border-b after:border-r after:border-red-500 after:bg-white">
    {children}
  </span>
);