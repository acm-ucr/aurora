import data from "@/data/config";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface props {
  children: React.ReactNode;
  name: string;
  preview: string;
}

const Template = ({ children, name, preview }: props) => {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://www.bearhack.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.473367c8.webp&w=3840&q=75"
                width="40"
                height="37"
                alt="Vercel"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Thank you for applying!
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello <strong>{name}</strong>,
            </Text>
            {children}
            <Text>
              - {data.name} Team {data.heart}
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text>
              Visit {data.domain} for more information about {data.name} and
              follow us on {data.instagram} and {data.linkedin} for up to date
              information and announcements.
            </Text>
            <Text className="text-xs leading-[24px] text-[#666666]">
              This invitation was intended for{" "}
              <span className="text-black">{name}</span>. If you were not
              expecting this email, you can ignore this email. If you are
              concerned about your account&apos;s safety, please contact{" "}
              {data.email} to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default Template;
