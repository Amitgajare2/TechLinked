function MiniStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface-dark p-3 text-center">

      <p className="text-sm font-bold text-text-primary">
        {value}
      </p>

      <p className="mt-1 text-[11px] text-text-muted">
        {label}
      </p>

    </div>
  );
}

export default MiniStat;