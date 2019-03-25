import React from "react";
import Error from "./error";

const Input = ({ name, label, error, prefix, ...rest }) => {
  return (
    <React.Fragment>
      <div className="form-group">
        {label && <label htmlFor={name}>{label}</label>}
        <div class="input-group mb-3">
          {prefix && (
            <div class="input-group-prepend">
              <span class="input-group-text">{prefix}</span>
            </div>
          )}
          <input {...rest} id={name} name={name} className="form-control" />
        </div>
      </div>
      {error && <Error>{error}</Error>}
    </React.Fragment>
  );
};

export default Input;
