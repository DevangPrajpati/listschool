/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-underscore-dangle */

import { assert } from 'meteor/practicalmeteor:chai';
import { Users } from './users';
// import { sendContactEmail } from './methods';

describe('Users collection', function () {
  it('registers the collection with Mongo properly', function () {
    assert.equal(typeof Users, 'object');
  });
});

describe('Users methods', function () {
  it('Send contact e-mail', function () {

  });
});
