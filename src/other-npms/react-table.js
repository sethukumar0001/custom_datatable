import React from "react";
// import { makeData, Logo, Tips } from "./utils";

// Import Table
import DraggableTable from "./DraggableTable";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          firstName: "sethu",
          lastname: "kumar",
          age: "10",
          status: "active",
          width: 10,
        },
        { firstName: "sethu", lastname: "kumar", age: "10", status: "active" },
        { firstName: "sethu", lastname: "kumar", age: "10", status: "active" },
        { firstName: "sethu", lastname: "kumar", age: "10", status: "active" },
        { firstName: "sethu", lastname: "kumar", age: "10", status: "active" },
        { firstName: "sethu", lastname: "kumar", age: "10", status: "active" },
        { firstName: "sethu", lastname: "kumar", age: "10", status: "active" },
        { firstName: "sethu", lastname: "kumar", age: "10", status: "active" },
        { firstName: "sethu", lastname: "kumar", age: "10", status: "active" },
      ],
    };
  }
  render() {
    const { data } = this.state;
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
      <div className="datatable_container">
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
