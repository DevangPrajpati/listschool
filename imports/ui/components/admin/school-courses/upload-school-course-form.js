import React from 'react';
import {browserHistory} from 'react-router';
import {Panel, Button, Glyphicon, Row, Col, Grid} from 'react-bootstrap';
import {Bert} from 'meteor/themeteorchef:bert';
import {AutoField, AutoForm, SelectField, SubmitField} from 'uniforms-bootstrap3';
import {SchoolCourses} from '/imports/api/school-courses/school-courses';
import {insertSchoolCourse, updateSchoolCourse} from '/imports/api/school-courses/methods';
import {updateSchool} from '/imports/api/schools/methods';
import {updateSchoolCoursePricesWithNewCourse} from '/imports/api/schools/methods';
import i18n from 'meteor/universe:i18n';
import {getTranslation} from "../../../../utils/translation-utils";
import { Schools } from '/imports/api/schools/schools';

const handleInsert = (doc, school) => {
  insertSchoolCourse.call(doc, (error, resp) => {
    if (error) {
      Bert.alert(error, 'warning');
    }
    else{
      if (school) {
        addCourseToSchool(school, {_id: resp})
      }

    }
  });
};

const addCourseToSchool = (school, courseObj) => {
  school.schoolCourses.push({course: courseObj._id});
  const args = {
    _id: school._id,
    update: {
      name: school.name,
      description: school.description,
      accommodations: school.accommodations,
      facilities: school.facilities,
      schoolCourses: school.schoolCourses,
    },
  };
  updateSchool.call(args, (error, resp) => {
    console.log('The saved school is :: ', resp, error);
    if (error) {
      Bert.alert(error, 'warning');
    }
  })
};

const handleUpdate = (schoolCourseDoc) => {
  let numFields = ['min_duration', 'max_duration', 'min_age', 'max_age', 'classrooms_avalbl', 'max_class_size', 'course_commision']
  numFields.map((field)=>{
    if (schoolCourseDoc[field]) {
      schoolCourseDoc[field] = parseInt(schoolCourseDoc[field])
    }
  });
  const args = {
    _id: schoolCourseDoc._id,
    update: _.omit(schoolCourseDoc, '_id'),
  };

  updateSchoolCourse.call(args, (error, success) => {
    if (error) {
      Bert.alert(error, 'warning');
    } else {
      Bert.alert(schoolCourseDoc.courseName+' course updated!', 'success');
    }
  });

};

const handleUpload = (e, subjects, schoolCourses, school) => {
  e.stopPropagation()
  var f = document.getElementById('filepicker').files[0];
  readFile(f, function(content) {
    import_course_info(content, subjects, schoolCourses, school)
  });
};

const readFile = function(f,onLoadCallback) {
  var reader = new FileReader();
  reader.onload = function (e){
    var contents=e.target.result
    onLoadCallback(contents);
  }
  reader.readAsText(f);
};

const import_course_info = function(file, subjects, schoolCourses, school) {
  var lines = file.split(/\r\n|\n/);
  var l = lines && lines.length - 2;
  var addedCourses = 0;
  var schoolName = null;
  var schoolToUpdate = null;
  for (var i=0; i < l; i++) {
    var line = lines[i];
    var line_parts = line.split(',');
    schoolName = line_parts[0];
    let courseObj = {
      courseName : line_parts[1],
      subject : line_parts[2],
      level_required : line_parts[3],
      min_age : line_parts[4],
      max_age : line_parts[5],
      hours_week : line_parts[6],
      lessons_week : line_parts[7],
      min_duration : line_parts[8],
      max_duration : line_parts[9],
      classrooms_avalbl : line_parts[10],
      max_class_size : line_parts[11],
      morning : line_parts[12],
      afternoon : line_parts[13],
      night : line_parts[14],
      all_day : line_parts[15],
      course_desc : line_parts[16],
      start_dates : line_parts[17],
      fullpay_required : line_parts[18],
      government_insurance : line_parts[19],
      price_valid_date : line_parts[20],
      course_currency : line_parts[21],
      course_commision : line_parts[22],
    };
    let isValid = validateFields(courseObj, subjects)
    var lastIndex = (i == (l - 1)) ? true : false;
    if (isValid) {
      subjects.map((s)=>{
        if (s.subjectName.toLowerCase() == courseObj.subject.replace('_', '').toLowerCase()) {
          courseObj.subject = s._id
        }
      });
      let numFields = ['min_duration', 'max_duration', 'min_age', 'max_age', 'classrooms_avalbl', 'max_class_size', 'course_commision']
      numFields.map((field)=>{
        if (courseObj[field]) {
          courseObj[field] = parseInt(courseObj[field])
        } else{
          courseObj[field] = null
        }
      });
      let boolFields = ['morning', 'afternoon', 'night', 'all_day', 'fullpay_required', 'government_insurance']
      boolFields.map((field)=>{
        if (courseObj[field] == 'Y') {
          courseObj[field] = true
        } else{
          courseObj[field] = false
        }
      });

      let dateFields = ['start_dates', 'price_valid_date']
      dateFields.map((field)=>{
        if (courseObj[field]) {
          courseObj[field] = new Date(courseObj[field])
        } else{
          courseObj[field] = null
        }
      });

      //insert course to db
      let courseExists = _.find(schoolCourses, function(course) {
        return course.courseName === courseObj.courseName;
      });
      addedCourses = addedCourses + 1;
      if (courseExists) {
        courseObj._id = _.result(courseExists, '_id')
        handleUpdate(courseObj);
      } else {
        handleInsert(courseObj, school);
      }

    }
    if (lastIndex) {
      Bert.alert(addedCourses + ' school courses inserted!', 'success');
      // browserHistory.push('/admin/schools');
    }
  };
};

const validateFields = function (fieldsObj, subjects) {
  let currentSubjectNames = _.pluck(subjects, 'subjectName').map((s)=>{
    return s.toLowerCase()
  })
  if (!fieldsObj.subject) {
    Bert.alert('sorry, course category is required', 'danger');
    return false;
  }

  if (!_.contains(currentSubjectNames, fieldsObj.subject.replace('_', '').toLowerCase())) {
    Bert.alert('Subject named '+fieldsObj.subject+' does not exist', 'warning');
    return false
  }
  return true;
};

const openFileInput = () => {
  this.fileInput.click()
}

const handleNewSchoolCourse = () => browserHistory.push('/admin/schoolCourses/new');

export const UploadSchoolCourseForm = ({ schoolCourses, subjects, school }) => {
  const T = i18n.createComponent();
  return (
    <div>
      <Panel header="Upload Courses">
        <input
          id="filepicker"
          style={{display:'none'}}
          ref={(input) => { this.fileInput = input; }}
          type="file"
          accept=".csv"
          pattern="^.+\.(xlsx|xls|csv)$"
          onChange = {(e)=>{handleUpload(e, subjects, schoolCourses, school)}}/>
          <Grid>
            <Row>
              <Col xs={6} lg={3}>
                <Button bsStyle="info" onClick={openFileInput}>
                  <Glyphicon glyph="cloud-upload"/> Upload Multiple Courses
                </Button>
              </Col>
              <Col xs={6} lg={3}>
                <Button bsStyle="success" block onClick={handleNewSchoolCourse}>
                  <Glyphicon glyph="plus"/><T>schoolCourse</T>
                </Button>
              </Col>
            </Row>
          </Grid>
        </Panel>
      </div>
    );
  };

  UploadSchoolCourseForm.propTypes = {
    schoolCourses: React.PropTypes.array,
    subjects: React.PropTypes.array,
    school: React.PropTypes.object
  };