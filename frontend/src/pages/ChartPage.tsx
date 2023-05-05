import { Pie } from "@ant-design/plots";
import { Button } from "antd";
import { Link } from "react-router-dom";

import usePersonsStore from "@/hooks/usePersonsStore";
import calculatePopulation from "@/utils/calculatePopuation";

function ChartPage() {
  const { persons } = usePersonsStore((state) => state);
  const data = calculatePopulation(persons);

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      content: (item: any) => `${(item.percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  return (
    <>
      <Pie {...config} />
      <Button type="link" className="button">
        <Link to="/">See Table</Link>
      </Button>
    </>
  );
}

export default ChartPage;
