import React, { useEffect, useState } from "react";
import "./table.scss";
const CustomTable = (props) => {
  function formatString(str) {
    // Split the string into an array of words
    var words = str && str.split("_");
    // Capitalize the first letter of each word
    var capitalizedWords = words.map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    // Join the capitalized words with spaces
    var formattedString = capitalizedWords.join(" ");
    return formattedString;
  }
  const [dragOver, setDragOver] = useState("");
  const handleDragStart = (e) => {
    const { id } = e.target;
    if (id) {
      const idx = props.headers.indexOf(id);
      e.dataTransfer.setData("colIdx", idx);
    }
  };
  const handleDragOver = (e) => e.preventDefault();
  const handleDragEnter = (e) => {
    const { id } = e.target;
    if (id) {
      setDragOver(id);
    }
  };
  const handleOnDrop = (e) => {
    e.preventDefault();
    const { id } = e.target;
    if (id) {
      const droppedColIdx = props.headers.indexOf(id);
      const draggedColIdx = e.dataTransfer.getData("colIdx");
      const tempCols = [...props.headers];
      tempCols[draggedColIdx] = props.headers[droppedColIdx];
      tempCols[droppedColIdx] = props.headers[draggedColIdx];
      props.setHeaders(tempCols);
      setDragOver("");
    }
  };
  return (
    <div className="container">
      <table className="datatable_table">
        <thead>
          <tr>
            {props.headers.map((col) => (
              <th
                className="datatable_table_th"
                key={col}
                onDragOver={handleDragOver}
                onDrop={handleOnDrop}
                dragOver={col === dragOver}
                id={col}
              >
                <div
                  className="datatable_table_th_container"
                  id={col}
                  draggable
                  onDragStart={handleDragStart}
                  onDragEnter={handleDragEnter}
                  dragOver={col === dragOver}
                  style={{
                    borderLeft: col === dragOver && "2px solid #0091ae",
                  }}
                >
                  <img
                    src={`/images/drag_indicator.svg`}
                    className="datatable_table_th_img"
                  />
                  <h6 className="datatable_table_th_header_text">
                    {formatString(col)}
                  </h6>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data.map((row) => {
            return (
              <tr key={row.id}>
                {props.headers.map((col, idx) => {
                  return (
                    <td
                      className="datatable_table_td"
                      key={idx}
                      dragOver={props.headers[idx] === dragOver}
                    >
                      {row[col]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
