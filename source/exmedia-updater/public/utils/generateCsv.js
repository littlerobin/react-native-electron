// Config Excel
// https://superuser.com/questions/238944/how-to-force-excel-to-open-csv-files-with-data-arranged-in-columns

const fs = require('fs');
const path = require('path');
const csv = require('csv');
const log = require('electron-log');
const mkdirp = require('mkdirp');
const {
  showFileDialog,
  showMessageDialog,
  showErrorDialog,
} = require('../dialog');
const store = require('./persistStore');

module.exports.createCsv = (params, uploadFunc, wsc) => {
  params.name = store.get('username') || "";
  params.className = store.get('class') || "";

  params.mapAnswers = [];
  params.answers.forEach((value, idx) => {
    const mod = idx % 10;

    if (params.mapAnswers[mod]) {
      params.mapAnswers[mod] = params.mapAnswers[mod].concat([value.no, value.answer]);
    } else {
      params.mapAnswers[mod] = [value.no, value.answer];
    }
  });

  const data = [
    ['Hasil Latihan', '', '', '', '', '', 'Nilai', params.result],
    ['\n'],
    ['Nama', ':', params.name, '', '', '', 'Jawaban Benar', ':', params.correctAns],
    ['Matapelajaran', ':', params.matpel, '', '', '', 'Jawaban Salah', ':', params.wrongAns],
    ['Paket Tryout', ':', params.to, '', '', '', 'Jawaban Ragu-ragu', ':', params.doubtAns],
    ['Jumlah Soal', ':', params.totalQuestion, '', '', '', 'Tidak dijawab', ':', params.unAnswer],
    ['Tanggal', ':', params.date],
    ['Lama Waktu', ':', params.duration],
    ['\n'],
    ...params.mapAnswers,
  ];

  log.info('params', params);

  const fileDir = path.resolve(__dirname);

  log.info('fileDir', fileDir);

  const callback = (err, dataToWrite) => {
    if (err) {
      return;
    }
    const filename = `${params.name}_${params.className}`;
    const filenameFull = `${filename}.csv`;

    const csvBuffer = new Buffer(dataToWrite);

    log.info('csvBuffer', csvBuffer);

    uploadFunc(wsc, { filename, filenameFull, file: csvBuffer }, () => {
      showMessageDialog({
        title: 'Success',
        message: 'Successfuly Upload Result!',
      });
    });

    // require('./api').uploadFile(csvBuffer, { filename, filenameFull });
  };

  // showFileDialog(['openDirectory'], (path) => {
    fs.exists(fileDir, (exists) => {
      if (exists) {
        try {
          csv.stringify(data, callback);
        } catch(err) {
          showErrorDialog({
            title: 'Error',
            message: 'Stringify failed.',
          });
        }
      } else {
        mkdirp(fileDir, 0o777, (error) => {
          if (error) {
            showErrorDialog({
              title: 'Error',
              message: 'Error create directory failed.',
            });
          }

          csv.stringify(data, callback);
        });
      }
    });
  // });
};
