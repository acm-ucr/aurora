import Release from "@/components/release";
import RELEASES from "@/data/releases";
import Live from "@/components/live";

const Page = () => {
  return (
    <div className="w-full">
      <Release release={RELEASES["/"]}>
        <Live />
      </Release>
    </div>
  );
};

export default Page;

export const dynamic = "force-dynamic";
