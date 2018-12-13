import React from 'react';
import { Alert } from 'react-bootstrap';
import { AdminCountry } from '/imports/ui/components/admin/forms/admin-country';

export const AdminCountriesList = ({ countries }) => (
  countries.length === 0 ? <Alert bsStyle="warning">No countries yet.</Alert> :
  <div>
    {countries.map((country) => (
      <AdminCountry key={ country._id } country={ country } />
    ))}
  </div>
);

AdminCountriesList.propTypes = {
  countries: React.PropTypes.array,
};
