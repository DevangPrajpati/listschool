import React from 'react';
import {MenuItem, NavDropdown} from 'react-bootstrap';
import i18n from "meteor/universe:i18n";
import {Session} from 'meteor/session';
import {ENGLISH_LOCALE, getLangLabelBasedOnLanguage, PORTUGUESE_LOCALE} from "../../../common/locale-names";

export class ChangeLang extends React.Component {
  state = {
    title: getLangLabelBasedOnLanguage(localStorage.getItem("Lang") !== null ? localStorage.getItem("Lang"): ENGLISH_LOCALE.locale)
  };

  changeLangToEnglish = () => {
    i18n.setLocale(ENGLISH_LOCALE.locale);
    localStorage.setItem('Lang', ENGLISH_LOCALE.locale);
    this.setState({title: ENGLISH_LOCALE.name});
  };

  changeLangToPortuguese = () => {
    i18n.setLocale(PORTUGUESE_LOCALE.locale);
    localStorage.setItem('Lang', PORTUGUESE_LOCALE.locale);
    this.setState({title: PORTUGUESE_LOCALE.name});
  };

  render () {
    return <NavDropdown eventKey={ 5 } title={ this.state.title} id="basic-nav-dropdown-change-lang">
        <MenuItem onClick={this.changeLangToEnglish} eventKey={ 5.1 }>{ENGLISH_LOCALE.name}</MenuItem>
        <MenuItem onClick={this.changeLangToPortuguese} eventKey={ 5.2 }>{PORTUGUESE_LOCALE.name}</MenuItem>
    </NavDropdown>
  }
}
