import React from 'react';
import {browserHistory} from 'react-router';
import {Panel} from 'react-bootstrap';
import {Bert} from 'meteor/themeteorchef:bert';
import {AutoField, AutoForm, SubmitField} from 'uniforms-bootstrap3';
import {Accommodations} from '/imports/api/accommodations/accommodations';
import {insertAccommodation, updateAccommodation} from '/imports/api/accommodations/methods';

const handleInsert = (doc) => {
  insertAccommodation.call(doc, (error) => {
    if (error) {
      Bert.alert(error, 'warning');
    } else {
      Bert.alert('School course inserted!', 'success');
      browserHistory.push('/admin/accommodations');
    }
  });
};

const handleUpdate = (accommodationsDoc) => {
  const args = {
    _id: accommodationsDoc._id,
    update: {
      accommodationName: accommodationsDoc.accommodationName,
    },
  };

  updateAccommodation.call(args, (error) => {
    if (error) {
      Bert.alert(error, 'warning');
    } else {
      Bert.alert('Accommodation updated!', 'success');
      browserHistory.push('/admin/accommodations');
    }
  });

};

const handleSubmit = (accommodationDoc, accommodation) => {
  if (accommodation) {
    handleUpdate(accommodationDoc);
  } else {
    handleInsert(accommodationDoc);
  }
};

export const AccommodationsForm = ({accommodation: accommodation}) => {
  return (
    <AutoForm schema={Accommodations.schema}
              model={accommodation}
              label={false}
              placeholder={true}
              onSubmit={doc => handleSubmit(doc, accommodation)}>

      <Panel header="Accomodations">
        <AutoField name="accommodationName" label={true}/>
      </Panel>
      <SubmitField/>
    </AutoForm>
  );
};

AccommodationsForm.propTypes = {
  accommodation: React.PropTypes.object,
};
