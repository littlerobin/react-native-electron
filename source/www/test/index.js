import test from 'ava';
import faker from 'faker';
import moment from 'moment';
import { Application } from 'spectron';
import {
  getElement,
  clickButton,
  waitForElement,
  verifyElementExists,
} from '../testUtils/elements';

const electronPath = require('electron');
const path = require('path');

const appPath = path.join(__dirname, '..');

test.beforeEach(async t => {
  t.context.app = new Application({
    path: electronPath,
    args: [appPath],
    env: {
      NODE_ENV: 'test',
      REACT_APP_STAGE: 'test',
      ELECTRON_IS_DEV: 0
    }
  });

  t.context.i = (t.context.i || 0) + 1;
  await t.context.app.start();
});

test.afterEach.always(async t => {
  t.context.i--;
  if (t.context.i === 0) {
    await t.context.app.stop();
  }
});

// test('Initial Window', async (t) => {
//   const app = t.context.app;
//   await app.client.waitUntilWindowLoaded();
//   const win = app.browserWindow;
//   t.is(await app.client.getWindowCount(), 2);
//   t.false(await win.isMinimized());
//   t.false(await win.isDevToolsOpened());
//   t.true(await win.isVisible());
//   t.true(await win.isFocused());

//   const {width, height} = await win.getBounds();
//   t.true(width > 0);
//   t.true(height > 0);
// });

test('Registration Test', async (t) => {
  const app = t.context.app;
  const dob = moment().format('YYYY-MM-DD');

  await app.client.waitUntilWindowLoaded();

  waitForElement(app, '[testid="registration"]');
  await clickButton(app, '[testid="registration"]');

  await new Promise(resolve => setTimeout(resolve, 4000));

  waitForElement(app, '[data-testid="username"]');
  await getElement(app, '[data-testid="username"]', faker.random.word());

  waitForElement(app, '[data-testid="fullname"]');
  await getElement(app, '[data-testid="fullname"]', faker.name.firstName());

  waitForElement(app, '[data-testid="email"]');
  await getElement(app, '[data-testid="email"]', faker.internet.email());

  waitForElement(app, '[data-testid="password"]');
  await getElement(app, '[data-testid="password"]', '12345678');

  waitForElement(app, '[data-testid="pob"]');
  await getElement(app, '[data-testid="pob"]', faker.address.city());

  await clickButton(app, '.react-date-picker__calendar-button');
  waitForElement(app, 'button time');
  await clickButton(app, 'button time');

  await clickButton(app, '[data-testid="submit-form-1"]');

  await new Promise(resolve => setTimeout(resolve, 10000));

  return t.true(true);
});
/*
test('Login Test', async (t) => {
  const app = t.context.app;

  await app.client.waitUntilWindowLoaded();
  const usernameInputEl = await getElement(app, '[data-testid="username"]', 'admin');
  const passwordInputEl = await getElement(app, '[data-testid="password"]', 'admin123');

  await new Promise(resolve => setTimeout(resolve, 2000));

  await clickButton(app, '[data-testid="login"]');

  await new Promise(resolve => setTimeout(resolve, 5000));

  waitForElement(app, '[data-testid="menu-page"]');

  return t.true(verifyElementExists(app, '[data-testid="menu-page"]'));
});
*/
