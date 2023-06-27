import React, { useEffect, useState } from "react";
import data from "./json/resp.json";
import columns from "./json/column-header.json";
import CustomTable from "./components/table";
import "./index.css";

const App = () => {
  const [headers, setHeaders] = useState([]);
  useEffect(() => {
    setHeaders(columns.map((item) => item.name));
  }, []);
  return (
    <div className="App">
      <CustomTable
        headers={headers}
        data={data.data.sales}
        setHeaders={setHeaders}
      />
    </div>
  );
};

export default App;
