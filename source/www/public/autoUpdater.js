const { app, ipcMain, BrowserWindow, dialog } = require('electron');
const {
  autoUpdater,
  DOWNLOAD_PROGRESS,
  UPDATE_DOWNLOADED,
} = require('electron-updater');

autoUpdater.logger = require('electron-log');
autoUpdater.logger.transports.file.level = "info";

// Disable auto downloading
autoUpdater.autoDownload = false;

module.exports.checkForUpdates = () => {
  const platform = process.platform;
  const version = app.getVersion();
  let progressWin = new BrowserWindow({
    width: 350,
    height: 35,
    show: false,
    useContentSize: true,
    autoHideMenuBar: true,
    maximizable: false,
    fullscreen: false,
    fullscreenable: false,
    resizable: false,
  });

  // Load Progress HTML
  progressWin.loadURL(`file://${__dirname}/renderer/progress.html`);

  // Handle window close
  progressWin.on('close', () => {
    progressWin = null;
  });

  autoUpdater.allowDowngrade = true;
  autoUpdater.logger.info('version: ' + version + ' platform: ' + platform);
  autoUpdater.checkForUpdates();
  autoUpdater.on('update-available', () => {
    let downloadProgress = 0;

    // Prompt user to update
    dialog.showMessageBox({
      type: 'info',
      title: 'Update Tersedia',
      message: 'Versi baru Equivalen telah tersedia. Apa mau diperbaharui sekarang?',
      buttons: ['Update', 'No'],
    }, (buttonIndex) => {
      if (buttonIndex !== 0) return;

      // Start download and show download progress
      autoUpdater.downloadUpdate();
      progressWin.show();

      // Listen for progress request from progress win
      ipcMain.on('download-progress-request', (e) => {
        autoUpdater.logger.info(`${DOWNLOAD_PROGRESS}_request`, downloadProgress);
        e.returnValue = downloadProgress;
      });
    });
  });

  // track download progress on autoUpdater
  autoUpdater.on(DOWNLOAD_PROGRESS, (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    downloadProgress = progressObj.percent;
    autoUpdater.logger.info(DOWNLOAD_PROGRESS, log_message);
  });

  autoUpdater.on(UPDATE_DOWNLOADED, () => {
    // Close Progress Win

    if (progressWin) progressWin.close();

    dialog.showMessageBox({
      type: 'info',
      title: 'Update Tersedia',
      message: 'Versi baru Equivalen telah siap. Keluar dan Pasang sekarang?',
      buttons: ['Ya', 'Nanti'],
    }, (buttonIndex) => {
      // Update if "Yes"
      if (buttonIndex === 0) {
        autoUpdater.logger.debug('Restarting application to install update.');

        autoUpdater.quitAndInstall();
      }
    });
  });
};
