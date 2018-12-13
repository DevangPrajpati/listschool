import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Factory} from 'meteor/dburles:factory';

export const SUBJECTS_COLLECTION_NAME = 'Subjects';
export const Subjects = new Mongo.Collection(SUBJECTS_COLLECTION_NAME);

Subjects.schema = new SimpleSchema({
  subjectName: {
    type: String,
    label: 'Courses subject name',
    optional: false,
  },
});
Subjects.attachSchema(Subjects.schema);

// Factory.define('favorite', Favorites, {
//   user: () => Factory.get('user'),
//   school: () => Factory.get('school'),
// });
