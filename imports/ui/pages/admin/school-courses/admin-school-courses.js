import React from 'react';
import {browserHistory} from 'react-router';
import {Row, Col, Grid, Button, ButtonGroup, Glyphicon} from 'react-bootstrap';
import {Bert} from 'meteor/themeteorchef:bert';
import AdminSchoolCoursesList from '/imports/ui/containers/admin/school-courses/admin-school-courses-list';
import i18n from 'meteor/universe:i18n';

const handleNewSchoolCourse = () => browserHistory.push('/admin/schoolCourses/new');
const handleUploadSchoolCourses = () => browserHistory.push('/admin/schoolCourses/upload');

export class AdminSchoolCourses extends React.Component {
  render() {
    const T = i18n.createComponent();
    return (
      <div>
        <Grid className="main-app-container">
          <Row className="admin-list-buttons">
            <Col xs={6} lg={3}>
              <Button bsStyle="success" block onClick={handleNewSchoolCourse}>
                <Glyphicon glyph="plus"/><T>schoolCourse</T>
              </Button>
            </Col>
            <Col xs={6} lg={3}>
              <Button href="#" bsStyle="success" onClick={handleUploadSchoolCourses}>
                <Glyphicon glyph="cloud-upload"/> Upload Multiple Courses
              </Button>
            </Col>
          </Row>
          <Row className="admin-list-content">
            <AdminSchoolCoursesList/>
          </Row>
        </Grid>
      </div>
    );
  }
}
