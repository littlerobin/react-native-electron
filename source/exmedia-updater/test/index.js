// A simple test to verify a visible window is opened with a title
const Application = require('spectron').Application
const assert = require('assert')

const path = '/Applications/MyApp.app/Contents/MacOS/MyApp';
const titleApp = 'My App';

const app = new Application({ path })

app.start()
  .then(() =>
    // Check if the window is visible
    app.browserWindow.isVisible()
  )
  .then((isVisible) =>
    // Verify the window is visible
    assert.equal(isVisible, true)
  )
  .then(() =>
    // Get the window's title
    app.client.getTitle()
  )
  .then((title) =>
    // Verify the window's title
    assert.equal(title, titleApp)
  )
  .then(() =>
    // Stop the application
    app.stop()
  )
  .catch((error) =>
    // Log any failures
    console.error('Test failed', error.message)
  );
