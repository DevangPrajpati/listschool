/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

describe('404 Error', function () {
  it('should render a 404 for a non-existent route @watch', function () {
    browser.url('http://localhost:4000/dididothat')
           .waitForExist('.alert-danger');

    expect(browser.getText('.alert-danger p')).to.equal('Error [404]: /dididothat não existe.');
  });
});
