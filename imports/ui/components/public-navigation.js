import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { browserHistory } from 'react-router';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';
import {ChangeLang} from "./change-lang";

const handleContact = () => browserHistory.push('/contact');
const handleSuggestSchool = () => browserHistory.push('/suggest-school');

export const PublicNavigation = () => {
  const T = i18n.createComponent();
  return (
    <Nav pullRight>
      <NavDropdown title={<T>contact</T>} id="basic-nav-dropdown-public">
        <MenuItem eventKey={ 1 } onClick={ handleContact }>
          <T>contact</T>
        </MenuItem>
        <MenuItem eventKey={ 2 } onClick={ handleSuggestSchool }>
          <T>suggestSchool</T>
        </MenuItem>
      </NavDropdown>
      <LinkContainer to="signup">
        <NavItem eventKey={ 3 } href="/signup"><T>signUp</T></NavItem>
      </LinkContainer>
      <LinkContainer to="login">
        <NavItem eventKey={ 4 } href="/login"><T>logIn</T></NavItem>
      </LinkContainer>
      <ChangeLang/>
    </Nav>
  );
};
