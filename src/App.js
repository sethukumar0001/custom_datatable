import React, { useState } from "react";
import styled from "styled-components";

const App = () => {
  const [cols, setCols] = useState([
    "Column1",
    "Column2",
    "Column3",
    "Column4",
    "Column5",
  ]);
  const [rows, setRows] = useState([
    {
      Column1: "Column1",
      Column2: "Column2",
      Column3: "Column3",
      Column4: "Column4",
      Column5: "Column5",
    },
  ]);
  const [dragOver, setDragOver] = useState("");

  const handleDragStart = (e) => {
    const { id } = e.target;
    const idx = cols.indexOf(id);
    e.dataTransfer.setData("colIdx", idx);
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDragEnter = (e) => {
    const { id } = e.target;
    setDragOver(id);
  };

  const handleOnDrop = (e) => {
    const { id } = e.target;
    const droppedColIdx = cols.indexOf(id);
    const draggedColIdx = e.dataTransfer.getData("colIdx");
    const tempCols = [...cols];

    tempCols[draggedColIdx] = cols[droppedColIdx];
    tempCols[droppedColIdx] = cols[draggedColIdx];
    setCols(tempCols);
    setDragOver("");
  };

  return (
    <div className="App">
      <Table>
        <thead>
          <tr>
            {cols.map((col) => (
              <StyledTh
                id={col}
                key={col}
                draggable
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleOnDrop}
                onDragEnter={handleDragEnter}
                dragOver={col === dragOver}
              >
                {col}
              </StyledTh>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {Object.entries(row).map(([k, v], idx) => (
                <Cell key={v} dragOver={cols[idx] === dragOver}>
                  {row[cols[idx]]}
                </Cell>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const Table = styled.table`
  border-collapse: collapse;
  width: 70%;
  margin: auto;
  margin-top: 13vh;
`;

const StyledTh = styled.th`
  white-space: nowrap;
  color: #716f88;
  letter-spacing: 1.5px;
  font-weight: 600;
  font-size: 14px;
  text-align: left;
  text-transform: capitalize;
  vertical-align: middle;
  padding: 20px;
  border-top: 2px solid #eef0f5;
  border-bottom: 2px solid #eef0f5;
  border-left: 2px solid #eef0f5;
  text-transform: uppercase;
  border-right: ${({ dragOver }) => dragOver && "1px solid #0091ae"};
  border-left: ${({ dragOver }) => dragOver && "1px solid #0091ae"};
  cursor: grab;
  background-color: #f5f8fa;
  &:hover {
    background-color: #e5f5f8;
  }
`;

const Cell = styled.td`
  font-size: 14px;
  text-align: left;
  text-transform: capitalize;
  vertical-align: center;
  padding: 20px;
  border: 2px solid #f5f8fa;
  text-transform: lowercase;
  // border-left: ${({ dragOver }) => dragOver && "1px solid blue"};
`;

export default App;
