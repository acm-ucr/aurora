type props = {
  release: Date;
  children: React.ReactNode;
};

const Release = ({ release, children }: props): React.ReactNode => {
  if (process.env.NODE_ENV === "development") return children;

  return release < new Date() ? children : null;
};

export default Release;
