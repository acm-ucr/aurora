import ProtectedPage from "@/components/protected";
import Providers from "@/components/providers";
import { Toaster } from "react-hot-toast";
import { getSession } from "@/utils/auth";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = async ({ children }: Props) => {
  const session = await getSession();

  return (
    <Providers session={session}>
      <Toaster />
      <ProtectedPage session={session} restrictions={{ admins: [1] }}>
        {children}
      </ProtectedPage>
    </Providers>
  );
};

export default AdminLayout;
