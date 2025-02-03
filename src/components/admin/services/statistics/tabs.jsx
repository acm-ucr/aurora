const Tabs = ({ events }) => {
  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-4">
        {Object.entries(events).map(([title, count], index) => (
          <div
            className="flex w-full flex-col justify-center rounded bg-white p-2 text-center drop-shadow-md"
            key={index}
          >
            <div data-cy={`${title}-tab`} className="text-2xl font-medium">
              {title}
            </div>
            <div data-cy={`${count}-value`} className="text-5xl font-extrabold">
              {count}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Tabs;
