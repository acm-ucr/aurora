import Link from "next/link";

const Tile = ({ icon, text, link }) => {
  return (
    <Link
      href={link}
      className="mb-3 flex w-full items-center gap-5 rounded-xl bg-white p-7 shadow-xl hover:opacity-70 md:my-0 md:w-1/2"
      data-cy="tile-link"
    >
      <div className="text-black" data-cy="tile-icon">
        {icon}
      </div>
      <div
        className="text-2xl font-bold leading-9 text-black"
        data-cy="tile-text"
      >
        {text}
      </div>
    </Link>
  );
};

export default Tile;
