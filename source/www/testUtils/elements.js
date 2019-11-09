module.exports.getElement = (app, selector, value) => {
  return app.client.element(selector)
    .setValue(value);
};

module.exports.clickButton = (app, selector) => {
  return app.client.element(selector)
    .click();
};

module.exports.waitForElement = (app, selector) => {
  return app.client.element(selector).waitForExist(5000);
}

module.exports.verifyElementExists = (app, selector) => {
  return app.client.element(selector)
    .isExisting();
};
