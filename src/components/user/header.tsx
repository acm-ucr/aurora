"use client";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">Welcome</p>
        <p className="mb-0 text-2xl font-bold">{session?.user?.name}</p>
      </div>
    </div>
  );
};
export default Header;
