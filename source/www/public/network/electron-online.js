const EventEmitter = require('events');
const { ipcMain } = require('electron');

const STATUS = {
  PENDING: 'PENDING',
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
};

class ElectronOnline extends EventEmitter {
  constructor (app) {
    super();

    this.status = STATUS.PENDING;

    const init = () => {
      ipcMain.on('online-status-changed', (event, status) => {
        this.status = status === STATUS.ONLINE ? STATUS.ONLINE : STATUS.OFFLINE;
        this.emit(this.status);
      })
    };

    if (app.isReady()) init();
    app.once('ready', () => init());
  }
}

module.exports = ElectronOnline;
