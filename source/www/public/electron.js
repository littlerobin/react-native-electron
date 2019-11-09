// Modules to control application life and create native browser window
const { app } = require('electron');
const log = require('electron-log');
const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');
const moment = require('moment');
const dialog = require('./dialog');
const modal = require('./modal');
const { applyShortcut } = require('./shortcuts');
const { socket } = require('./network');
const { communication } = require('./communication');
const createWindow = require('./utils/createWindow');
const store = require('./utils/persistStore');
const api = require('./utils/api');

log.transports.file.level = 'info';

if (isDev) {
  // auto reload electron
  require('electron-reload')([
    `${__dirname}/../build/index.html`,
    `${__dirname}/../build/static/js/*.js`,
    `${__dirname}/../build/static/css/*.css`
  ], {
    electron: `${__dirname}/../node_modules/.bin/electron`,
  });
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  const paths = require('./utils/paths');
  // and load the index.html of the app.
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true,
    });
  log.info('RUNNING...', startUrl);
  // Setup Modal
  modal.setup();

  const { width, height } = store.get('windowBounds') || {};
  const version = app.getVersion();
  const webPreferences = {
    // Don't throttle animations/timers when backgrounded.
    backgroundThrottling: false,
    // Use native window.open so external windows can access their parent.
    nativeWindowOpen: true,
    // Run the preload script before other scripts on the page.
    preload: path.join(__dirname, 'preload.js'),
  };

  // CREATE WINDOW
  mainWindow = createWindow({
    url: startUrl,
    opts: {
      width,
      height,
      webPreferences,
    },
  });

  // WHEN CONTENT FINISH LOAD
  mainWindow.webContents.on('did-finish-load', function() {
    // new socket(mainWindow);

    log.info('PATHS', JSON.stringify(paths));

    mainWindow.webContents.send('app-version', version);
    mainWindow.webContents.send('paths', JSON.stringify(paths));

    applyShortcut(mainWindow);
  });

  // The BrowserWindow class extends the node.js core EventEmitter class, so we use that API
  // to listen to events on the BrowserWindow. The resize event is emitted when the window size changes.
  mainWindow.on('resize', () => {
    // The event doesn't pass us the window size, so we call the `getBounds` method which returns an object with
    // the height, width, and x and y coordinates.
    const { width, height } = mainWindow.getBounds();
    // Now that we have them, save them using the `set` method.
    store.set('windowBounds', { width, height });
  });

  mainWindow.on('crashed', function() {
    log.error('Main window crashed');
  });

  mainWindow.on('destroyed', function() {
    log.error('Main window destroyed');
  });

  mainWindow.maximize();
  // mainWindow.setFullScreen(true);

  const diffDay = moment(store.get('expireDate')).diff(moment(), 'day');
  const isExpired = diffDay < 0;

  mainWindow.once('ready-to-show', () => {
    if (isExpired) {
      dialog.showMessageDialog({
        title: 'Expire',
        message: 'Maaf, Aplikasi Sudah Tidak Bisa digunakan Lagi',
      });
    } else {
      mainWindow.show();
    }
  });

  communication(mainWindow);

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  if (!isDev) {
    // Check Update for x Second
    setTimeout(() => {
      require('./autoUpdater').checkForUpdates();
    }, 2000);
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    mainWindow = createWindow();
  }
});
