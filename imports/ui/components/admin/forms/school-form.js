import React from 'react';
import {browserHistory} from 'react-router';
import {Panel} from 'react-bootstrap';
import {Bert} from 'meteor/themeteorchef:bert';
import {AutoField, AutoForm, ErrorsField, ListDelField, ListField, SelectField, SubmitField} from 'uniforms-bootstrap3';
import VerifyIfDataAreCorrectAndLogErrorIfNot from './school-form-data-validation';
import {Schools} from '/imports/api/schools/schools';
import {insertSchool, updateSchool} from '/imports/api/schools/methods';
import {Cities} from '/imports/api/cities/cities';
import {Checkbox} from "../../../elements/Checkbox";

const handleInsert = (doc) => {
  insertSchool.call(doc, (error) => {
    if (error) {
      Bert.alert(error, 'warning');
    } else {
      Bert.alert('School inserted!', 'success');
      browserHistory.push('/admin/schools');
    }
  });
};


const handleUpdate = (doc) => {
  const args = {
    _id: doc._id,
    update: {
      name: doc.name,
      description: doc.description,
      accommodations: doc.accommodations,
      facilities: doc.facilities,
      profile: doc.profile,
      schoolCourses: doc.schoolCourses,
    },
  };

  updateSchool.call(args, (error) => {
    if (error) {
      Bert.alert(error, 'warning');
    } else {
      Bert.alert('School updated!', 'success');
      browserHistory.push('/');
    }
  });
};

const handleSubmit = (doc, school, schoolCourses) => {
  let noErrorsAndCanUpdate = VerifyIfDataAreCorrectAndLogErrorIfNot(doc, schoolCourses);
  if (noErrorsAndCanUpdate) {
    if (school) {
      handleUpdate(doc);
    } else {
      console.log(doc);
      handleInsert(doc);
    }
  }
};

const cityTranform = (cityId) => (Cities.findOne(cityId).name);

export const SchoolForm = ({cities, school, schoolCourses, accommodations, facilities}) => {
  let cityField = <div></div>;
  if (!school) {
    cityField = <SelectField
      name="cityId"
      allowedValues={cities.map((city) => (city._id))}
      transform={cityTranform}
    />;
  }

  let accommodationIdsArray = school ? school.accommodations : [];
  let facilitiesIdsArray = school ? school.facilities : [];
  return (
    <AutoForm schema={Schools.schema}
              model={school}
              label={false}
              placeholder={true}
              onSubmit={doc => {
                doc.accommodations = accommodationIdsArray;
                doc.facilities = facilitiesIdsArray;
                doc.schoolCourses = doc.schoolCourses ? doc.schoolCourses : [];
                console.log(doc.schoolCourses)
                handleSubmit(doc, school, schoolCourses)
              }}>

      {cityField}
      <AutoField name="name" label={true}/>
      <AutoField name="description" label={true}/>
      <Panel header="Accommodations">
        {accommodations.map((accommodation) => {
            return (
              <Checkbox
                onClick={(value, isChecked) => {
                  if (!isChecked && accommodationIdsArray.includes(accommodation._id)) {
                    let indexOfItemToRemove = accommodationIdsArray.indexOf(accommodation._id);
                    accommodationIdsArray.splice(indexOfItemToRemove, 1);
                  } else if (isChecked) {
                    accommodationIdsArray.push(accommodation._id);
                  }
                }}
                labelToTranslateAndDisplay={accommodation.accommodationName}
                initCheck={accommodationIdsArray.includes(accommodation._id)}
                key={accommodation._id}
              />);
          }
        )}
      </Panel>

      <Panel header="Facilities">
        {facilities.map((facility) => {
            return (
              <Checkbox
                onClick={(value, isChecked) => {
                  if (!isChecked && facilitiesIdsArray.includes(facility._id)) {
                    let indexOfItemToRemove = facilitiesIdsArray.indexOf(facility._id);
                    facilitiesIdsArray.splice(indexOfItemToRemove, 1);
                  } else if (isChecked) {
                    facilitiesIdsArray.push(facility._id);
                  }
                }}
                labelToTranslateAndDisplay={facility.facilityName}
                initCheck={facilitiesIdsArray.includes(facility._id)}
                key={facility._id}
              />);
          }
        )}
      </Panel>

      <Panel header="Profile">
        <AutoField name="profile" label={true}/>
      </Panel>

      <ErrorsField/>
      {/*<Panel header="Profile">
        <ListField name="schoolCourses" label={true}>
          <ListDelField name="$"/>
          <SelectField
            name="$.course"
            allowedValues={schoolCourses.map((schoolCourse) => schoolCourse._id)}
            transform={(schoolCourseId) => schoolCourses.filter(schoolCourse => schoolCourse._id === schoolCourseId)[0].courseName}
          />
          <AutoField name="$" fields={['coursePrice']} label={true}/>
        </ListField>
      </Panel>*/}
      <SubmitField/>
    </AutoForm>
  );
};

SchoolForm.propTypes = {
  school: React.PropTypes.object,
  cities: React.PropTypes.array,
  schoolCourses: React.PropTypes.array,
  accommodations: React.PropTypes.array,
  facilities: React.PropTypes.array,
};
