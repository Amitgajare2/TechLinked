function ActivityRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-3">

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary">
          {icon}
        </div>

        <span className="text-sm text-text-secondary">
          {label}
        </span>

      </div>

      <span className="text-sm font-semibold text-text-primary">
        {value}
      </span>

    </div>
  );
}

export default ActivityRow;