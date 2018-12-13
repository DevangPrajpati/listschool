import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Panel } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { AutoForm, ErrorsField, SubmitField, NestField } from 'uniforms-bootstrap3';
import { CityFeedbacks } from '/imports/api/city-feedbacks/city-feedbacks';
import { insertCityFeedback, updateCityFeedback } from '/imports/api/city-feedbacks/methods';
import GradeForm from '/imports/modules/grade-form';

const handleInsert = (doc) => {
  const args = {
    city: doc.city,
    grades: doc.grades,
  };

  insertCityFeedback.call(args, (error) => {
    if (error) {
      Bert.alert(error, 'warning');
    } else {
      Bert.alert('Feedback para cidade cadastrada!', 'success');
      Session.set('GivenFeedback', false);
    }
  });
};

const handleUpdate = (doc) => {
  const args = {
    _id: doc._id,
    update: {
      grades: doc.grades,
    },
  };

  updateCityFeedback.call(args, (error) => {
    if (error) {
      Bert.alert(error, 'warning');
    } else {
      Bert.alert('Feedback para cidade atualizada!', 'success');
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

const cityFeedback = (city) => {
  let doc = { user: Meteor.userId(), city: city._id };
  if (CityFeedbacks.findOne(doc)) {
    doc = CityFeedbacks.findOne(doc);
  }

  return doc;
};

export const CityFeedbackForm = ({ city }) => (
  <AutoForm schema={CityFeedbacks.schema}
    model={cityFeedback(city)}
    onSubmit={doc => handleSubmit(doc)}>

    <Panel header="Your Feedback">
      <NestField name="grades" label={false}>
          <GradeForm name="accessibility" label="accessibility"/>
          <GradeForm name="costOfLife" label="costOfLife" />
          <GradeForm name="leisure" label="leisure" />
          <GradeForm name="publicTransport" label="publicTransport" />
          <GradeForm name="qualityOfLife" label="qualityOfLife" />
          <GradeForm name="safety" label="safety" />
      </NestField>
    </Panel>

    <ErrorsField />

    <SubmitField />
  </AutoForm>
);

CityFeedbackForm.propTypes = { city: React.PropTypes.object };
