import React from 'react';
import { ListGroup, Alert } from 'react-bootstrap';
import { AdminSchoolFeedback } from '/imports/ui/components/admin/admin-school-feedback';

export const AdminSchoolFeedbacksList = ({ schoolFeedbacks }) => (
  schoolFeedbacks.length === 0 ? <Alert bsStyle="warning">No school feedback yet.</Alert> :
  <ListGroup>
    {schoolFeedbacks.map((schoolFeedback) => schoolFeedback && schoolFeedback._id ?(
      <AdminSchoolFeedback key={ schoolFeedback._id } schoolFeedback={ schoolFeedback } />
    ):null)}
  </ListGroup>
);

AdminSchoolFeedbacksList.propTypes = {
  schoolFeedbacks: React.PropTypes.array,
};
