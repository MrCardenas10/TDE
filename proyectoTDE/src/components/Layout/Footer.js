import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

import SourceLink from 'components/SourceLink';

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
          TDE (Tarjeta Débito Estudiantil) 2019
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
