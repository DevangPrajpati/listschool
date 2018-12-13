import React from 'react';
import {Alert} from 'react-bootstrap';
import {AdminSchoolCourse} from "./admin-school-course";
import i18n from 'meteor/universe:i18n';

export const AdminSchoolCoursesList = ({schoolCourses: schoolCourses}) => {
  const T = i18n.createComponent();
  return (
    schoolCourses.length === 0 ? <Alert bsStyle="warning"><T>noSchoolCoursesYet</T></Alert> :
      <div>
        {schoolCourses.map((schoolCourse) => (
          <AdminSchoolCourse key={schoolCourse._id} schoolCourse={schoolCourse}/>
        ))}
      </div>);
};

AdminSchoolCoursesList.propTypes = {
  schoolCourses: React.PropTypes.array,
};
