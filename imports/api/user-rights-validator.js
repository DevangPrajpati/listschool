import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';

export const checkIfUserIsLoggedAndThrowErrorIfNeeded = (collectionName, operationName, userId) => {
  if (!userId) {
    throw new Meteor.Error(`${collectionName}.${operationName}.notLoggedIn`, `Must be logged in to ${operationName} to ${collectionName}.`);
  }
};
export const checkIfUserHasAdminRoleAndThrowErrorIfNeeded = (collectionName, operationName, userId) => {
  if (!Roles.userIsInRole(userId, ['admin'], Roles.GLOBAL_GROUP)) {
    throw new Meteor.Error(`${collectionName}.${operationName}.accessDenied`, `Must be admin to ${operationName} to ${collectionName}.`);
  }
};
