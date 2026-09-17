function ComposerButton({
  icon: Icon,
  text,
}: {
  icon: any;
  text: string;
}) {
  return (
    <button className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-text-muted transition hover:bg-surface-2 hover:text-text-primary">
      <Icon size={15} />
      <span className="hidden lg:inline">
        {text}
      </span>
    </button>
  );
}

export default ComposerButton;