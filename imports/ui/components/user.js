import React from 'react';

export class User extends React.Component {
  countries(user) {
    let values = '';

    if (user.profile.world) { values = `${values} world`; }
    if (user.profile.ireland) { values = `${values} ireland`; }
    if (user.profile.canada) { values = `${values} canada`; }
    if (user.profile.australia) { values = `${values} australia`; }
    if (user.profile.eua) { values = `${values} eua`; }

    return values;
  }

  render() {
    return (
      <tr style={{ cursor: 'pointer' }}>
        <td>{this.props.user.profile.firstName} {this.props.user.profile.lastName}</td>
        <td>
          {this.countries(this.props.user)}
        </td>
      </tr>
    );
  }
}

User.propTypes = { user: React.PropTypes.object };
