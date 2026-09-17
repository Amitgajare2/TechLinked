function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-text-muted">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-medium text-text-primary">
        {value}
      </p>
    </div>
  );
}

export default InfoRow;