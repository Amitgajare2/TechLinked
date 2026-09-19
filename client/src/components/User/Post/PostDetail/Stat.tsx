function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface-dark p-3">

      <div className="flex items-center gap-2 text-text-secondary">
        {icon}

        <span className="text-xs">
          {label}
        </span>
      </div>

      <p className="mt-2 text-lg font-semibold text-text-primary">
        {value}
      </p>

    </div>
  );
}

export default Stat;