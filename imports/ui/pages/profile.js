import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Bert} from 'meteor/themeteorchef:bert';
import {Grid} from 'react-bootstrap';
import {AutoForm, AutoField, ErrorsField, SubmitField} from 'uniforms-bootstrap3';
import {ProfileSchema} from '/imports/api/users/users';
import {browserHistory} from 'react-router';
import i18n from 'meteor/universe:i18n';

const handleSubmit = (doc) => {
  Meteor.users.update(Meteor.userId(), {$set: {profile: doc}}, (error) => {
    if (error) {
      Bert.alert(error.reason, 'warning');
    } else {
      Bert.alert('Profile updated!', 'success');
      browserHistory.push('/');
    }
  });
};

const fullAutoForm = () => {
  const T = i18n.createComponent();
  return (
    <Grid className="main-app-container">
      <div className="form-view-container">
        <AutoForm
          schema={ProfileSchema}
          model={Meteor.user().profile}
          label={false}
          placeholder={true}
          onSubmit={doc => handleSubmit(doc)}
        >
          <AutoField name="firstName"/>
          <AutoField name="lastName"/>
          <AutoField name="allowContact" placeholder={<T>allowUsToContact</T>}/>
          <ErrorsField/>
          <SubmitField/>
        </AutoForm>
      </div>
    </Grid>
  );
};

export const Profile = () => (
  <div>
    {fullAutoForm()}
  </div>
);
