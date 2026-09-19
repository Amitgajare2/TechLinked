function MetaRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-text-secondary">
        {label}
      </span>

      <span className="text-sm font-semibold text-text-primary">
        {value}
      </span>
    </div>
  );
}

export default MetaRow;