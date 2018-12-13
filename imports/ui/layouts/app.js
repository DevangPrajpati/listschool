import React from 'react';
import AppNavigation from '../containers/app-navigation';

export const App = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
  },
  render() {
    return (
      <div>
        <AppNavigation />
        {this.props.children}
      </div>
    );
  },
});
