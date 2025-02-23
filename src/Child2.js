import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Child2 = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data.length) return;

    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };

    const averageTips = d3.rollup(
      data,
      (v) => d3.mean(v, (d) => d.tip),
      (d) => d.day
    );

    const days = Array.from(averageTips.keys());
    const avgTips = Array.from(averageTips.values());

    const order = ["Thur", "Fri", "Sat", "Sun"];
    days.sort((a, b) => order.indexOf(a) - order.indexOf(b));

    const xScale = d3.scaleBand()
      .domain(days)
      .range([margin.left, width - margin.right])
      .padding(0.4);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(avgTips)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background", "#f9f9f9")
      .style("overflow", "visible");

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.select(".x-axis")
      .style("transform", `translateY(${height - margin.bottom}px)`)
      .call(xAxis);

    svg.select(".y-axis")
      .style("transform", `translateX(${margin.left}px)`)
      .call(yAxis);

    svg.selectAll(".bar")
      .data(days)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d))
      .attr("y", (d) => yScale(averageTips.get(d)))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - margin.bottom - yScale(averageTips.get(d)))
      .attr("fill", "teal");

  }, [data]);

  return (
    <div>
      <h2>Average Tip by Day</h2>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default Child2;
