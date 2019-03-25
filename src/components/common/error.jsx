import React from "react";
import styled from "styled-components";

const ErrorDiv = styled.div`
  margin-bottom: 0;
  color: rgba(0, 0, 0, 0.65);
  position: relative;
  top: -14px;
  background-color: #fff1f0;
  border: 1px solid #ffa39e;
  border-radius: 5px;
  padding: 8px 15px;

  & i {
    margin-right: 10px;
    color: red;
  }
`;

const Error = ({ children }) => {
  return (
    <ErrorDiv>
      <i class="fa fa-times-circle" />
      {children}
    </ErrorDiv>
  );
};

export default Error;
