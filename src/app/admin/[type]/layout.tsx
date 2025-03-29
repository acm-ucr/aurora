/* eslint-disable new-cap */
import Providers from "@/components/providers";
import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth";
import { options } from "@/utils/auth";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = async ({ children }: Props) => {
  const session = await getServerSession(options);

  return (
    <Providers session={session}>
      <Toaster />
      {children}
    </Providers>
  );
};

export default AdminLayout;
