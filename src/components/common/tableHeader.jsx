import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort(path) {
    let column = { ...this.props.sortColumn };
    if (column.path === path)
      column.order = column.order === "asc" ? "desc" : "asc";
    else {
      column.path = path;
      column.order = "asc";
    }
    this.props.onSort(column);
  }

  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path || !column.path) return null;
    return sortColumn.order === "asc" ? (
      <i className="fa fa-sort-asc" />
    ) : (
      <i className="fa fa-sort-desc" />
    );
  };

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
