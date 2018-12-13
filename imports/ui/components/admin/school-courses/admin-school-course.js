import React from 'react';
import {Bert} from 'meteor/themeteorchef:bert';
import {removeSchoolCourse} from '/imports/api/school-courses/methods';
import {AdminListComponent} from "../common-utils/admin-list-component";

export class AdminSchoolCourse extends AdminListComponent {

  handleEdit() {
    const schoolCourse = this.props.schoolCourse;
    this.goToEdit(schoolCourse._id, 'schoolCourses');
  }

  handleRemove() {
    const schoolCourse = this.props.schoolCourse;
    this.remove(removeSchoolCourse, schoolCourse._id, "School course");
  }

  render() {
    const schoolCourse = this.props.schoolCourse;
    return this.renderList(schoolCourse, schoolCourse.courseName);
  }
}

AdminSchoolCourse.propTypes = { schoolCourse: React.PropTypes.object };
