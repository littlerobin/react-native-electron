const electron = require('equivalen-electron-connect').server.create();
const moment = require('moment');
const { bufferToCsv } = require('./utils/csvConverter');
const constants = require('./utils/constants');

// const data = ['1', '2', '3'];

module.exports = () => {
  const wss = electron.start((state, wss) => {
    if (wss) {
      wss.on('message', (data) => {
        console.log('on-message', data);

        try {
          const obj = JSON.parse(data);
          const file = obj.file;
          const filename = obj.filename;

          if (file && file.type && file.type === 'Buffer') {
            const buffer = file.data;
            const currentDate = moment().format('DD-MM-YYYY');
            const filenameFull = `${filename}-${currentDate}.csv`;
            const dir = `${constants.fileDir}/${filenameFull}`;
      
            bufferToCsv(dir, buffer, () => {
              console.log('[electron-connect] [server] server upload to', dir);
            });

          } else if (obj.type && typeof obj.data === 'string') {
            wss.sendMessage(wss.id, obj.type, obj.data);
          }
        } catch (error) {
          console.error(error);
        }
      });
    }
  });

  return wss;
};
