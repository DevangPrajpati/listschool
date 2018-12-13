import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Email } from 'meteor/email';

export const sendContactEmail = new ValidatedMethod({
  name: 'users.sendContactEmail',
  validate: new SimpleSchema({
    emailAddress: { type: String, regEx: SimpleSchema.RegEx.Email },
    description: { type: String },
  }).validator(),
  run(contactEmail) {
    if (Meteor.isServer) {
      Meteor.defer(() => {
        Email.send({
          to: Meteor.settings.private.mailgun.login,
          from: contactEmail.emailAddress,
          subject: 'Contact by website',
          text: contactEmail.description,
        });
      });
    }
  },
});

export const sendSchoolSuggestion = new ValidatedMethod({
  name: 'users.sendSchoolSuggestion',
  validate: new SimpleSchema({
    email: { type: String, regEx: SimpleSchema.RegEx.Email },
    name: { type: String },
    schoolName: { type: String },
    schoolCountry: { type: String },
    schoolCity: { type: String },
    comments: { type: String },
  }).validator(),
  run(suggestion) {
    if (Meteor.isServer) {
      Meteor.defer(() => {
        Email.send({
          to: Meteor.settings.private.mailgun.login,
          from: suggestion.email,
          subject: 'School Suggestion',
          html: `
            <strong>Suggestion from:</strong> ${suggestion.name} <br>
            <strong>School Name:</strong> ${suggestion.schoolName} <br>
            <strong>School Country:</string> ${suggestion.schoolCountry} <br>
            <strong>School City:</string> ${suggestion.schoolCity} <br>
            <string>Comments:</strong> ${suggestion.comments} <br>
          `,
        });
      });
    }
  },
});
