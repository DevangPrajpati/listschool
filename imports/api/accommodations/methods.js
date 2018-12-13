import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {Accommodations, ACCOMMODATIONS_COLLECTION_NAME} from './accommodations';
import {updateMethod, insertMethod, removeMethod} from '../collections-api';

export const insertAccommodation = insertMethod(Accommodations, ACCOMMODATIONS_COLLECTION_NAME,
  new SimpleSchema({
    accommodationName: {type: String},
  })
);

export const updateAccommodation = updateMethod(Accommodations, ACCOMMODATIONS_COLLECTION_NAME,
  new SimpleSchema({
    _id: {type: String},
    'update.accommodationName': {type: String},
  })
);

export const removeAccommodation = removeMethod(Accommodations, ACCOMMODATIONS_COLLECTION_NAME,
  new SimpleSchema({
    _id: {type: String},
  })
);
