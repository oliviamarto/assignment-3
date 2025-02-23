import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Child1 = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data.length) return;

    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background", "#f9f9f9")
      .style("overflow", "visible");

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.total_bill)])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.tip)])
      .range([height - margin.bottom, margin.top]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.select(".x-axis")
      .style("transform", `translateY(${height - margin.bottom}px)`)
      .call(xAxis);

    svg.select(".y-axis")
      .style("transform", `translateX(${margin.left}px)`)
      .call(yAxis);

    svg.selectAll(".dot")
      .data(data)
      .join("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.total_bill))
      .attr("cy", (d) => yScale(d.tip))
      .attr("r", 4)
      .attr("fill", "teal");

  }, [data]);

  return (
    <div>
      <h2>Total Bill vs Tips</h2>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default Child1;
