import React from 'react';
import { Alert } from 'react-bootstrap';
import { AdminCity } from '/imports/ui/components/admin/admin-city';

export const AdminCitiesList = ({ cities }) => (
  cities.length === 0 ? <Alert bsStyle="warning">No cities yet.</Alert> :
  <div>
    {cities.map((city) => (
      <AdminCity key={ city._id } city={ city } />
    ))}
  </div>
);

AdminCitiesList.propTypes = {
  cities: React.PropTypes.array,
};
