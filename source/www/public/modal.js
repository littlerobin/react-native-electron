const electron = require('electron');
const isDev = require('electron-is-dev');
const EventEmitter = require('events').EventEmitter;
const events = require('./utils/events');
const store = require('./utils/cloneStore');
const packageJSON = require('../package.json');

const emitter = new EventEmitter();

/**
 * @summary The IPC channel name to get data from the model data store
 * @type {String}
 * @constant
 */
const IPC_CHANNEL_DATA_GET = `${packageJSON.name}-data-get`;

/**
 * @summary The IPC channel name to set data to the model data store
 * @type {String}
 * @constant
 */
const IPC_CHANNEL_DATA_SET = `${packageJSON.name}-data-set`;

/**
 * @summary The IPC channel to bridge messages between renderer processes
 * @type {String}
 * @constant
 */
const IPC_CHANNEL_MESSAGE_BRIDGE = `${packageJSON.name}-message-bridge`;

/**
 * @summary Main process environment variable to signify that electron-modal is ready
 * @type {String}
 * @constant
 */
const ENVIRONMENT_VARIABLE_SETUP_FLAG = 'ELECTRON_MODAL_SETUP';

/**
 * @summary The BrowserWindow event channel used to receive custom messages
 * @type {String}
 * @constant
 */
const CHANNEL_BROWSER_WINDOW_MESSAGE = `${packageJSON.name}-modal-message`;

/**
   * @summary Set modal data through IPC
   * @function
   * @private
   *
   * @param {Object} event - event
   * @param {Object} payload - payload
   */
const setData = (event, payload) => {
  store.set(payload.data.id, payload.data.data);
  events.awknowledge(event, payload);
};

/**
 * @summary Get modal data through IPC
 * @function
 * @private
 *
 * @description
 * This function deletes the data from the store once
 * it has been passed to the renderer process, forcing
 * it to cache its value instead of accessing it through
 * IPC, which is very slow.
 *
 * @param {Object} event - event
 * @param {Object} payload - payload
 */
const getData = (event, payload) => {
  const data = store.get(payload.data);
  store.delete(payload.data);
  events.awknowledge(event, payload, data);
};

/**
 * @summary Bridge an IPC message from a modal to its parent
 * @function
 * @private
 *
 * @param {Object} event - event
 * @param {Object} payload - payload
 */
const bridge = (event, payload) => {
  electron.BrowserWindow.fromId(payload.data.id).emit(CHANNEL_BROWSER_WINDOW_MESSAGE, {
    channel: payload.data.channel,
    message: payload.data.message
  });

  events.awknowledge(event, payload);
};

exports.emit = (channel, message) => {
  return events.send(electron.ipcRenderer, IPC_CHANNEL_MESSAGE_BRIDGE, {
    channel,
    message
  });
};

exports.createModalWindow = (mainWindow, options, data = {}) => {
  if (!process.env[ENVIRONMENT_VARIABLE_SETUP_FLAG]) {
    throw new Error('Make sure you ran modal.setup() on the main process before calling this function');
  }

  const opts = Object.assign({}, options, {

    // We rely on a parent/child relationship between windows to
    // identify what is a "modal", we must make sure the user
    // can't override this setting.
    parent: mainWindow,

    // Instantly showing the window will not provide a good UX
    // in almost all scenarios, so force the user to take
    // responsibility by making him show the window himself.
    show: false,
  });

  let modalWindow = new electron.BrowserWindow(opts);

  emitter.show = modalWindow.show;
  emitter.close = modalWindow.close;
  emitter.hide = modalWindow.hide;
  emitter.isVisible = modalWindow.isVisible;

  // Bridge these events for convenience

  modalWindow.on('closed', () => {
    modalWindow = null;
    emitter.emit('closed');
  });

  modalWindow.on('show', () => {
    emitter.emit('show');
  });

  modalWindow.on('hide', () => {
    emitter.emit('hide');
  });

  // Handle custom events coming from the child window

  modalWindow.on(CHANNEL_BROWSER_WINDOW_MESSAGE, (payload) => {
    emitter.emit(payload.channel, payload.message);
  });

  const url = `file://${__dirname}/renderer/modal.html`;
  modalWindow.loadURL(url);

  modalWindow.webContents.on('did-finish-load', () => {
    emitter.emit('send', modalWindow.webContents);
  });

  modalWindow.on('ready-to-show', () => {
    modalWindow.show();
  });

  /** DevTool Modal */
  // if (isDev) {
  //   modalWindow.webContents.openDevTools();
  // }

  return emitter;
};

exports.setup = () => {
  if (process.env[ENVIRONMENT_VARIABLE_SETUP_FLAG]) {
    return;
  }

  // Let the renderer processes know we're ready to start modals
  process.env[ENVIRONMENT_VARIABLE_SETUP_FLAG] = true;

  events.safelyAttachEventListener(electron.ipcMain, IPC_CHANNEL_DATA_SET, setData);
  events.safelyAttachEventListener(electron.ipcMain, IPC_CHANNEL_DATA_GET, getData);
  events.safelyAttachEventListener(electron.ipcMain, IPC_CHANNEL_MESSAGE_BRIDGE, bridge);
};
