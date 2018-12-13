import React from 'react';
import { Row, Alert, Col } from 'react-bootstrap';
import { Course } from './course';
import i18n from 'meteor/universe:i18n';

export class CoursesList extends React.Component {
  constructor() {
    super();
    this.state = {
      gridView: true,
    };
  }
  render() {
    const { courses, canCompare } = this.props;
    const T = i18n.createComponent();
    return (
      courses.length === 0 ? <Alert bsStyle="warning"><T>courseNotFound</T></Alert> :
      <Row>
        <div className="schools-view-switcher">
          <Col xs={12}>
            <div
              className={
                this.state.gridView
                  ? 'schools-view-switcher-grid active'
                  : 'schools-view-switcher-grid'
              }
              onClick={() => { this.setState({ gridView: true }); }}
            >
              <i className="fa fa-th" aria-hidden="true"></i>
            </div>
            <div
              className={
                !this.state.gridView
                  ? 'schools-view-switcher-list active'
                  : 'schools-view-switcher-list'
              }
              onClick={() => { this.setState({ gridView: false }); }}
            >
              <i className="fa fa-list" aria-hidden="true"></i>
            </div>
          </Col>
        </div>
        {courses.map((course) => (
          <Course
            key={ course._id }
            course={ course }
            canCompare={ canCompare }
            gridView={this.state.gridView}
          />
        ))}
      </Row>
    );
  }
}

CoursesList.propTypes = {
  courses: React.PropTypes.array,
  canCompare: React.PropTypes.bool,
};
