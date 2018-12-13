import DataUtils from '../../../../utils/DataUtils';

let priceIsForWeekAndHasIncorrectValue = function (coursePriceForPeriod) {
  return coursePriceForPeriod.isInclusivePrice === false && (coursePriceForPeriod.priceForWeek === undefined || coursePriceForPeriod.priceForWeek === '' || !DataUtils.isFloatNumber(coursePriceForPeriod.priceForWeek));
};

let priceIsInclusiveAndHasIncorrectValue = function (coursePriceForPeriod) {
  return coursePriceForPeriod.isInclusivePrice === true && (coursePriceForPeriod.priceInclusive === undefined || coursePriceForPeriod.priceInclusive === '' || !DataUtils.isFloatNumber(coursePriceForPeriod.priceInclusive));
};
let priceIsInclusiveAndPriceForWeekIsProvided = function (coursePriceForPeriod) {
  return coursePriceForPeriod.isInclusivePrice === true && coursePriceForPeriod.priceForWeek != undefined && coursePriceForPeriod.priceForWeek != '';
};

function priceIsForWeekAndPriceForInclusiveIsProvided(coursePriceForPeriod) {
  return coursePriceForPeriod.isInclusivePrice === false && coursePriceForPeriod.priceInclusive != undefined && coursePriceForPeriod.priceInclusive != '';
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

let displayErrorIfCourseContainsMoreThanOnePriceListDefinition = (doc) => {
  let noErrorAndCanUpdate = true;
  let courses = doc.schoolCourses.map(schoolCourse => schoolCourse.course);
  let uniqueCourses = courses.filter(onlyUnique);
  uniqueCourses.forEach(uniqueCourse => {
    let howManyOfGivenCourseName = 0;
    courses.forEach(course => {
      if (course === uniqueCourse) {
        howManyOfGivenCourseName++;
      }
    });
    if (howManyOfGivenCourseName >= 2) {
      alert(`The price definition for course name ${uniqueCourse} is duplicated!`);
      noErrorAndCanUpdate = false;
      return;
    }
  });
  return noErrorAndCanUpdate;
};

const getCourseName = (courseId, schoolCourses) => {
  return schoolCourses.filter(course => course._id === courseId)[0].courseName;
};

export default verifyIfSchoolCoursesDataAreCorrectAndDisplayErrorIfNot = (doc, schoolCourses) => {
  let noErrorsAndCanUpdate = displayErrorIfCourseContainsMoreThanOnePriceListDefinition(doc);
  if (noErrorsAndCanUpdate) {
    doc.schoolCourses.forEach(schoolCourse => {
      let weekCounterForCourse = 0;
      schoolCourse.coursePrice.forEach(coursePriceForPeriod => {
        if (priceIsInclusiveAndPriceForWeekIsProvided(coursePriceForPeriod)) {
          alert(`The 'Price for week' value for course ${getCourseName(schoolCourse.course, schoolCourses)} in weeks ${coursePriceForPeriod.weekBeginNumber} - ${coursePriceForPeriod.weekEndNumber} must be empty when 'Is inclusive Price' option is checked!`);
          noErrorsAndCanUpdate = false;
          return;
        } else if (priceIsForWeekAndPriceForInclusiveIsProvided(coursePriceForPeriod)) {
          alert(`The 'Price inclusive' value for course ${getCourseName(schoolCourse.course, schoolCourses)} in weeks ${coursePriceForPeriod.weekBeginNumber} - ${coursePriceForPeriod.weekEndNumber} must be empty when 'Is inclusive Price' option is not checked!`);
          noErrorsAndCanUpdate = false;
          return;
        } else if (priceIsForWeekAndHasIncorrectValue(coursePriceForPeriod)) {
          alert(`The 'Price for week' value for course ${getCourseName(schoolCourse.course, schoolCourses)} in weeks ${coursePriceForPeriod.weekBeginNumber} - ${coursePriceForPeriod.weekEndNumber} has value '${coursePriceForPeriod.priceForWeek}' and it is invalid. Please fix it to have a float number value!`);
          noErrorsAndCanUpdate = false;
          return;
        } else if (priceIsInclusiveAndHasIncorrectValue(coursePriceForPeriod)) {
          alert(`The 'Price inclusive' value for course ${getCourseName(schoolCourse.course, schoolCourses)} in weeks ${coursePriceForPeriod.weekBeginNumber} - ${coursePriceForPeriod.weekEndNumber} has value '${coursePriceForPeriod.priceForWeek}' and it is invalid. Please fix it to have a float number value!`);
          noErrorsAndCanUpdate = false;
          return;
        } else if (coursePriceForPeriod.weekBeginNumber <= 0) {
          alert(`The 'Week begin number' for course ${getCourseName(schoolCourse.course, schoolCourses)} has value ${schoolCourse.weekBeginNumber} and it is invalid. It must be greater than 0!`);
          noErrorsAndCanUpdate = false;
          return;
        } else if (coursePriceForPeriod.weekEndNumber <= 0) {
          alert(`The 'Week end number' for course ${getCourseName(schoolCourse.course, schoolCourses)} has value ${schoolCourse.weekEndNumber} and it is invalid. It must be greater than 0!`);
          noErrorsAndCanUpdate = false;
          return;
        } else if (coursePriceForPeriod.weekEndNumber < coursePriceForPeriod.weekBeginNumber) {
          alert(`The 'Week end number' for course ${getCourseName(schoolCourse.course, schoolCourses)} has value ${coursePriceForPeriod.weekBeginNumber} and it is lower than 'Week begin number' with value ${coursePriceForPeriod.weekBeginNumber}!`);
          noErrorsAndCanUpdate = false;
          return;
        }
        if (weekCounterForCourse >= coursePriceForPeriod.weekBeginNumber) {
          alert(`The 'Week begin number' for course ${getCourseName(schoolCourse.course, schoolCourses)} has value ${coursePriceForPeriod.weekBeginNumber} and it is lower or equal than 'Week end number' of previous course price entry!!`);
          noErrorsAndCanUpdate = false;
          return;
        }
        if (coursePriceForPeriod.weekEndNumber < coursePriceForPeriod.minimumWeeks) {
          alert(`The 'Minimum weeks' for course ${getCourseName(schoolCourse.course, schoolCourses)} has value ${coursePriceForPeriod.minimumWeeks} and it is bigger than 'Week end number' of entry! It can be lower or equal!`);
          noErrorsAndCanUpdate = false;
          return;
        }
        weekCounterForCourse = coursePriceForPeriod.weekEndNumber;
      });
    });
  }
  return noErrorsAndCanUpdate;
};
