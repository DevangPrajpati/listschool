import React from 'react';
import {browserHistory} from 'react-router';
import {Row, Col, Grid, Button, ButtonGroup, Glyphicon} from 'react-bootstrap';
import {Bert} from 'meteor/themeteorchef:bert';
import AdminSubjectsList from '/imports/ui/containers/admin/subjects/admin-subjects-list';
import i18n from 'meteor/universe:i18n';

const handleNewSubject = () => browserHistory.push('/admin/subjects/new');

export class AdminSubjects extends React.Component {
  render() {
    const T = i18n.createComponent();
    return (
      <div>
        <Grid className="main-app-container">
          <Row className="admin-list-buttons">
            <Button bsStyle="success" block onClick={handleNewSubject}>
              <Glyphicon glyph="plus"/><T>subject</T>
            </Button>
          </Row>
          <Row className="admin-list-content">
            <AdminSubjectsList/>
          </Row>
        </Grid>
      </div>
    );
  }
}
