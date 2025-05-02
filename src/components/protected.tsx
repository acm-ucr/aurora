import RELEASES from "@/data/releases";
import Fault from "@/utils/error";
import Navigation from "@/components/navigation";
import { headers } from "next/headers";
import { getSession } from "@/utils/auth";
import SignIn from "@/utils/signin";

interface props {
  children: React.ReactNode;
  restrictions: Record<string, number[]>;
  title: string;
}

const ProtectedPage = async ({ children, restrictions, title }: props) => {
  const session = await getSession();
  const header = await headers();
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
      <title>{title}</title>
      {navigation && <Navigation />}
      <div className="bg-hackathon-page relative z-0 flex h-screen w-full items-start overflow-x-hidden px-10">
        <div className="h-full w-full py-10 md:py-0">{children}</div>
      </div>
    </>
  );
};

export default ProtectedPage;
