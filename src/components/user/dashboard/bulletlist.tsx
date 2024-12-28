interface props {
  text: string;
  list: string[];
}

const BulletList = ({ text, list }: props) => {
  return (
    <div className="w-full rounded-xl bg-white p-4 drop-shadow-md">
      <div className="flex items-center justify-between text-xl font-bold">
        {text}
      </div>
      <ul
        data-cy="bulletpoint-list-items"
        className="mt-2 flex flex-col items-center justify-center"
      >
        {list.map((item, index) => (
          <li
            data-cy="bulletpoint-list-item"
            key={index}
            className="w-10/12 list-disc"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BulletList;
