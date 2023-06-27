import React from "react";
import "antd/dist/reset.css";
import "./index.css";
import { Resizable } from "react-resizable";
import ReactDragListView from "react-drag-listview";
import { Table } from "antd";

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          title: <span className="dragHandler">Key</span>,
          dataIndex: "key",
          render: (text) => <span>{text}</span>,
          width: 50,
        },
        {
          title: <span className="dragHandler">Name</span>,
          dataIndex: "name",
          width: 200,
        },
        {
          title: <span className="dragHandler">Gender</span>,
          dataIndex: "gender",
          width: 100,
        },
        {
          title: <span className="dragHandler">Age</span>,
          dataIndex: "age",
          width: 100,
        },
        {
          title: <span className="dragHandler">Address</span>,
          dataIndex: "address",
        },
      ],
    };

    const that = this;
    this.dragProps = {
      onDragEnd(fromIndex, toIndex) {
        const columns = [...that.state.columns];
        const item = columns.splice(fromIndex, 1)[0];
        columns.splice(toIndex, 0, item);
        that.setState({
          columns,
        });
      },
      nodeSelector: "th",
      handleSelector: ".dragHandler",
      ignoreSelector: "react-resizable-handle",
    };
  }

  components = {
    header: {
      cell: ResizableTitle,
    },
  };

  data = [
    {
      key: "1",
      name: "Boran",
      gender: "male",
      age: "12",
      address: "New York",
    },
    {
      key: "2",
      name: "JayChou",
      gender: "male",
      age: "38",
      address: "TaiWan",
    },
    {
      key: "3",
      name: "Lee",
      gender: "female",
      age: "22",
      address: "BeiJing",
    },
    {
      key: "4",
      name: "ChouTan",
      gender: "male",
      age: "31",
      address: "HangZhou",
    },
    {
      key: "5",
      name: "AiTing",
      gender: "female",
      age: "22",
      address: "Xi’An",
    },
  ];

  handleResize =
    (index) =>
    (e, { size }) => {
      this.setState(({ columns }) => {
        const nextColumns = [...columns];
        nextColumns[index] = {
          ...nextColumns[index],
          width: size.width,
        };
        return { columns: nextColumns };
      });
    };

  render() {
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));

    return (
      <ReactDragListView.DragColumn {...this.dragProps}>
        <Table
          bordered
          components={this.components}
          columns={columns}
          dataSource={this.data}
        />
      </ReactDragListView.DragColumn>
    );
  }
}
export default Demo;
