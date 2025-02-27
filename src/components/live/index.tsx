import Landing from "./landing";
import About from "./about";
import Schedule from "./schedule";
import Tracks from "./tracks";
import Sponsors from "./sponsors";
import Team from "./team";
import Committees from "./committees";
import Judges from "./judges";
import FAQ from "./faq";
import Footer from "./footer";
import Countdown from "../ui/countdown";

const Live = () => {
  return (
    <>
      <Landing />
      <About />
      <Tracks />
      <Schedule />
      <Sponsors />
      <Team />
      <Committees />
      <Judges />
      <Countdown
        classNames={{
          unit: "text-black",
          background: "bg-hackathon-blue-100",
          digit: "text-white",
        }}
      />
      <FAQ />
      <Footer />
    </>
  );
};

export default Live;
