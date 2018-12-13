import React from 'react';
import { browserHistory } from 'react-router';
import { Panel } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { AutoForm, AutoField, ErrorsField,
          SubmitField, SelectField, NestField } from 'uniforms-bootstrap3';
import { Cities } from '/imports/api/cities/cities';
import { insertCity, updateCity } from '/imports/api/cities/methods';
import { Countries } from '/imports/api/countries/countries';

const handleInsert = (doc) => {
  insertCity.call(doc, (error) => {
    if (error) {
      Bert.alert(error, 'warning');
    } else {
      Bert.alert('City inserted!', 'success');
      browserHistory.push('/admin/cities');
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

  updateCity.call(args, (error) => {
    if (error) {
      Bert.alert(error, 'warning');
    } else {
      Bert.alert('City updated!', 'success');
      browserHistory.push('/');
    }
  });
};

const handleSubmit = (doc, city) => {
  if (city) {
    handleUpdate(doc);
  } else {
    handleInsert(doc);
  }
};

const countryTranform = (countryId) => (Countries.findOne(countryId).name);

export const CityForm = ({ countries, city }) => {
  let countryField = <div></div>;
  if (!city) {
    countryField = <SelectField
                             name="country"
                             allowedValues={countries.map((country) => (country._id))}
                             transform={countryTranform}
                />;
  }

  return (
    <AutoForm schema={Cities.schema}
      model={city}
      placeholder={true}
      onSubmit={doc => handleSubmit(doc, city)}>

      {countryField}

      <AutoField name="name" />

      <Panel header="Profile">
        <NestField name="profile" label={false}>
          <AutoField name="small" />
          <AutoField name="town" />
          <AutoField name="beach" />
          <AutoField name="large" />
          <AutoField name="campus" />
          <AutoField name="bicycle" />
          <AutoField name="sports" />
          <AutoField name="snow" />
          <AutoField name="sunny" />
          <AutoField name="glamour" />
          <AutoField name="outdoors" />
          <AutoField name="academic" />
          <AutoField name="countryside" />
          <AutoField name="mountain" />
          <AutoField name="youtube" label={true} />
        </NestField>
      </Panel>

      <ErrorsField />
      <SubmitField />
    </AutoForm>
  );
};

CityForm.propTypes = {
  city: React.PropTypes.object,
  countries: React.PropTypes.array,
};
