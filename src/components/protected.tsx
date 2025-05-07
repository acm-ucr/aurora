import RELEASES from "@/data/releases";
import Fault from "@/utils/error";
import Navigation from "@/components/navigation";
import { headers } from "next/headers";
import SignIn from "@/utils/signin";
import { Session as SessionType } from "next-auth";

interface props {
  children: React.ReactNode;
  restrictions: Record<string, number[]>;
  session: SessionType | null;
}

const ProtectedPage = async ({ children, restrictions, session }: props) => {
  const header = headers();
  const pathName = header.get("x-url") || "";

  if (!session) {
    return <SignIn callback={pathName} />;
  }

  if (RELEASES[pathName] > new Date()) {
    throw new Fault(
      423,
      "Locked Resource",
      "This resource has not been released",
    );
  }

  if (!session.user.roles && Object.keys(restrictions).length > 0) {
    throw new Fault(403, "Unauthorized", "You do not have any assigned roles");
  }

  const authorized = Object.entries(restrictions).some(([key, values]) =>
    Array.isArray(values)
      ? values.includes(session.user.roles[key])
      : session.user.roles[key] === values,
  );

  if (!authorized && Object.keys(restrictions).length > 0) {
    throw new Fault(403, "Unauthorized", "You do not have access this page");
  }

  const navigation = RegExp(/user\/|admin\//).test(pathName);

  return (
    <>
      {navigation && <Navigation />}
      <div className="relative z-0 flex h-screen w-full items-start overflow-x-hidden bg-hackathon-page px-6">
        <div className="h-full w-full py-10 md:py-0">{children}</div>
      </div>
    </>
  );
};

export default ProtectedPage;
