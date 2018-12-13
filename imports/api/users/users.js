import faker from 'faker';
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import { Roles } from 'meteor/alanning:roles';
import { BooleanForm } from '/imports/modules/boolean-form';

export const Users = Meteor.users;

export const ProfileSchema = new SimpleSchema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  facebook: {
    type: String,
    optional: true,
  },
  google: {
    type: String,
    optional: true,
  },
  instagram: {
    type: String,
    optional: true,
  },
  snapchat: {
    type: String,
    optional: true,
  },
  youtube: {
    type: String,
    optional: true,
  },
  twitter: {
    type: String,
    optional: true,
  },
  world: {
    type: Boolean,
    optional: true,
    uniforms: BooleanForm,
  },
  ireland: {
    type: Boolean,
    optional: true,
    uniforms: BooleanForm,
  },
  canada: {
    type: Boolean,
    optional: true,
    uniforms: BooleanForm,
  },
  australia: {
    type: Boolean,
    optional: true,
    uniforms: BooleanForm,
  },
  eua: {
    type: Boolean,
    optional: true,
    uniforms: BooleanForm,
  },
  public: {
    type: Boolean,
    optional: true,
    uniforms: BooleanForm,
  },
  allowContact: {
    type: Boolean,
    optional: true,
    uniforms: BooleanForm,
  },
});

Users.schema = new SimpleSchema({
  username: {
    type: String,
    optional: true,
  },
  emails: {
    type: Array,
    optional: true,
  },
  'emails.$': {
    type: Object,
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  'emails.$.verified': {
    type: Boolean,
  },
  registered_emails: {
    type: [Object],
    optional: true,
    blackbox: true,
  },
  createdAt: {
    type: Date,
    optional: true,
  },
  profile: {
    type: ProfileSchema,
    optional: true,
  },
  // Make sure this services field is in your schema if you're using any of the accounts packages
  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  // Add `roles` to your schema if you use the meteor-roles package.
  // Option 1: Object type
  // If you specify that type as Object, you must also specify the
  // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
  // Example:
  // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
  // You can't mix and match adding with and without a group since
  // you will fail validation in some cases.
  roles: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  // In order to avoid an 'Exception in setInterval callback' from Meteor
  heartbeat: {
    type: Date,
    optional: true,
  },
});

Users.attachSchema(Users.schema);

Factory.define('user_admin', Users, {
  email: faker.internet.email(),
  password: faker.internet.password(),
  profile: () => (
    { firstName: faker.name.firstName(), lastName: faker.name.lastName() }
  ),
}).after(user => {
  Roles.addUsersToRoles(user._id, ['admin'], Roles.GLOBAL_GROUP);
});

Factory.define('user', Users, {
  email: faker.internet.email(),
  password: faker.internet.password(),
  profile: () => (
    { firstName: faker.name.firstName(), lastName: faker.name.lastName() }
  ),
});
