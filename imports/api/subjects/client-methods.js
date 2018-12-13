import {Subjects} from "./subjects";
import {SchoolCourses} from "../school-courses/school-courses";

export const filterAllSubjectNamesForGivenSchool = (school) => {
  if (school.schoolCourses !== undefined) {
    let schoolSubjectIdArray = school.schoolCourses.map(course => SchoolCourses.findOne({_id: course.course}).subject);
    return Subjects.find({
      _id: {
        $in: schoolSubjectIdArray
      }
    }).map(subject => subject.subjectName);
  } else {
    return [];
  }
};
