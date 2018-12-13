import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import { PublicNavigation } from './public-navigation';
import { AuthenticatedNavigation } from './authenticated-navigation';
import i18n from 'meteor/universe:i18n';

export class AppNavigation extends React.Component {
  renderNavigation(hasUser) {
    return hasUser ? <AuthenticatedNavigation /> : <PublicNavigation />;
  }

  render() {
    const T = i18n.createComponent();
    return (
      <Navbar fixedTop={true} className="main-app-navigation">
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">List a <span className="diff-color"><T>School</T></span></Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          { this.renderNavigation(this.props.hasUser) }
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

AppNavigation.propTypes = {
  hasUser: React.PropTypes.object,
};
