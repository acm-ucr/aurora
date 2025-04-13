import { useZxing } from "react-zxing";

type Props = {
  setResult: (value: string) => void;
};

const ScanQRCode = ({ setResult }: Props) => {
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });

  return (
    <video ref={ref as React.LegacyRef<HTMLVideoElement>} className="w-full" />
  );
};

export default ScanQRCode;
