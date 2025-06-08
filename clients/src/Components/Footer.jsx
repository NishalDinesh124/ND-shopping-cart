// Footer.jsx

import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  font-family: Inter;
  background-color: #ffff;
  padding: 1rem 0;
  text-align: center;
  font-size: 14px;
  color: #555;
  margin-top: auto;
`;

const FooterText = styled.p`
  margin: 0;
  font-weight: 400;

  strong {
    font-weight: 600;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        © {new Date().getFullYear()} Designed by <strong>NDMedia</strong>
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;
