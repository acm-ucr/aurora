type props = {
  children: string;
};

const Title = ({ children }: props) => {
  return <div className="text-xl font-bold">{children}</div>;
};

export default Title;
