import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Panel } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { AutoForm, AutoField, ErrorsField, SubmitField, NestField } from 'uniforms-bootstrap3';
import { SchoolFeedbacks } from '/imports/api/school-feedbacks/school-feedbacks';
import { insertSchoolFeedback, updateSchoolFeedback } from '/imports/api/school-feedbacks/methods';
import GradeForm from '/imports/modules/grade-form';

const handleInsert = (doc) => {
  const args = {
    school: doc.school,
    grades: doc.grades,
    comment: doc.comment,
  };

  insertSchoolFeedback.call(args, (error) => {
    if (error) {
      Bert.alert(error, 'warning');
    } else {
      Bert.alert('Feedback para a escola cadastrada!', 'success');
      Session.set('GivenFeedback', false);
    }
  });
};

const handleUpdate = (doc) => {
  const args = {
    _id: doc._id,
    update: {
      grades: doc.grades,
      comment: doc.comment,
    },
  };

  updateSchoolFeedback.call(args, (error) => {
    if (error) {
      Bert.alert(error, 'warning');
    } else {
      Bert.alert('Feedback para a escola atualizada!', 'success');
      Session.set('GivenFeedback', false);
    }
  });
};

const handleSubmit = (doc) => {
  if (doc._id) {
    handleUpdate(doc);
  } else {
    handleInsert(doc);
  }
};

const schoolFeedback = (school) => {
  let doc = { user: Meteor.userId(), school: school._id };
  if (SchoolFeedbacks.findOne(doc)) {
    doc = SchoolFeedbacks.findOne(doc);
  }

  return doc;
};

export const SchoolFeedbackForm = ({ school }) => (
  <AutoForm schema={SchoolFeedbacks.schema}
    model={schoolFeedback(school)}
    onSubmit={doc => handleSubmit(doc)}>

    <Panel header="Your Feedback">
      <NestField name="grades" label={false}>
          <GradeForm name="qualityOfTeaching" label="qualityOfTeaching" />
          <GradeForm name="teachingMaterial" label="teachingMaterial" />
          <GradeForm name="schoolFacilities" label="schoolFacilities" />
          <GradeForm name="socialExtraActivities" label="socialExtraActivities" />
          <GradeForm name="schoolLocation" label="schoolLocation" />
          <GradeForm name="housing" label="housing" />
      </NestField>
    </Panel>

    <AutoField name="comment" />

    <ErrorsField />

    <SubmitField />
  </AutoForm>
);

SchoolFeedbackForm.propTypes = { school: React.PropTypes.object };
