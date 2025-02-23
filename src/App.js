import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import Child1 from "./Child1"; 
import Child2 from "./Child2"; 
import './App.css'

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.csv(process.env.PUBLIC_URL + "/tips.csv").then((data) => {
      const formattedData = data.map((d) => ({
        total_bill: +d.total_bill,
        tip: +d.tip,
        day: d.day,
      }));
      setData(formattedData);
    });
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        <>
          <Child1 data={data} />
          <Child2 data={data} />
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default App;
