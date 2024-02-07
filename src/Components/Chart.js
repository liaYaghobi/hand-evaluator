
import React from "react";
import { PieChart, Pie, Tooltip } from "recharts";


export default function Chart({handResultCounts}) {
  if (handResultCounts === null || handResultCounts === undefined) {
    return null; // or return some default content or loading indicator
  }
  const data02 = Object.entries(handResultCounts).map(([key, value]) => ({
    name: key,
    value: value,
  }));

  console.log(data02);
  return (
    <PieChart width={1000} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data02}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        label
      />
      <Tooltip />
    </PieChart>
  );
}
