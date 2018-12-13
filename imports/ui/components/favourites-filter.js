import React from 'react';
import { Session } from 'meteor/session';
import i18n from 'meteor/universe:i18n';

class FavouritesFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeClass: '',
    };
    this.toggleFavourites = this.toggleFavourites.bind(this);
  }
  toggleFavourites() {
    const currentFilters = Session.get('CourseFilter');
    currentFilters.favourites = !currentFilters.favourites;
    Session.set('CourseFilter', Object.assign({}, currentFilters));
    if (currentFilters.favourites) {
      this.setState({ activeClass: 'active' });
    } else {
      this.setState({ activeClass: '' });
    }
  }
  render() {
    const T = i18n.createComponent();
    return (
      <div
        className={`fav-filter ${this.state.activeClass}`}
        onClick={this.toggleFavourites}
      >
        <T>favourites</T>
      </div>
    );
  }
}

export default FavouritesFilter;
