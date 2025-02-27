import { Label } from "@/components/ui/label";
import { HeatMapGrid } from "react-grid-heatmap";

interface props {
  label: string;
  data: number[][];
  xLabels: string[];
  yLabels: string[];
}

const Heatmap = ({ label, data, xLabels, yLabels }: props) => {
  return (
    <div className="text-center">
      <Label className="my-2">{label}</Label>
      <HeatMapGrid
        data={data}
        xLabels={xLabels}
        yLabels={yLabels}
        cellRender={(x, y, value) => (
          <div title={`Pos(${x}, ${y}) = ${value}`}>{value}</div>
        )}
        xLabelsStyle={() => ({
          color: "#777",
          fontSize: ".8rem",
        })}
        yLabelsStyle={() => ({
          fontSize: ".7rem",
          textTransform: "uppercase",
          color: "#777",
        })}
        cellStyle={(_x, _y, ratio) => ({
          background: `rgb(12, 160, 44, ${ratio})`,
          fontSize: ".8rem",
          color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`,
        })}
        cellHeight="2rem"
        xLabelsPos="bottom"
        onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
        yLabelsPos="left"
      />
    </div>
  );
};

export default Heatmap;
