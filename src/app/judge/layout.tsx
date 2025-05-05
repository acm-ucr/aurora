/* eslint-disable new-cap */
import Providers from "@/components/providers";
import { Toaster } from "react-hot-toast";
import { getSession } from "@/utils/auth";
import ProtectedPage from "@/components/protected";

type Props = {
  children: React.ReactNode;
};

const JudgeLayout = async ({ children }: Props) => {
  const session = await getSession();

  return (
    <Providers session={session}>
      <Toaster />
      <ProtectedPage restrictions={{}} session={session}>
        {children}
      </ProtectedPage>
    </Providers>
  );
};

export default JudgeLayout;
