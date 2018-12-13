import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {Subjects, SUBJECTS_COLLECTION_NAME} from './subjects';
import {updateMethod, insertMethod, removeMethod} from '../collections-api';

export const insertSubject = insertMethod(Subjects, SUBJECTS_COLLECTION_NAME,
  new SimpleSchema({
    subjectName: {type: String},
  })
);

export const updateSubject = updateMethod(Subjects, SUBJECTS_COLLECTION_NAME,
  new SimpleSchema({
    _id: {type: String},
    'update.subjectName': {type: String},
  })
);

export const removeSubject = removeMethod(Subjects, SUBJECTS_COLLECTION_NAME,
  new SimpleSchema({
    _id: {type: String},
  })
);
