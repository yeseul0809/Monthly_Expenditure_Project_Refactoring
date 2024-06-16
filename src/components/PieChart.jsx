import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../api/Expenses";

const PieChart = () => {
  const { activeIndex } = useSelector((state) => state.data);

  const {
    data: expenses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: fetchData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // 선택된 월의 데이터만 필터링
  const filteredData = activeIndex
    ? expenses.filter(
        (item) => new Date(item.date).getMonth() === activeIndex - 1
      )
    : expenses;

  // 카테고리별 지출 금액 계산
  const categoryData = filteredData.reduce((acc, item) => {
    if (acc[item.category]) {
      acc[item.category] += item.price;
    } else {
      acc[item.category] = item.price;
    }
    return acc;
  }, {});

  const pieData = Object.entries(categoryData).map(([category, value]) => ({
    id: category,
    label: category,
    value,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`,
  }));

  return (
    <ResponsivePie
      data={pieData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: "pastel2" }}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
