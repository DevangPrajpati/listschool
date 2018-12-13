/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

describe('Log In', function () {
  beforeEach(function () {
    server.execute(function () {
      const { Users } = require('/imports/api/users/users.js');
      const user = Users.findOne({ 'emails.address': 'chaves.augusto@gmail.com' });
      if (user) {
        Users.remove(user._id);
      }
    });
  });

  it('should allow us to login @watch', function () {
    server.execute(function () {
      const { Accounts } = require('meteor/accounts-base');
      Accounts.createUser({
        email: 'chaves.augusto@gmail.com',
        password: 'develop1991',
        profile: {
          firstName: 'Augusto',
          lastName: 'Chaves',
        },
      });
    });

    browser.url('http://localhost:4000/login')
           .setValue('[name="emailAddress"]', 'chaves.augusto@gmail.com')
           .setValue('[name="password"]', 'develop1991')
           .submitForm('form');

    browser.waitForExist('#schoolSearch', 1000);
    expect(browser.getUrl()).to.equal('http://localhost:4000/');
  });

  // it('should allow us to create a school @watch', function () {
  //   browser.url('http://localhost:4000/schools')
  //          .setValue('input[type=text]', 'teste 123')
  //          .keys(['Enter']);
  //
  //   browser.waitForExist('.list-group-item');
  //   expect(browser.getUrl()).to.equal('http://localhost:4000/schools');
  // });
  //
  // it('should allow us to remove a school @watch', function () {
  //   browser.click('.btn').alertAccept();
  //
  //   const alertClass = browser.getAttribute('.bert-alert', 'class');
  //   expect(alertClass).to.equal('bert-alert clearfix growl-top-right success show');
  //
  //   expect(browser.getUrl()).to.equal('http://localhost:4000/schools');
  // });
});
