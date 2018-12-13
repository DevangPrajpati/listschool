import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import {ChangeLang} from "./change-lang";

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));
const handleProfile = () => browserHistory.push('/profile');
const handleContact = () => browserHistory.push('/contact');
const handleSuggestSchool = () => browserHistory.push('/suggest-school');
const handleAdminSchools = () => browserHistory.push('/admin/schools');
const handleAdminCities = () => browserHistory.push('/admin/cities');
const handleAdminCountries = () => browserHistory.push('/admin/countries');
const handleAdminSchoolCourses = () => browserHistory.push('/admin/schoolCourses');
const handleAdminSubjects = () => browserHistory.push('/admin/subjects');
const handleAdminAccommodations = () => browserHistory.push('/admin/accommodations');
const handleAdminFacilities = () => browserHistory.push('/admin/facilities');
import i18n from 'meteor/universe:i18n';

const userName = () => {
  const user = Meteor.user();
  const firstName = user && user.profile ? user.profile.firstName : '';
  const lastName = user && user.profile ? user.profile.lastName : '';
  return user ? `${firstName} ${lastName}` : '';
};

export class AuthenticatedNavigation extends React.Component {
  render() {
    const T = i18n.createComponent();
    const isAdmin = Roles.userIsInRole(Meteor.userId(), ['admin'], Roles.GLOBAL_GROUP);
    let adminLink = <div></div>;
    if (isAdmin) {
      adminLink = <NavDropdown eventKey={ 5 } title={ 'Admin' } id="basic-nav-dropdown-admin">
                    <MenuItem eventKey={ 5.1 } onClick={ handleAdminSchools }><T>schools</T></MenuItem>
                    <MenuItem eventKey={ 5.2 } onClick={ handleAdminCities }><T>cities</T></MenuItem>
                    <MenuItem eventKey={ 5.3 } onClick={ handleAdminCountries }><T>countries</T></MenuItem>
                    <MenuItem eventKey={ 5.3 } onClick={ handleAdminSchoolCourses }><T>schoolCourses</T></MenuItem>
                    <MenuItem eventKey={ 5.3 } onClick={ handleAdminSubjects }><T>subjects</T></MenuItem>
                    <MenuItem eventKey={ 5.3 } onClick={ handleAdminAccommodations }><T>accommodations</T></MenuItem>
                    <MenuItem eventKey={ 5.3 } onClick={ handleAdminFacilities }><T>schoolFacilities</T></MenuItem>
                  </NavDropdown>;
    }

    return (
      <div>
        <Nav pullRight>
          <LinkContainer to="/favorites">
            <NavItem eventKey={ 1 } href="/favorites">Minhas Escolas</NavItem>
          </LinkContainer>
          <NavDropdown eventKey={ 2 } title={ userName() } id="basic-nav-dropdown">
            <MenuItem eventKey={ 2.1 }   onClick={ handleProfile }><T>profile</T></MenuItem>
            <MenuItem eventKey={ 2.2 } onClick={ handleContact }><T>Contact</T></MenuItem>
            <MenuItem eventKey={ 2.3 } onClick={ handleSuggestSchool }><T>suggestSchool</T></MenuItem>
            <MenuItem eventKey={ 2.4 } onClick={ handleLogout }><T>logout</T></MenuItem>
          </NavDropdown>
          {adminLink}
          <ChangeLang/>
        </Nav>
      </div>
    );
  }
}
