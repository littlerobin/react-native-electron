const { ipcMain } = require('electron');
const log = require('electron-log');
const fs = require('fs');
const { showUploadDialog, showMessageDialog } = require('./dialog');
const createWindow = require('./utils/createWindow');
const store = require('./utils/persistStore');
const { downloadVideo, openVideo } = require('./utils/download');
const generatePdf = require('./utils/generatePdf');
const paths = require('./utils/paths');

log.transports.file.level = 'info';

module.exports.communication = mainWindow => {
  ipcMain.on('show-upload-popup', (event, args) => {
    log.info('main show-upload-popup', args);
    showUploadDialog();
  });

  ipcMain.on('show-message-popup', (event, args) => {
    log.info('main show-message-popup', args);
    showMessageDialog(args);
  });

  ipcMain.on('set-store-data', (event, args) => {
    log.info('SET-STORE-DATA', JSON.stringify(args));
    store.set(args.key, args.value);
  });

  ipcMain.on('get-store-data', (event, args) => {
    log.info('GET-STORE-DATA', JSON.stringify(args));
    const value = store.get(args.key) || null;
    log.info('data', value);
    event.returnValue = value;
  });

  ipcMain.on('remove-store-data', (event, args) => {
    log.info('REMOVE-STORE-DATA', JSON.stringify(args));
    store.remove(args.key);
  });

  ipcMain.on('remove-all-store-data', () => {
    log.info('REMOVE-ALL-STORE-DATA');
    store.removeAll();
  });

  ipcMain.on('show-result-pdf', (event, args) => {
    log.info('SHOW-RESULT-PDF', JSON.stringify(args));
    generatePdf.openResultPdf(mainWindow, args);
  });

  ipcMain.on('set-ip-address-proxy', (event, args) => {
    log.info('SET-IP-ADDRESS-PROXY', args);
    const ipAddress = args.ipAddress;
    const usePort = args.usePort;
    store.set('ipAddress', ipAddress);
    store.set('usePort', usePort);
    require('./utils/api').cekStatus();
  });

  ipcMain.on('save-video-learning', (event, args) => {
    log.info('SAVE-VIDEO-LEARNING', args);
    downloadVideo(mainWindow, args.video, args.filename);
  });

  ipcMain.on('send-exists-file', (event, args) => {
    log.info('SEND-EXISTS-FILE', JSON.stringify(args));

    const pathVideo = paths.videoFilePath;
    const filename = args.filename;
    const uriLocal = `${pathVideo}/${filename}.min`;
    const pathDir = paths.convertFileUrlToPath(uriLocal || '');
    const isExists = fs.existsSync(pathDir);

    event.returnValue = isExists;

    if (isExists) {
      openVideo(pathDir, filename).then(tempfile => {
        event.sender.send('get-exists-file', tempfile);
      });
    }
  });

  ipcMain.on('show-modal-popup', (event, args) => {
    log.info('main show-modal-popup', args);
    const url = `file://${__dirname}/renderer/modal.html`;
    const modalWindow = createWindow({
      url,
      opts: {
        backgroundColor: '#777',
        width: 200,
        parent: mainWindow,
        frame: false,
      },
    });

    modalWindow.setFullScreen(false);
    modalWindow.webContents.on('did-finish-load', () => {
      modalWindow.webContents.send('store-data', 'masuk');
    });
    modalWindow.on('ready-to-show', () => {
      modalWindow.show();
    });
  });
};
