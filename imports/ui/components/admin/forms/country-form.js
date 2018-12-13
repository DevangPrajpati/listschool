import React from 'react';
import { browserHistory } from 'react-router';
import { Panel } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { AutoForm, AutoField, ErrorsField, SubmitField } from 'uniforms-bootstrap3';
import { Countries } from '/imports/api/countries/countries';
import { insertCountry, updateCountry } from '/imports/api/countries/methods';

const handleInsert = (doc) => {
  insertCountry.call(doc, (error) => {
    if (error) {
      Bert.alert(error, 'warning');
    } else {
      Bert.alert('Country inserted!', 'success');
      browserHistory.push('/admin/countries');
    }
  });
};

const handleUpdate = (doc) => {
  const args = {
    _id: doc._id,
    update: {
      name: doc.name,
      profile: doc.profile,
    },
  };

  updateCountry.call(args, (error) => {
    if (error) {
      Bert.alert(error, 'warning');
    } else {
      Bert.alert('Country updated!', 'success');
      browserHistory.push('/');
    }
  });
};

const handleSubmit = (doc, country) => {
  if (country) {
    handleUpdate(doc);
  } else {
    handleInsert(doc);
  }
};

export const CountryForm = ({ country }) => (
  <AutoForm schema={Countries.schema}
    model={country}
    label={false}
    placeholder={true}
    onSubmit={doc => handleSubmit(doc, country)}>

    <AutoField name="name" />

    <Panel header="Profile">
      <AutoField name="profile" />
    </Panel>

    <ErrorsField />
    <SubmitField />
  </AutoForm>
);

CountryForm.propTypes = { country: React.PropTypes.object };
