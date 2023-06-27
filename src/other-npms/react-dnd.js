import React, { useState } from "react";
// import { Table } from 'react-bootstrap';
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Resizable } from "react-resizable";
import "./App.css";
// Drag and Drop Types
const Types = {
  COLUMN: "column",
};

// Create a draggable column
const DraggableColumn = ({ id, text, index, moveColumn }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: Types.COLUMN,
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveColumn(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: Types.COLUMN,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <th
      ref={ref}
      className={`column ${isDragging ? "dragging" : ""}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {text}
    </th>
  );
};

const DraggableResizableTable = () => {
  const [columns, setColumns] = useState([
    { id: 1, text: "Column 1", width: 100 },
    { id: 2, text: "Column 2", width: 200 },
    { id: 3, text: "Column 3", width: 150 },
  ]);

  const moveColumn = (dragIndex, hoverIndex) => {
    const updatedColumns = [...columns];
    const draggedColumn = updatedColumns[dragIndex];

    updatedColumns.splice(dragIndex, 1);
    updatedColumns.splice(hoverIndex, 0, draggedColumn);

    setColumns(updatedColumns);
  };

  const handleResize =
    (index) =>
    (event, { size }) => {
      const updatedColumns = [...columns];
      updatedColumns[index].width = size.width;
      setColumns(updatedColumns);
    };

  const sampleData = [
    {
      id: 1,
      col1: "Row 1, Column 1",
      col2: "Row 1, Column 2",
      col3: "Row 1, Column 3",
    },
    {
      id: 2,
      col1: "Row 2, Column 1",
      col2: "Row 2, Column 2",
      col3: "Row 2, Column 3",
    },
    // Add more data rows as needed
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <DraggableColumn
                key={column.id}
                id={column.id}
                index={index}
                text={column.text}
                moveColumn={moveColumn}
              >
                <Resizable
                  width={column.width}
                  height={0}
                  onResize={handleResize(index)}
                  handle={<div className="resize-handle" />}
                />
              </DraggableColumn>
            ))}
          </tr>
        </thead>
        <tbody>
          {sampleData.map((dataRow) => (
            <tr key={dataRow.id}>
              <td>{dataRow.col1}</td>
              <td>{dataRow.col2}</td>
              <td>{dataRow.col3}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DndProvider>
  );
};

export default DraggableResizableTable;
