import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const HeaderStyle = styled.header`
  height: 60px;
  background: #fff;
  font-size: 35px;
  font-weight: 600;
  font-family: "Comic Sans MS", cursive, sans-serif;
  text-align: center;
  box-shadow: 0px 3px 5px #dcdcdc;

  & > a {
    color: #ffa500 !important;
    text-decoration: none !important;
  }

  @media only screen and (max-width: 768px) {
    & {
      display: none;
    }
  }
`;

const Header = ({ title }) => {
  return (
    <HeaderStyle>
      <NavLink to="/">{title}</NavLink>
    </HeaderStyle>
  );
};

export default Header;
