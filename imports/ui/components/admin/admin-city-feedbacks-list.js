import React from 'react';
import { ListGroup, Alert } from 'react-bootstrap';
import { AdminCityFeedback } from '/imports/ui/components/admin/admin-city-feedback';

export const AdminCityFeedbacksList = ({ cityFeedbacks }) => (
  cityFeedbacks.length === 0 ? <Alert bsStyle="warning">No city feedback yet.</Alert> :
  <ListGroup>
    {cityFeedbacks.map((cityFeedback) => (
      <AdminCityFeedback key={ cityFeedback._id } cityFeedback={ cityFeedback } />
    ))}
  </ListGroup>
);

AdminCityFeedbacksList.propTypes = {
  cityFeedbacks: React.PropTypes.array,
};
