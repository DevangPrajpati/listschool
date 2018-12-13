import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Factory} from 'meteor/dburles:factory';

export const ACCOMMODATIONS_COLLECTION_NAME = 'Accommodations';
export const Accommodations = new Mongo.Collection(ACCOMMODATIONS_COLLECTION_NAME);

Accommodations.schema = new SimpleSchema({
  accommodationName: {
    type: String,
    label: 'Accommodation name',
    optional: false,
  },
});
Accommodations.attachSchema(Accommodations.schema);
