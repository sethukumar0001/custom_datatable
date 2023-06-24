import React from "react";
// import { makeData, Logo, Tips } from "./utils";

// Import Table
import DraggableTable from "./DraggableTable";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [{firstName:'sethu',lastname:'kumar',age:'10',status:'active'}],
    };
  }
  render() {
    const { data } = this.state;
    const fieldMap = ["firstName", "lastName", "age", "status"];

    const heads = ["First Name", "Last Name", "Age", "Status"];
    const columns = [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ];
    return (
      <div>
        <DraggableTable
          rows={data}
          columns={columns}
          defaultPageSize={5}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}
export default App;
