import React from 'react';
import { Alert } from 'react-bootstrap';
import { AdminSchool } from '/imports/ui/components/admin/admin-school';

export const AdminSchoolsList = ({ schools }) => (
  schools.length === 0 ? <Alert bsStyle="warning">No schools yet.</Alert> :
  <div>
    {schools.map((school) => (
      <AdminSchool key={ school._id } school={ school } />
    ))}
  </div>
);

AdminSchoolsList.propTypes = {
  schools: React.PropTypes.array,
};
