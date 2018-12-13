import React from 'react';
import { Link } from 'react-router';
import FavouritesFilter from '../components/favourites-filter';
import i18n from 'meteor/universe:i18n';

class SchoolSearchButtons extends React.Component {
  render() {
    const T = i18n.createComponent();
    return (
      <div className="school-search-buttons">
        <FavouritesFilter />
        <Link to="/suggest-school" className="fav-filter">
          <T>suggestSchool</T>
        </Link>
      </div>
    );
  }
}

export default SchoolSearchButtons;
