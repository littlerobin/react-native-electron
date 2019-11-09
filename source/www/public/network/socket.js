const { ipcMain } = require('electron');
const log = require('electron-log');
const { client } = require('equivalen-electron-connect');
const generateCsv = require('../utils/generateCsv');
const { showMessageDialog } = require('../dialog');

const upload = function (wsc, { file, filename, filenameFull }, callback) {
  log.info('UPLOAD-CSV', JSON.stringify({ file, filename, filenameFull }));

  const data = JSON.stringify({
    file,
    filename,
  });
  wsc.socket.send(data);

  callback && callback();
};

const WsClient = function (mainWindow) {
  this.wsClient = client.create(mainWindow);

  this.wsClient.socket.on('connect', () => {
    log.info('SOCKET CONNECT..');
    mainWindow.webContents.send('socket-connected', { onLine: true });
  });

  this.wsClient.socket.on('reconnect', () => {
    log.info('SOCKET RECONNECT..');
    if (mainWindow) {
      mainWindow.webContents.send('socket-connected', { onLine: true });
    }
  });

  this.wsClient.socket.on('disconnected', () => {
    log.info('SOCKET DISCONNECT..');
    mainWindow.webContents.send('socket-connected', { onLine: false });
  });

  ipcMain.on('save-result-csv', (event, args) => {
    log.info('SAVE-RESULT-CSV', JSON.stringify(args));
    generateCsv.createCsv(args, upload, this.wsClient.socket);
  });
};

module.exports = WsClient;
