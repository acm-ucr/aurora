type props = {
  children: string;
};

const Title = ({ children }: props) => {
  return (
    <div className="flex items-center justify-center text-xl font-bold">
      {children}
    </div>
  );
};

export default Title;
