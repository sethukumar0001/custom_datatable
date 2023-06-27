import React, { useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { Resizable } from "react-resizable";
import "./App.css";
import { HTML5Backend, getEmptyImage } from "react-dnd-html5-backend";

// Sample data for columns
const initialColumns = [
  { id: "column1", name: "Column 1", width: 200 },
  { id: "column2", name: "Column 2", width: 200 },
  { id: "column3", name: "Column 3", width: 200 },
];

const initialData = [
  {
    id: 1,
    column1: "Row 1 Column 1",
    column2: "Row 1 Column 2",
    column3: "Row 1 Column 3",
  },
  {
    id: 2,
    column1: "Row 2 Column 1",
    column2: "Row 2 Column 2",
    column3: "Row 2 Column 3",
  },
  {
    id: 3,
    column1: "Row 3 Column 1",
    column2: "Row 3 Column 2",
    column3: "Row 3 Column 3",
  },
];

const Table = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [data, setData] = useState(initialData);
  const dropIndicatorRef = useRef(null);

  const moveColumn = (dragIndex, hoverIndex) => {
    const draggedColumn = columns[dragIndex];
    const updatedColumns = [...columns];
    updatedColumns.splice(dragIndex, 1);
    updatedColumns.splice(hoverIndex, 0, draggedColumn);
    setColumns(updatedColumns);
  };

  const resizeColumn = (index, width) => {
    const updatedColumns = [...columns];
    updatedColumns[index].width = width;
    setColumns(updatedColumns);
  };

  const Column = ({ column, index }) => {
    const [{ isDragging }, drag, preview] = useDrag({
      type: "column",
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: "column",
      hover({ index: draggedIndex }) {
        if (draggedIndex !== index) {
          moveColumn(draggedIndex, index);
        }
      },
    });

    const handleResize = (e, { size }) => {
      resizeColumn(index, size.width);
    };
    const isDropIndicatorVisible = dropIndicatorRef.current === column.id;

    return (
      <Resizable
        width={column.width}
        height={0}
        handle={<span className="resizable-handle" />}
        onResize={handleResize}
        draggableOpts={{ enableUserSelectHack: false }}
      >
        <th
          ref={(node) => {
            drag(drop(node));
            preview(getEmptyImage(), { captureDraggingState: true });
          }}
          className={isDragging ? "no-select" : ""}
          style={{ opacity: isDragging ? 0.5 : 1 }}
        >
                    {isDropIndicatorVisible && <div className="drop-indicator" />}

          {column.name}
        </th>
      </Resizable>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <Column key={column.id} column={column} index={index} />
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={`${row.id}_${column.id}`}>{row[column.id]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </DndProvider>
  );
};

export default Table;
