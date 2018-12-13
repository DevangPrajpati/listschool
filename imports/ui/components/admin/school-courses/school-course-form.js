import React from 'react';
import {browserHistory} from 'react-router';
import {Panel} from 'react-bootstrap';
import {Bert} from 'meteor/themeteorchef:bert';
import {AutoField, AutoForm, SelectField, SubmitField, BoolField, NumField, DateField, ListDelField, ListField} from 'uniforms-bootstrap3';
import {SchoolCourses} from '/imports/api/school-courses/school-courses';
import {insertSchoolCourse, updateSchoolCourse} from '/imports/api/school-courses/methods';
import {updateSchoolCoursePricesWithNewCourse} from '/imports/api/schools/methods';
import i18n from 'meteor/universe:i18n';
import {Checkbox} from "../../../elements/Checkbox";
import {getTranslation} from "../../../../utils/translation-utils";

const handleInsert = (doc) => {
  insertSchoolCourse.call(doc, (error) => {
    if (error) {
      Bert.alert(error, 'warning');
    } else {
      Bert.alert('School course inserted!', 'success');
      browserHistory.push('/admin/schoolCourses');
    }
  });
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

  updateSchoolCourse.call(args, (error) => {
    if (error) {
      console.log(error)
      Bert.alert(error, 'warning');
    } else {
      Bert.alert('School course updated!', 'success');
      // browserHistory.push('/');
    }
  });

};

const handleSubmit = (schoolCourseDoc, schoolCourse) => {
  if (schoolCourse) {
    handleUpdate(schoolCourseDoc);
  } else {
    handleInsert(schoolCourseDoc);
  }
};

export const SchoolCourseForm = ({schoolCourse, subjects}) => {
  const T = i18n.createComponent();
  const courses = [schoolCourse];
  return (
    <AutoForm schema={SchoolCourses.schema}
              model={schoolCourse}
              label={false}
              placeholder={true}
              onSubmit={doc => handleSubmit(doc, schoolCourse)}>
      {/*<input type = "file" id = "filepicker" placeholder = "Upload CSV" onChange = {(e)=>{handleUpload(e, subjects)}}/>*/}
      <Panel header="Course">
        <AutoField name="courseName" label={true}/>
      
        <AutoField name="course_desc" label={true}/>
     
        <SelectField
          name="subject"
          allowedValues={subjects.map((subject) => subject._id)}
          transform={(subjectId) => subjects.filter(subject => subject._id === subjectId)
            .map(subject => subject.subjectName)[0]}
        />
        <AutoField name="language" label={true}/>
      </Panel>
      <Panel header="Basic Course Requirements">
        <SelectField
          label = {true}
          name="min_duration"
          defaultValue = "1"
          allowedValues={_.range(1, 53)}
        />
      
        <NumField name="max_duration" label={true}/>
      
        <AutoField name="level_required" label={true}/>
      
        <NumField name="min_age" label={true}/>
      
        <NumField name="max_age" label={true}/>
      
        <AutoField name="hours_week" label={true}/>
      
        <AutoField name="lessons_week" label={true}/>
      </Panel>

      <Panel header="Space">
        <NumField name="classrooms_avalbl" label={true}/>
      
        <NumField name="max_class_size" label={true}/>
      </Panel>

      <Panel header="Available Class Schedules">
        <AutoField name="morning" label={true}/>
      
        <AutoField name="afternoon" label={true}/>
      
        <AutoField name="night" label={true}/>
    
        <AutoField name="all_day" label={true}/>
      </Panel>
      
      <Panel header="Start Dates">
        <DateField name="start_dates" dateFormat = {"YYYY-MM-DD"} label={true}/>
      </Panel>

      <Panel header="Price Information">
        <AutoField name="fullpay_required" label={true}/>
        <AutoField name="government_insurance" label={true}/>
        <AutoField name="price_valid_date" label={true}/>
        <AutoField name="course_currency" label={true}/>
        <NumField name="course_commision" label={true}/>
      </Panel>

      <Panel header="Cost per duration">
        <ListField name="coursePrice" label={true}>
          <ListDelField name="$"/>
          
          <AutoField name="$" label={true}/>
        </ListField>
      </Panel>

      <SubmitField/>
    </AutoForm>
  );
};

SchoolCourseForm.propTypes = {
  schoolCourse: React.PropTypes.object,
};
