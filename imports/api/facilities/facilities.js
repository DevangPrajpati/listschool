import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Factory} from 'meteor/dburles:factory';

export const FACILITIES_COLLECTION_NAME = 'Facilities';
export const Facilities = new Mongo.Collection(FACILITIES_COLLECTION_NAME);

Facilities.schema = new SimpleSchema({
  facilityName: {
    type: String,
    label: 'Facility name',
    optional: false,
  },
});
Facilities.attachSchema(Facilities.schema);
