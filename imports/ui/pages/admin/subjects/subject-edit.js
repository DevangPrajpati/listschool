import React from 'react';
import {Row, Col, Grid} from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';
import SubjectForm from '/imports/ui/containers/admin/subjects/subject-form';

export const SubjectEdit = (props) => {
  const T = i18n.createComponent();
  return (
    <Grid className="main-app-container">
      <Row>
        <Col xs={12}>
          <h1 className="page-header"><T>editSubject</T></h1>
          <SubjectForm subjectId={props.params.subjectId}/>
        </Col>
      </Row>
    </Grid>);
};
