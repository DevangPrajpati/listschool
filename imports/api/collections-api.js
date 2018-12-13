import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {
  checkIfUserIsLoggedAndThrowErrorIfNeeded,
  checkIfUserHasAdminRoleAndThrowErrorIfNeeded
} from './user-rights-validator';

export const updateMethod = (collection, collectionName, validateSimpleSchema) => {
  return new ValidatedMethod({
    name: `${collectionName}.update`,
    validate: validateSimpleSchema.validator(),
    run({_id, update}) {
      checkIfUserIsLoggedAndThrowErrorIfNeeded(collectionName, 'update', this.userId);
      checkIfUserHasAdminRoleAndThrowErrorIfNeeded(collectionName, 'update', this.userId);
      collection.update(_id, {$set: update});
    },
  });
};

export const insertMethod = (collection, collectionName, validateSimpleSchema) => {
  return new ValidatedMethod({
    name: `${collectionName}.insert`,
    validate: validateSimpleSchema.validator(),
    run(insertData) {
      checkIfUserIsLoggedAndThrowErrorIfNeeded(collectionName, 'insert', this.userId);
      checkIfUserHasAdminRoleAndThrowErrorIfNeeded(collectionName, 'insert', this.userId);
      return collection.insert(insertData);
    },
  });
};

export const removeMethod = (collection, collectionName, validateSimpleSchema) => {
  return new ValidatedMethod({
    name: `${collectionName}.remove`,
    validate: validateSimpleSchema.validator(),
    run({_id}) {
      checkIfUserIsLoggedAndThrowErrorIfNeeded(collectionName, 'remove', this.userId);
      checkIfUserHasAdminRoleAndThrowErrorIfNeeded(collectionName, 'remove', this.userId);
      collection.remove(_id);
    },
  });
};
