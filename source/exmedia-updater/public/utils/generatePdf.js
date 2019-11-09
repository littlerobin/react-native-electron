const path = require('path');
const fs = require('fs');
const mustache = require('mustache');
const log = require('electron-log');
const createWindow = require('./createWindow');
const {
  showSaveDialog,
  showMessageDialog,
  showErrorDialog,
} = require('../dialog');
const store = require('./persistStore');

const settingCache = {
  getPrintPaperSize: () => 1,
};

function pdfSettings() {
  const paperSizeArray = ["A4", "A5"];
  const option = {
    landscape: false,
    marginsType: 0,
    printBackground: false,
    printSelectionOnly: false,
    pageSize: paperSizeArray[settingCache.getPrintPaperSize() - 1],
  };
  return option;
}

module.exports.openResultPdf = (mainWindow, params) => {
  params.name = store.get('username') || "";

  const solutions = params.solution;
  let mapAnswersEachTenNo = [];

  params.mapAnswers = [];
  params.answers.forEach((ans, idx) => {
    const answer = {
      ...ans,
      correct: ans.answer.toLowerCase() === solutions[idx]
    };

    if (idx % 10 === 0) {
      if (mapAnswersEachTenNo.length > 0) params.mapAnswers.push(mapAnswersEachTenNo);
      mapAnswersEachTenNo = [answer];
    } else if ((idx + 1) === params.answers.length) {
      mapAnswersEachTenNo.push(answer);
      params.mapAnswers.push(mapAnswersEachTenNo);
    } else {
      mapAnswersEachTenNo.push(answer);
    }
  });

  log.info('params', JSON.stringify(params));
  const template = fs.readFileSync(path.join(__dirname, '../renderer/pdfResult.html'), 'utf8');
  const templatePdf = mustache.render(template, params);
  const windowToPDF = createWindow({
    url: `data:text/html;charset=UTF-8,${templatePdf}`,
    otps: {width: 595, height: 842, parent: mainWindow},
  });
  const filename = `${store.get('username')}_${store.get('class')}.pdf`;

  showSaveDialog({ defaultPath: filename }, (filePath) => {
    windowToPDF.webContents.printToPDF(pdfSettings(), (err, data) => {
      if (err) {
        //do whatever you want
        return;
      }

      try {
        fs.writeFileSync(filePath, data);
        showMessageDialog({
          title: 'Simpan Berhasil',
          message: `Berhasil disimpan di ${filePath}`,
          buttons: ['Buka'],
        }, (buttonIndex) => {
          if (buttonIndex === 0) {
            windowToPDF.show();
          }
        });
      } catch(err) {
        //unable to save pdf..
        showErrorDialog({
          title: 'Batal Simpan',
          message: 'Download PDF failed.',
        });
      }
    });
  });
}
