function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action: string;
}) {
  return (
    <div className="flex items-end justify-between px-1">
      <div>
        <h2 className="text-sm font-semibold">
          {title}
        </h2>

        <p className="mt-1 text-[11px] text-text-subtle">
          {subtitle}
        </p>
      </div>

      <button className="text-[11px] font-medium text-primary">
        {action}
      </button>
    </div>
  );
}

export default SectionHeader;