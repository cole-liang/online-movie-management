import React from "react";
import styled from "styled-components";

const FooterStyle = styled.footer`
  background: #fff;
  color: #625471;
  border-top: 1px solid #e2dee6;
  text-align: center;
  padding: 15px 0;
`;

const Footer = ({ content }) => {
  return (
    <FooterStyle>
      <span>{content}</span>
    </FooterStyle>
  );
};

export default Footer;
