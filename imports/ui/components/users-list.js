import React from 'react';
import {Table, Alert} from 'react-bootstrap';
import {User} from './user';
import i18n from 'meteor/universe:i18n';

export const UsersList = ({users}) => {
  const T = i18n.createComponent();

  return (users.length === 0 ? <Alert bsStyle="warning"><T>userNotFound</T></Alert> :
      <Table striped bordered condensed hover>
        <thead>
        <tr>
          <th><T>name</T></th>
          <th><T>countries</T></th>
        </tr>
        </thead>
        <tbody>
        {users.map((user) => (
          <User key={ user._id } user={ user }/>
        ))}
        </tbody>
      </Table>
  );
};
UsersList.propTypes = {
  users: React.PropTypes.array,
};
