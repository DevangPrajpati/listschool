/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

describe('Sign Up', function () {
  beforeEach(function () {
    server.execute(function () {
      const { Users } = require('/imports/api/users/users.js');
      const user = Users.findOne({ 'emails.address': 'chaves.augusto@gmail.com' });
      if (user) {
        Users.remove(user._id);
      }
    });
  });

  it('should create a new user and login with redirect to index @watch', function () {
    browser.url('http://localhost:4000/signup')
           .setValue('[name="firstName"]', 'Augusto')
           .setValue('[name="lastName"]', 'Chaves')
           .setValue('[name="emailAddress"]', 'chaves.augusto@gmail.com')
           .setValue('[name="password"]', 'develop1991')
           .submitForm('form');

    browser.waitForExist('#schoolSearch', 1000);
    expect(browser.getUrl()).to.equal('http://localhost:4000/');
  });
});
