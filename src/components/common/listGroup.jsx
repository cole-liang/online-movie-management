import React from "react";

const ListGroup = ({
  selectedItem,
  items,
  onItemSelect,
  keyProperty,
  valueProperty
}) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[keyProperty]}
          className={
            selectedItem === item[valueProperty]
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onItemSelect(item)}
        >
          {item[valueProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  keyProperty: "_id",
  valueProperty: "name"
};

export default ListGroup;
