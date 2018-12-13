import React from 'react';
import { Alert } from 'react-bootstrap';

export const NotFound = () => (
  <Alert bsStyle="danger">
    <p><strong>Error [404]</strong>: { window.location.pathname } não existe.</p>
  </Alert>
);
