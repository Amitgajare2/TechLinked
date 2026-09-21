
function Avatar({
  src,
  name,
}: {
  src?: string | null;
  name: string;
}) {

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="h-8 w-8 rounded-full object-cover"
      />
    );
  }

  return (
    <div
      className="
        flex
        h-8
        w-8
        shrink-0
        items-center
        justify-center
        rounded-full
        bg-[#397A68]
        text-xs
        font-semibold
        text-white
      "
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export default Avatar;