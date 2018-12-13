import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {Facilities, FACILITIES_COLLECTION_NAME} from './facilities';
import {updateMethod, insertMethod, removeMethod} from '../collections-api';


export const insertFacility = insertMethod(Facilities, FACILITIES_COLLECTION_NAME,
  new SimpleSchema({
    facilityName: {type: String},
  })
);

export const updateFacility = updateMethod(Facilities, FACILITIES_COLLECTION_NAME,
  new SimpleSchema({
    _id: {type: String},
    'update.facilityName': {type: String},
  })
);

export const removeFacility = removeMethod(Facilities, FACILITIES_COLLECTION_NAME,
  new SimpleSchema({
    _id: {type: String},
  })
);
