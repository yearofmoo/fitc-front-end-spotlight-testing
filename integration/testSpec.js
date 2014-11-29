describe('username validator page', function() {

  beforeEach(function() {
    return browser.ignoreSynchronization = true;
  });

  function gotoUsernamePage() {
    browser.get('http://localhost:8888');
  }

  it('should validate the username', function() {
    gotoUsernamePage();

    element(by.css('#input-username')).sendKeys('username');
    element(by.css('[type="submit"]')).click();

    expect(element(by.css('.error')).getText())
      .toEqual('You have entered an invalid username');
  });

  it('should send a request to the server and update the page', function() {
    gotoUsernamePage();

    element(by.css('#input-username')).sendKeys('u$3rnAme');
    element(by.css('[type="submit"]')).click();

    expect(element(by.css('.error')).isPresent()).toBeFalsy();

    expect(element(by.css('.loading')).getText())
      .toEqual('Loading...');

    var messageElement = element(by.css('.success'));
    browser.wait(function() {
      return messageElement.isPresent();
    });

    expect(messageElement.getText())
      .toEqual('You have registered successfully');
  });
});
