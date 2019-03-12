import React from "react";

const Select = ({
  options,
  name,
  label,
  error,
  keyProperty,
  valueProperty,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} className="form-control" {...rest}>
        <option value="" />
        {options.map(option => {
          return (
            <option key={option[keyProperty]} value={option[keyProperty]}>
              {option[valueProperty]}
            </option>
          );
        })}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

Select.defaultProps = {
  keyProperty: "_id",
  valueProperty: "name"
};

export default Select;
