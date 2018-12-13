import { SchoolFeedbacks } from '/imports/api/school-feedbacks/school-feedbacks';
import {Meteor} from "meteor/meteor";
import {filterAllSubjectNamesForGivenSchool} from "../api/subjects/client-methods";
const SchoolHelper = {};

const schoolFeedbacks = (school) => (
  SchoolFeedbacks.find({ school: school && school._id }, { sort: { _id: 1 } }).fetch()
);

const schoolAverages = (school) => {
  const feedbacks = schoolFeedbacks(school);
  const averages = {};

  if (feedbacks.length > 0) {
    averages.qualityOfTeaching = feedbacks.map((a) => a.grades.qualityOfTeaching).reduce((a, b) => (a + b));
    averages.teachingMaterial = feedbacks.map((a) => a.grades.teachingMaterial).reduce((a, b) => (a + b));
    averages.schoolFacilities = feedbacks.map((a) => a.grades.schoolFacilities).reduce((a, b) => (a + b));
    averages.socialExtraActivities = feedbacks.map((a) => a.grades.socialExtraActivities).reduce((a, b) => (a + b));
    averages.schoolLocation = feedbacks.map((a) => a.grades.schoolLocation).reduce((a, b) => (a + b));
    averages.housing = feedbacks.map((a) => a.grades.housing).reduce((a, b) => (a + b));

    let overall = 0;
    Object.keys(averages).forEach((key) => {
      averages[key] = averages[key] / feedbacks.length;
      overall = overall + averages[key];
    });

    averages.overall = overall / Object.keys(averages).length;

    return averages;
  }

  return averages;
};

const schoolAccommodations = (school) => {
  const accommodations = [];

  if (school.accommodations.familyHouse) { accommodations.push('Family House'); }
  if (school.accommodations.hotel) { accommodations.push('Hotel'); }
  if (school.accommodations.studentResidence) {
    accommodations.push('Student Residence');
  }

  return accommodations;
};

const schoolFacilities = (school) => {
  const facilities = [];

  if (school.facilities.accessibility) { facilities.push('Accessibility'); }
  if (school.facilities.transfer) { facilities.push('Transfer'); }

  return facilities;
};

const schoolLastFeedback = (school) => {
  const feedbacks = schoolFeedbacks(school);

  return feedbacks[0];
};

SchoolHelper.schoolAverages = schoolAverages;
SchoolHelper.schoolFeedbacks = schoolFeedbacks;
SchoolHelper.schoolSubjects = filterAllSubjectNamesForGivenSchool;
SchoolHelper.schoolAccommodations = schoolAccommodations;
SchoolHelper.schoolFacilities = schoolFacilities;
SchoolHelper.schoolLastFeedback = schoolLastFeedback;

export default SchoolHelper;
