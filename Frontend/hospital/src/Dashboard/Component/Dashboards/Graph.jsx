import React from "react";
import { Chart } from "react-google-charts";

function Graph() {
  const data = [
    ["Task", "Hours per Day"],
    ["Room", 11],
    ["Department", 2],
    ["Role", 2],
    ["Patient", 2],
    ["Employee", 7],
  ];

  const options = {
    title: "Hospital Daily Activity",
  };


 const data1 = [
        [
          "Month",
          "Employee",
          "Lab",
          "Room",
          "Department",
          "Role",
          "Patient",
        ],
        ["2004/05", 165, 938, 522, 998, 450, 614.6],
        ["2005/06", 135, 1120, 599, 1268, 288, 682],
        ["2006/07", 157, 1167, 587, 807, 397, 623],
        ["2007/08", 139, 1110, 615, 968, 215, 609.4],
        ["2008/09", 136, 691, 629, 1026, 366, 569.6],
      ];
   const options1 = {
        title: "Hospital monthly perfomance",
        vAxis: { title: "Cups" },
        hAxis: { title: "Month" },
        seriesType: "bars",
        series: { 5: { type: "line" } },
      };
  return (
    <div className="container">
    <div className="row">
    <div className="col-12 col-md-6 mb-1">
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"290px"}
      />
      </div>
      <div className="col-12 col-md-6 mb-1">
      <Chart
      chartType="ComboChart"
      width="100%"
      height="290px"
      data={data1}
      options={options1}
    />
   </div>
      </div>
    </div>
  );
}

export default Graph;
