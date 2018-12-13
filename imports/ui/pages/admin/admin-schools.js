import React from 'react';
import { browserHistory } from 'react-router';
import { Row, Col, Grid, Button, ButtonGroup, Glyphicon } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { downloadSchools, uploadSchools } from '/imports/api/schools/methods';
import AdminSchoolsList from '/imports/ui/containers/admin/admin-schools-list';

const handleNewSchool = () => browserHistory.push('/admin/schools/new');

const handleDownloadSchool = () => {
  if (confirm('Are you sure? This is permanent.')) {
    downloadSchools.call({}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Schools downloaded!', 'success');
      }
    });
  }
};

const handleUploadSchool = () => {
  if (confirm('Are you sure? This is permanent.')) {
    uploadSchools.call({}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Schools uploaded!', 'success');
      }
    });
  }
};

export class AdminSchools extends React.Component {
  render() {
    return (
      <div>
        <Grid className="main-app-container">
          <Row className="admin-list-buttons">
            <Col xs={6} lg={3}>
              <ButtonGroup justified>
                <Button href="#" bsStyle="default" onClick={ handleDownloadSchool }>
                  <Glyphicon glyph="cloud-download"/> Download
                </Button>
                <Button href="#" bsStyle="info" onClick={ handleUploadSchool }>
                  <Glyphicon glyph="cloud-upload"/> Upload
                </Button>
              </ButtonGroup>
            </Col>
            <Col xs={6} lg={3} lgOffset={6}>
              <Button bsStyle="success" block onClick={ handleNewSchool }>
                <Glyphicon glyph="plus"/> School
              </Button>
            </Col>
          </Row>
          <Row className="admin-list-content">
            <AdminSchoolsList />
          </Row>
        </Grid>
      </div>
    );
  }
}
