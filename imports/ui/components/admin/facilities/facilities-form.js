import React from 'react';
import {browserHistory} from 'react-router';
import {Panel} from 'react-bootstrap';
import {Bert} from 'meteor/themeteorchef:bert';
import {AutoField, AutoForm, SubmitField} from 'uniforms-bootstrap3';
import {Facilities} from '/imports/api/facilities/facilities';
import {insertFacility, updateFacility} from '/imports/api/facilities/methods';

const handleInsert = (doc) => {
  insertFacility.call(doc, (error) => {
    if (error) {
      Bert.alert(error, 'warning');
    } else {
      Bert.alert('Facility inserted!', 'success');
      browserHistory.push('/admin/facilities');
    }
  });
};

const handleUpdate = (facilityDoc) => {
  const args = {
    _id: facilityDoc._id,
    update: {
      facilityName: facilityDoc.facilityName,
    },
  };

  updateFacility.call(args, (error) => {
    if (error) {
      Bert.alert(error, 'warning');
    } else {
      Bert.alert('Facility updated!', 'success');
      browserHistory.push('/admin/facilities');
    }
  });

};

const handleSubmit = (facilityDoc, facility) => {
  if (facility) {
    handleUpdate(facilityDoc);
  } else {
    handleInsert(facilityDoc);
  }
};

export const FacilitiesForm = ({facility: facility}) => {
  return (
    <AutoForm schema={Facilities.schema}
              model={facility}
              label={false}
              placeholder={true}
              onSubmit={doc => handleSubmit(doc, facility)}>


      <Panel header="Facility">
        <AutoField name="facilityName" label={true}/>
      </Panel>

      <SubmitField/>
    </AutoForm>
  );
};

FacilitiesForm.propTypes = {
  facility: React.PropTypes.object,
};
