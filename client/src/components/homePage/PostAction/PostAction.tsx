function PostAction({
  icon: Icon,
  text,
}: {
  icon: any;
  text: string;
}) {
  return (
    <button className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs text-text-muted transition hover:bg-surface-2 hover:text-text-primary">
      <Icon size={15} />
      <span>{text}</span>
    </button>
  );
}

export default PostAction;