const Avatar = ({
  src,
  name,
}: {
  src?: string | null;
  name: string;
}) => {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="h-10 w-10 rounded-full object-cover"
      />
    );
  }

  return (
    <div
      className=" flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#397A68] text-sm font-semibold text-white"
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export default Avatar;