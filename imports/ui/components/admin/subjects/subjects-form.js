import React from 'react';
import {browserHistory} from 'react-router';
import {Panel} from 'react-bootstrap';
import {Bert} from 'meteor/themeteorchef:bert';
import {AutoField, AutoForm, SubmitField} from 'uniforms-bootstrap3';
import {Subjects} from '/imports/api/subjects/subjects';
import {insertSubject, updateSubject} from '/imports/api/subjects/methods';

const handleInsert = (doc) => {
  insertSubject.call(doc, (error) => {
    if (error) {
      Bert.alert(error, 'warning');
    } else {
      Bert.alert('Subject inserted!', 'success');
      browserHistory.push('/admin/subjects');
    }
  });
};

const handleUpdate = (subjectDoc) => {
  const args = {
    _id: subjectDoc._id,
    update: {
      subjectName: subjectDoc.subjectName,
    },
  };

  updateSubject.call(args, (error) => {
    if (error) {
      Bert.alert(error, 'warning');
    } else {
      Bert.alert('Subject updated!', 'success');
      browserHistory.push('/admin/subjects');
    }
  });

};

const handleSubmit = (subjectDoc, subject) => {
  if (subject) {
    handleUpdate(subjectDoc);
  } else {
    handleInsert(subjectDoc);
  }
};

export const SubjectsForm = ({subject: subject}) => {
  return (
    <AutoForm schema={Subjects.schema}
              model={subject}
              label={false}
              placeholder={true}
              onSubmit={doc => handleSubmit(doc, subject)}>


      <Panel header="Subject">
        <AutoField name="subjectName" label={true}/>
      </Panel>

      <SubmitField/>
    </AutoForm>
  );
};

SubjectsForm.propTypes = {
  subject: React.PropTypes.object,
};
